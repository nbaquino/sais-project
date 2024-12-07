import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('SectionAvailability')
            .select('*')
            .order('avail_id');

        if (error) {
            console.error('Error fetching section availability:', error);
            return json({ error: 'Error fetching section availability' }, { status: 500 });
        }

        const transformedData = data.map((availability) => ({
            avail_id: availability.avail_id,
            avail_enrollTot: availability.avail_enrollTot,
            avail_waistlistTot: availability.avail_waistlistTot,
            avail_waitlistCap: availability.avail_waitlistCap
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
