import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
	try {
		const { data, error } = await supabase.from('Student').select('*');

		if (error) {
			console.error('Error fetching students:', error);
			return new Response(JSON.stringify({ error: 'Error fetching students' }), {
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		// Return just the data array with proper formatting
		return new Response(JSON.stringify(data, null, 2), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Unexpected error:', error);
		return new Response(JSON.stringify({ error: 'Unexpected error' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
