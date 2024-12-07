import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
	try {
		const { data, error } = await supabase.from('Student').select('*').order('id');

		if (error) {
			console.error('Error fetching students:', error);
			return json({ error: 'Error fetching students' }, { status: 500 });
		}

		// Transform the data into a clean array format
		const transformedData = data.map((student) => ({
			id: student.id,
			stud_Fname: student.stud_Fname,
			stud_Mname: student.stud_Mname,
			stud_Lname: student.stud_Lname,
			stud_yr: student.stud_yr,
			program_id: student.program_id,
			stud_email: student.stud_email,
			advisor: student.advisor,
			status: student.status, 
			address: student.address,
			contact_num: student.contact_num
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
