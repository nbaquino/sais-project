import { supabase } from "$lib/supabaseClient";
import type { CourseSearchResult } from '$lib/types/database';

export class CourseService {
    static async searchCourses(searchQuery: string): Promise<CourseSearchResult[]> {
        const searchQueryLower = searchQuery.toLowerCase();
        console.log('Searching for:', searchQueryLower);

        try {
            // Get course catalog from API - Fixed URL
            console.log('Fetching course catalog...');
            const courseResponse = await fetch('https://one27-advising.onrender.com/apis/getCourseCatalogue');
            const courseCatalog = await courseResponse.json();
            console.log('Course catalog received:', courseCatalog.length, 'courses');

            // Find matching courses
            const matchingCourses = courseCatalog.filter((course: any) =>
                course.course_id.toString().toLowerCase().includes(searchQueryLower) ||
                course.name.toLowerCase().includes(searchQueryLower)
            );
            console.log('Matching courses found:', matchingCourses.length);

            if (matchingCourses.length > 0) {
                console.log('Found matching courses, getting sections...');
                return await this.getCourseSections(matchingCourses, courseCatalog);
            }

            console.log('No direct matches, searching by section/instructor...');
            return await this.searchBySectionOrInstructor(searchQueryLower, courseCatalog);
        } catch (error) {
            console.error('Error in searchCourses:', error);
            throw error;
        }
    }

    private static async getCourseSections(matchingCourses: any[], courseCatalog: any[]): Promise<CourseSearchResult[]> {
        try {
            const courseIds = matchingCourses.map(course => course.course_id);
            console.log('Getting sections for course IDs:', courseIds);

            const { data: sectionData, error: sectionError } = await supabase
                .from("Section")
                .select(`
                    *,
                    Room!room_ID(room_name, room_capac),
                    SectionAvailability!avail_ID(
                        avail_enrollTot,
                        avail_waistlistTot,
                        avail_waitlistCap
                    )
                `)
                .in('course_id', courseIds);

            if (sectionError) {
                console.error('Section query error:', sectionError);
                throw sectionError;
            }
            console.log('Section data received:', sectionData?.length || 0, 'sections');

            const { data: instructorData, error: instructorError } = await supabase
                .from("Instructor")
                .select('inst_id, inst_fname, inst_lname');

            if (instructorError) {
                console.error('Instructor query error:', instructorError);
                throw instructorError;
            }
            console.log('Instructor data received:', instructorData?.length || 0, 'instructors');

            const results = this.mapSearchResults(sectionData || [], courseCatalog, instructorData || []);
            console.log('Final mapped results:', results.length);
            return results;
        } catch (error) {
            console.error('Error in getCourseSections:', error);
            throw error;
        }
    }

    private static async searchBySectionOrInstructor(searchQuery: string, courseCatalog: any[]): Promise<CourseSearchResult[]> {
        try {
            const { data: sectionData, error: sectionError } = await supabase
                .from("Section")
                .select(`
                    sect_ID,
                    course_id,
                    sect_days,
                    sect_start_time,
                    sect_end_time,
                    sect_status,
                    sect_name,
                    inst_ID,
                    Room!room_ID(room_name, room_capac),
                    SectionAvailability!avail_ID(
                        avail_enrollTot,
                        avail_waistlistTot,
                        avail_waitlistCap
                    )
                `);

            if (sectionError) throw sectionError;

            const { data: instructorData, error: instructorError } = await supabase
                .from("Instructor")
                .select('inst_id, inst_fname, inst_lname');

            if (instructorError) throw instructorError;

            const filteredSections = this.filterSections(sectionData || [], instructorData || [], searchQuery);
            return this.mapSearchResults(filteredSections, courseCatalog, instructorData || []);
        } catch (error) {
            console.error('Error in searchBySectionOrInstructor:', error);
            throw error;
        }
    }

    private static filterSections(sections: any[], instructors: any[], searchQuery: string): any[] {
        return sections.filter(section => {
            const instructor = instructors.find(i => i.inst_id === section.inst_ID);
            const instructorName = instructor
                ? `${instructor.inst_fname} ${instructor.inst_lname}`.toLowerCase()
                : '';

            return section.sect_ID.toString().toLowerCase().includes(searchQuery) ||
                   section.sect_days?.toLowerCase().includes(searchQuery) ||
                   section.sect_start_time?.toLowerCase().includes(searchQuery) ||
                   section.sect_end_time?.toLowerCase().includes(searchQuery) ||
                   instructorName.includes(searchQuery);
        });
    }

    private static mapSearchResults(sections: any[], courseCatalog: any[], instructors: any[]): CourseSearchResult[] {
        return sections.map(section => {
            const course = courseCatalog.find((c: any) => c.course_id === section.course_id);
            const instructor = instructors.find(i => i.inst_id === section.inst_ID);

            return {
                crs_ID: course?.course_id || section.course_id,
                crs_code: course?.course_id || section.course_id,
                crs_name: course?.name || 'Unknown Course',
                crs_units: course?.units || 0,
                sect_ID: section.sect_ID,
                sect_days: section.sect_days,
                sect_start_time: section.sect_start_time,
                sect_end_time: section.sect_end_time,
                sect_status: section.sect_status,
                crs_instructor: instructor
                    ? `${instructor.inst_fname} ${instructor.inst_lname}`
                    : 'TBA',
                room_name: section.Room?.room_name || 'TBA',
                room_capac: section.Room?.room_capac || 'N/A',
                avail_enrollTot: section.SectionAvailability?.avail_enrollTot || 0,
                avail_waistlistTot: section.SectionAvailability?.avail_waistlistTot || 0,
                avail_waitlistCap: section.SectionAvailability?.avail_waitlistCap || 'N/A',
                sect_name: section.sect_name || 'N/A'
            };
        });
    }
}
