import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
	try {
		// Fetch all students from the "students" table
		const { data, error } = await supabase
			.from('Student') // replace with your actual table name
			.select('*'); // You can select specific columns if needed

		// Handle error if it occurs
		if (error) {
			console.error('Error fetching students:', error);
			return new Response(JSON.stringify({ success: false, message: 'Error fetching students' }), {
				status: 500
			});
		}

		// Return the list of students as a successful response
		return new Response(JSON.stringify({ success: true, data }), { status: 200 });
	} catch (error) {
		console.error('Unexpected error:', error);
		return new Response(JSON.stringify({ success: false, message: 'Unexpected error' }), {
			status: 500
		});
	}
}
