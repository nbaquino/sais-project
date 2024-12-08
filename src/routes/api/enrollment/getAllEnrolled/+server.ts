import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('Enrollment')
            .select(`
                enr_id,
                stud_id,
                Student!Enrollment_stud_id_fkey (
                    stud_Fname,
                    stud_Lname
                ),
                sect_id,
                Section!Enrollment_sect_id_fkey (
                    course_id,
                    sect_name,
                    room_ID
                )
            `)
            .order('enr_id');

        if (error) {
            console.error('Error fetching enrollments:', error);
            return json({ error: String(error) }, { status: 500 });
        }

        const transformedData = data.map((enrollment) => ({
            enr_id: enrollment.enr_id,
            stud_id: enrollment.stud_id,
            student_name: `${enrollment.Student.stud_Fname} ${enrollment.Student.stud_Lname}`,
            sect_id: enrollment.sect_id,
            course_id: enrollment.Section.course_id,
            room_id: enrollment.Section.room_ID
        }));

        return json(transformedData);
    } catch (error) {
        console.error('Unexpected error:', error);
        return json({ error: String(error) }, { status: 500 });
    }
}
