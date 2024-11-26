import { supabase } from '$lib/server/supabaseClient';

// to use : api/student/newstudent
export async function POST({ request }) {
	try {
		// Parse the request body
		const body = await request.json();
		// console.log('Request Body:', body);

		// Destructure fields from the request body
		const {
			stud_Fname,
			stud_Mname,
			stud_Lname,
			program,
			id,
			stud_email,
			login_pw,
			advisor,
			stud_yr,
			status,
			address,
			contact_num
		} = body;

		// Attempt to insert the student record into the Student table
		const { data, error } = await supabase
			.from('Student')
			.insert([
				{
					stud_Fname,
					stud_Mname,
					stud_Lname,
					program,
					id,
					stud_email,
					login_pw,
					advisor,
					stud_yr,
					status,
					address,
					contact_num
				}
			])
			.select('*'); // Ensures the inserted rows are returned

		// Log the results
		console.log('Insert Result:', data, 'Error:', error);

		// Handle errors from the insert operation
		if (error) {
			throw new Error(error.message);
		}

		// Check if data is null or empty
		if (!data || data.length === 0) {
			return new Response(JSON.stringify({ success: false, message: 'Failed to add student' }), {
				status: 500
			});
		}

		// Return success response
		return new Response(
			JSON.stringify({
				success: true,
				message: 'Student added successfully',
				student: data[0] // Return the first inserted student
			}),
			{ status: 200 }
		);
	} catch (error) {
		// Log unexpected errors
		console.error('Error adding student:', error.message);

		// Return error response
		return new Response(JSON.stringify({ success: false, message: error.message }), {
			status: 500
		});
	}
}
