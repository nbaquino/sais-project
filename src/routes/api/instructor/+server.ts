import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('Instructor')
            .select('*')
            .order('inst_id');

        if (error) {
            console.error('Error fetching instructors:', error);
            return json({ error: 'Error fetching instructors' }, { status: 500 });
        }

        // Transform the data into a clean array format
        const transformedData = data.map((instructor) => ({
            inst_id: instructor.inst_id,
            inst_fname: instructor.inst_fname,
            inst_lname: instructor.inst_lname,
            inst_email: instructor.inst_email,
            department: instructor.department,
            status: instructor.status
        }));

        // Return clean array with pretty formatting
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
