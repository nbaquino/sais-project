import { json } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('Section')
            .select(`
                *,
                Room (
                    room_name,
                    room_capac
                ),
                SectionAvailability (
                    avail_enrollTot,
                    avail_waistlistTot,
                    avail_waitlistCap
                )
            `)
            .order('sect_ID');

        if (error) {
            console.error('Error fetching sections:', error);
            return json({ error: 'Error fetching sections' }, { status: 500 });
        }

        const transformedData = data.map((section) => ({
            sect_ID: section.sect_ID,
            course_id: section.course_id,
            inst_ID: section.inst_ID,
            sect_name: section.sect_name,
            sect_days: section.sect_days,
            sect_start_time: section.sect_start_time,
            sect_end_time: section.sect_end_time,
            sect_status: section.sect_status,
            Room: section.Room ? {
                room_name: section.Room.room_name,
                room_capac: section.Room.room_capac
            } : undefined,
            SectionAvailability: section.SectionAvailability ? {
                avail_enrollTot: section.SectionAvailability.avail_enrollTot,
                avail_waistlistTot: section.SectionAvailability.avail_waistlistTot,
                avail_waitlistCap: section.SectionAvailability.avail_waitlistCap
            } : undefined
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
