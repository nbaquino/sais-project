import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('Enrollment')
            .select(`
                *,
                Student (
                    id,
                    stud_Fname,
                    stud_Lname
                ),
                Section (
                    sect_ID,
                    sect_name
                )
            `)
            .order('enr_id');

        if (error) {
            console.error('Error fetching enrollments:', error);
            return json({ error: 'Error fetching enrollments' }, { status: 500 });
        }

        const transformedData = data.map((enrollment) => ({
            enr_id: enrollment.enr_id,
            enr_date: enrollment.enr_date,
            stud_id: enrollment.stud_id,
            sect_id: enrollment.sect_id,
            student: enrollment.Student ? {
                id: enrollment.Student.id,
                stud_Fname: enrollment.Student.stud_Fname,
                stud_Lname: enrollment.Student.stud_Lname
            } : undefined,
            section: enrollment.Section ? {
                sect_ID: enrollment.Section.sect_ID,
                sect_name: enrollment.Section.sect_name
            } : undefined
        }));

        return new Response(JSON.stringify(transformedData, null, 2), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return json({ error: 'Unexpected error' }, { status: 500 });
    }
}
