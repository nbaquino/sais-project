import { get, writable } from 'svelte/store';
import type { CartItem } from '$lib/types/database';
import { supabase } from '$lib/supabaseClient';

interface CartStore {
    items: CartItem[];
}

export const cartStore = writable<CartStore>({
    items: []
});

// Load cart items from the database
export async function loadCartItems() {
    const storedStudent = localStorage.getItem('student');
    if (!storedStudent) return;

    const studentData = JSON.parse(storedStudent);

    const { data, error } = await supabase
        .from('Shopping Cart')
        .select(`
            cart_id,
            sect_id,
            Section (
                sect_ID,
                course_id,
                sect_name,
                sect_days,
                sect_start_time,
                sect_end_time
            )
        `)
        .eq('stud_id', studentData.stud_id);

    if (!error && data) {
        const cartItems = data.map(item => ({
            cart_id: item.cart_id,
            sect_ID: item.Section.sect_ID,
            sect_name: item.Section.sect_name,
            sect_days: item.Section.sect_days,
            sect_start_time: item.Section.sect_start_time,
            sect_end_time: item.Section.sect_end_time,
            crs_code: item.Section.course_id,
            crs_name: item.Section.sect_name || '',
            course_id: item.Section.course_id
        }));

        cartStore.set({ items: cartItems });
    }
}

// Remove an item from the cart
export async function removeFromCart(cartId: number) {
    try {
        const storedStudent = localStorage.getItem('student');
        if (!storedStudent) return;

        const studentData = JSON.parse(storedStudent);
        const studentId = studentData.stud_id || studentData.stud_ID || studentData.id;

        const { error } = await supabase
            .from('Shopping Cart')
            .delete()
            .eq('cart_id', cartId)
            .eq('stud_id', studentId);

        if (error) {
            console.error('Error removing from cart:', error);
            return false;
        }

        await loadCartItems();
        return true;
    } catch (error) {
        console.error('Error removing from cart:', error);
        return false;
    }
}

// Enroll in all items in the cart
// This function will check for section status, existing enrollments, and schedule conflicts
// If all checks pass, it will proceed with enrollment and delete the items from the cart
// This function will return a success message if the enrollment is successful, or an error message if there is an issue
// This function will also update the local cart store to ensure the UI is updated
// This function will also log the process of enrollment for debugging purposes
export async function proceedToEnrollment(semesterId: number) {
    try {
        const cartItems = get(cartStore).items;
        const storedStudent = localStorage.getItem('student');

        if (!storedStudent) {
            return { success: false, message: 'No student data found' };
        }

        const studentData = JSON.parse(storedStudent);
        const studentId = studentData.stud_id || studentData.stud_ID || studentData.id;

        // Check section status first
        for (const item of cartItems) {
            const { data: sectionData, error: sectionError } = await supabase
                .from('Section')
                .select('sect_status')
                .eq('sect_ID', item.sect_ID)
                .single();

            if (sectionError) {
                console.error('Error checking section status:', sectionError);
                return { success: false, message: `Error checking section status: ${sectionError.message}` };
            }

            console.log('Section status:', sectionData?.sect_status); // Debug log

            // Check for any variation of "closed" status
            const status = sectionData?.sect_status?.toLowerCase() || '';
            if (status === 'closed' || status === 'close') {
                return {
                    success: false,
                    message: `Section ${item.crs_code} is closed and not available for enrollment.`
                };
            }
        }

        // 1. Check for existing enrollments
        for (const item of cartItems) {
            const { data: existingEnrollment, error: checkError } = await supabase
                .from('Enrollment')
                .select('*')
                .eq('stud_id', studentId)
                .eq('sect_id', item.sect_ID)
                .eq('sem_id', semesterId)
                .single();

            if (checkError && checkError.code !== 'PGRST116') {
                console.error('Error checking enrollment:', checkError);
                return { success: false, message: `Error checking enrollments: ${checkError.message}` };
            }

            if (existingEnrollment) {
                return {
                    success: false,
                    message: `Already enrolled in ${item.crs_code}.`
                };
            }
        }

        // 2. Check for schedule conflicts
        const hasConflict = evaluate(cartItems);
        if (hasConflict) {
            return {
                success: false,
                message: 'Cannot proceed with enrollment. Schedule conflict detected between courses.'
            };
        }

        // 3. Proceed with enrollment
        for (const item of cartItems) {
            console.log('Processing enrollment for item:', item);

            try {
                // First, insert into Enrollment
                const { data: enrollmentData, error: enrollmentError } = await supabase
                    .from('Enrollment')
                    .insert({
                        stud_id: studentId,
                        sect_id: item.sect_ID,
                        sem_id: semesterId,
                        cart_id: item.cart_id,
                        date_added: new Date().toISOString()
                    })
                    .select()
                    .single();

                if (enrollmentError) {
                    console.error('Enrollment error:', enrollmentError);
                    return {
                        success: false,
                        message: `Failed to enroll: ${enrollmentError.message}`
                    };
                }

                console.log('Successfully inserted enrollment:', enrollmentData);

                // Then delete from Shopping Cart
                const { error: deleteError } = await supabase
                    .from('Shopping Cart')
                    .delete()
                    .eq('cart_id', item.cart_id)
                    .eq('stud_id', studentId); // Added to satisfy RLS policy

                if (deleteError) {
                    console.error('Error deleting from cart:', deleteError);
                    return {
                        success: false,
                        message: `Error removing from cart: ${deleteError.message}`
                    };
                }

                console.log('Successfully deleted from shopping cart:', item.cart_id);

            } catch (error) {
                console.error('Error processing item:', error);
                return {
                    success: false,
                    message: `Error processing enrollment: ${error.message}`
                };
            }
        }

        // Update local cart store
        cartStore.set({ items: [] });
        return { success: true, message: 'Successfully enrolled in all courses' };

    } catch (error) {
        console.error('Unexpected error during enrollment:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'An unexpected error occurred during enrollment'
        };
    }
}

// Helper function to evaluate schedule conflicts
function evaluate(sections: any[]): boolean {
    for (let i = 0; i < sections.length; i++) {
        const section1 = sections[i];
        const days1 = parseDays(section1.sect_days);

        for (let j = i + 1; j < sections.length; j++) {
            const section2 = sections[j];
            const days2 = parseDays(section2.sect_days);

            // Check for common days
            const commonDays = days1.filter(day => days2.includes(day));

            if (commonDays.length > 0) {
                // Convert times to 24-hour format for comparison
                const start1 = convertTo24Hour(section1.sect_start_time);
                const end1 = convertTo24Hour(section1.sect_end_time);
                const start2 = convertTo24Hour(section2.sect_start_time);
                const end2 = convertTo24Hour(section2.sect_end_time);

                // Check for time overlap
                if (
                    (start1 <= start2 && end1 > start2) || // First class overlaps start of second
                    (start1 >= start2 && start1 < end2) || // Second class overlaps start of first
                    (start1 === start2) // Exact same start time
                ) {
                    console.log('Schedule conflict detected:', {
                        course1: `${section1.crs_code} (${section1.sect_days} ${section1.sect_start_time}-${section1.sect_end_time})`,
                        course2: `${section2.crs_code} (${section2.sect_days} ${section2.sect_start_time}-${section2.sect_end_time})`,
                        commonDays
                    });
                    return true;
                }
            }
        }
    }
    return false;
}

// Helper function to convert 12-hour time to 24-hour format
function convertTo24Hour(time: string): number {
    const [timeStr, period] = time.split(/(?:AM|PM)/);
    let [hours, minutes] = timeStr.trim().split(':').map(Number);

    if (time.includes('PM') && hours !== 12) {
        hours += 12;
    }
    if (time.includes('AM') && hours === 12) {
        hours = 0;
    }

    return hours * 60 + minutes; // Convert to minutes for easier comparison
}

// Helper function to parse days
function parseDays(daysString: string): string[] {
    const dayPairs: { [key: string]: string } = {
        'Mo': 'Monday',
        'Tu': 'Tuesday',
        'We': 'Wednesday',
        'Th': 'Thursday',
        'Fr': 'Friday',
        'Sa': 'Saturday',
        'Su': 'Sunday'
    };

    const days: string[] = [];
    for (let i = 0; i < daysString.length; i += 2) {
        const dayCode = daysString.substr(i, 2);
        if (dayPairs[dayCode]) {
            days.push(dayCode);
        }
    }
    return days;
}
