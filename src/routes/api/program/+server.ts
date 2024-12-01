import { supabase } from '$lib/server/supabaseClient';

export const GET = async () => {
	try {
		// Query the Program table
		const { data, error } = await supabase.from('Program').select('*');

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
	} catch (err) {
		// Handle unexpected errors
		return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
