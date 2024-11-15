import { supabase } from '$lib/server/supabaseClient';

export async function POST({ request }) {
	try {
		// Directly parse the incoming request body as JSON (SvelteKit does this for you)
		const body = await request.json();

		// Destructure the data from the body
		const { stud_Fname, stud_Mname, stud_Lname, program, id, stud_email, login_pw } = body;

		// Insert data into Supabase 'students' table
		const { data, error } = await supabase.from('Student').insert([
			{
				stud_Fname: stud_Fname,
				stud_Mname: stud_Mname,
				stud_Lname: stud_Lname,
				program: program,
				id: id,
				stud_email: stud_email,
				login_pw: login_pw
			}
		]);

		if (error) {
			throw new Error(error.message); // Handle errors properly
		}

		// Access the inserted data
		return new Response(
			JSON.stringify({ success: true, message: 'Student added successfully', student: data[0] }),
			{ status: 200 }
		);
	} catch (error) {
		// Return an error response if something goes wrong
		return new Response(JSON.stringify({ success: false, message: error.message }), {
			status: 500
		});
	}
}
