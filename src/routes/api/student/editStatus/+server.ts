import { supabase } from '$lib/server/supabaseClient';

export async function PUT({ request }) {
	try {
		const { studentId, newStatus } = await request.json();

		if (!studentId || !newStatus) {
			return new Response('Student ID and new status are required', { status: 400 });
		}

		const { data, error } = await supabase
			.from('Student')
			.update({ status: newStatus })
			.eq('stud_id', studentId)
			.select();

		if (error || !data || data.length === 0) {
			console.error('Error updating student status:', error);
			return new Response('Error updating student status', { status: 500 });
		}

		return new Response('Student status updated successfully', { status: 200 });

	} catch (error) {
		console.error('Unexpected error:', error);
		return new Response('An unexpected error occurred', { status: 500 });
	}
}
