import { supabase } from '$lib/server/supabaseClient';

export async function PUT({ request }) {
	try {
		// Parse the incoming request body to get the student ID and the new status
		const { studentId, newStatus } = await request.json();

		if (!studentId || !newStatus) {
			return new Response(
				JSON.stringify({ success: false, message: 'Student ID and new status are required' }),
				{ status: 400 }
			);
		}

		// Update the student's status in the "students" table
		const { data, error } = await supabase
			.from('Student')
			.update({ status: newStatus })
			.eq('stud_id', studentId); // Ensure we're updating the correct student by ID

		// Handle any error that might occur during the update
		if (error) {
			console.error('Error updating student status:', error);
			return new Response(
				JSON.stringify({ success: false, message: 'Error updating student status' }),
				{ status: 500 }
			);
		}

		// Return a success response
		return new Response(
			JSON.stringify({ success: true, message: 'Student status updated successfully' }),
			{ status: 200 }
		);
	} catch (error) {
		console.error('Unexpected error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
		return new Response(JSON.stringify({ success: false, message: errorMessage }), {
			status: 500
		});
	}
}
