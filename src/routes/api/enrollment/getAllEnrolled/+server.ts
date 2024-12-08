import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('Enrollment')
            .select(`
                *,
                "Shopping Cart"(
                    cart_id,
                    stud_id,
                    sect_id,
                    Student(
                        stud_id,
                        stud_Fname,
                        stud_Lname,
                        stud_Mname,
                        stud_yr,
                        program_id,
                        stud_email,
                        status,
                        address,
                        contact_num
                    ),
                    Section(
                        sect_ID,
                        course_id,
                        avail_ID,
                        room_ID,
                        inst_ID,
                        sect_name,
                        sect_days,
                        sect_start_time,
                        sect_end_time,
                        sect_status,
                        Room(
                            room_id,
                            room_name,
                            room_capac
                        ),
                        SectionAvailability(
                            avail_id,
                            avail_enrollTot,
                            avail_waistlistTot,
                            avail_waitlistCap
                        )
                    )
                )
            `)
            .order('enr_id');

        if (error) {
            console.error('Error fetching enrollments:', error);
            return json({ error: 'Error fetching enrollments' }, { status: 500 });
        }

        console.log('Fetched data:', data);

        const transformedData = data.map((enrollment) => ({
            enr_id: enrollment.enr_id,
            ...(enrollment['Shopping Cart'] ? {
                stud_id: enrollment['Shopping Cart'].stud_id,
                sect_id: enrollment['Shopping Cart'].sect_id,
                student: {
                    program_id: enrollment['Shopping Cart'].Student.program_id
                },
                section: {
                    Room: {
                        room_id: enrollment['Shopping Cart'].Section.Room.room_id
                    },
                    course_id: enrollment['Shopping Cart'].Section.course_id
                }
            } : {})
        }));

        return json(transformedData);
    } catch (error) {
        console.error('Unexpected error:', error);
        return json({ error: 'Unexpected error' }, { status: 500 });
    }
}
