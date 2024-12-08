import { writable } from 'svelte/store';
import type { CartItem } from '$lib/types/database';
import { supabase } from '$lib/supabaseClient';

interface CartStore {
    items: CartItem[];
}

export const cartStore = writable<CartStore>({
    items: []
});

export async function loadCartItems() {
    try {
        const storedStudent = localStorage.getItem('student');
        if (!storedStudent) return;

        const studentData = JSON.parse(storedStudent);

        const { data, error } = await supabase
            .from('Shopping Cart')
            .select(`
                cart_id,
                sect_id,
                Section:sect_id (
                    sect_name,
                    course_id,
                    sect_days,
                    sect_start_time,
                    sect_end_time,
                    sect_ID,
                    Course:course_id (
                        course_id,
                        crs_code,
                        crs_name
                    )
                )
            `)
            .eq('stud_id', studentData.stud_id);

        if (error) {
            console.error('Error fetching cart:', error);
            return;
        }

        const cartItems = data.map(item => ({
            cart_id: item.cart_id,
            sect_ID: item.Section.sect_ID,
            course_id: item.Section.Course.course_id,
            sect_name: item.Section.sect_name,
            sect_days: item.Section.sect_days,
            sect_start_time: item.Section.sect_start_time,
            sect_end_time: item.Section.sect_end_time,
            crs_code: item.Section.Course.crs_code,
            crs_name: item.Section.Course.crs_name
        }));

        cartStore.set({ items: cartItems });
    } catch (error) {
        console.error('Error loading cart items:', error);
    }
}

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
