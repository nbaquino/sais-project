import { supabase } from '$lib/server/supabaseClient';

export async function POST({ request }) {
	try {
		const body = await request.json();
		console.log('Request Body:', body);

		const {
			stud_Fname,
			stud_Mname,
			stud_Lname,
			program,
			id,
			stud_email,
			login_pw,
			advisor,
			stud_yr
		} = body;

		const { data, error } = await supabase.from('Student').insert([
			{
				stud_Fname,
				stud_Mname,
				stud_Lname,
				program,
				id,
				stud_email,
				login_pw,
				advisor,
				stud_yr
			}
		]);

		console.log('Insert Result:', data, 'Error:', error);

		if (error) {
			throw new Error(error.message);
		}

		return new Response(
			JSON.stringify({ success: true, message: 'Student sadded successfully', student: data[0] }),
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error adding student:', error.message);
		return new Response(JSON.stringify({ success: false, message: error.message }), {
			status: 500
		});
	}
}

export async function GET() {
	try {
		let { data, error } = await supabase.from('Student').select('*');

		if (error) {
			return new Response(JSON.stringify({ success: false, message: error.message }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Return the data as a JSON response
		return new Response(JSON.stringify({ success: true, data }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		// Handle unexpected errors
		return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
