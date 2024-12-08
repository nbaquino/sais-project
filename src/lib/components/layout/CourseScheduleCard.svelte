<script lang="ts">
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";

    let enrolledCourses: any[] = [];
    let loading = true;
    let error = null;

    async function loadEnrolledCourses() {
        try {
            const storedStudent = localStorage.getItem('student');
            if (!storedStudent) return;

            const studentData = JSON.parse(storedStudent);
            const studentId = studentData.stud_id || studentData.stud_ID || studentData.id;

            const { data, error: queryError } = await supabase
                .from('Enrollment')
                .select(`
                    enr_id,
                    sect_id,
                    Section (
                        sect_ID,
                        course_id,
                        sect_days,
                        sect_name,
                        sect_start_time,
                        sect_end_time,
                        sect_status,
                        Room (
                            room_name
                        )
                    )
                `)
                .eq('stud_id', studentId);

            if (queryError) throw queryError;

            enrolledCourses = data?.map(item => ({
                enr_id: item.enr_id,
                sect_ID: item.Section.sect_ID,
                course_id: item.Section.course_id,
                sect_name: item.Section.sect_name,
                sect_days: item.Section.sect_days,
                sect_start_time: item.Section.sect_start_time,
                sect_end_time: item.Section.sect_end_time,
                sect_status: item.Section.sect_status,
                room_name: item.Section.Room.room_name
            })) || [];

        } catch (e) {
            error = e;
            console.error('Error loading enrolled courses:', e);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadEnrolledCourses();
    });
</script>

<Card>
    <CardHeader>
        <CardTitle>My Class Schedule</CardTitle>
        <CardDescription>View and manage your current class enrollments</CardDescription>
    </CardHeader>
    <CardContent>
        <div class="flex gap-4 mb-4">
            <div class="flex items-center gap-2">
                <span class="text-green-600">✓</span>
                <span>Enrolled</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-blue-600">⬇</span>
                <span>Dropped</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-yellow-600">▲</span>
                <span>Wait Listed</span>
            </div>
        </div>

        {#if loading}
            <p>Loading your courses...</p>
        {:else if error}
            <p class="text-red-500">Error loading courses: {error.message}</p>
        {:else if enrolledCourses.length === 0}
            <p>No courses enrolled yet.</p>
        {:else}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Units</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {#each enrolledCourses as course}
                        <TableRow>
                            <TableCell>
                                <div>
                                    <div class="font-medium">{course.course_id} - {course.sect_ID}</div>
                                </div>
                            </TableCell>
                            <TableCell>{course.sect_name}</TableCell>
                            <TableCell>{course.sect_days} {course.sect_start_time}-{course.sect_end_time}</TableCell>
                            <TableCell>{course.room_name}</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>
                                <span class="px-2 py-1 rounded-full text-sm {course.sect_status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                    {course.sect_status}
                                </span>
                            </TableCell>
                        </TableRow>
                    {/each}
                </TableBody>
            </Table>
        {/if}
    </CardContent>
</Card>
