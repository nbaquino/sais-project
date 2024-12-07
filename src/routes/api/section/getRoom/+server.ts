import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('Room')
            .select('*')
            .order('room_id');

        if (error) {
            console.error('Error fetching rooms:', error);
            return json({ error: 'Error fetching rooms' }, { status: 500 });
        }

        const transformedData = data.map((room) => ({
            room_id: room.room_id,
            room_name: room.room_name,
            room_capac: room.room_capac
        }));

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
