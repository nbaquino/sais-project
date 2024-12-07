<script lang="ts">
    import CourseDetailPopup from "$lib/components/layout/CourseDetailPopup.svelte";
    import PageLayout from "$lib/components/layout/PageLayout.svelte";
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import { courseStore } from '$lib/stores/courseStore';
    import { CourseService } from '$lib/services/courseService';

    let searchQuery = "";
    let isPopupVisible = false;

    async function handleSearch() {
        if (!searchQuery.trim()) {
            $courseStore.errorMessage = "Please enter a search query.";
            return;
        }

        $courseStore.isLoading = true;
        $courseStore.errorMessage = "";

        try {
            $courseStore.searchResults = await CourseService.searchCourses(searchQuery);

            if ($courseStore.searchResults.length === 0) {
                $courseStore.errorMessage = "No results found matching your search criteria.";
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            $courseStore.errorMessage = "An unexpected error occurred. Please try again.";
            $courseStore.searchResults = [];
        } finally {
            $courseStore.isLoading = false;
        }
    }

    function openPopup(course: any) {
        $courseStore.selectedCourse = course;
        isPopupVisible = true;
    }

    function closePopup() {
        isPopupVisible = false;
        $courseStore.selectedCourse = null;
    }
</script>

<PageLayout currentPage="studentDashboard/enrollment">
    <div class="space-y-6">
        <div class="space-y-2">
            <h1 class="text-3xl font-semibold tracking-tight">Course Enrollment</h1>
            <p class="text-muted-foreground">
                Manage your class schedule and search for available courses. You can enroll, drop, or join the waitlist for classes here.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>My Class Schedule</CardTitle>
                <CardDescription>View and manage your current class enrollments</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex gap-4">
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
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Class Search</CardTitle>
                <CardDescription>Search and enroll in available courses for the current term</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex gap-2 mb-4">
                    <Input
                        type="text"
                        placeholder="Search for classes..."
                        class="flex-1"
                        bind:value={searchQuery}
                    />
                    <Button variant="default" on:click={handleSearch} disabled={$courseStore.isLoading}>
                        {$courseStore.isLoading ? "Searching..." : "Search"}
                    </Button>
                </div>

                {#if $courseStore.errorMessage}
                    <p class="text-red-500">{$courseStore.errorMessage}</p>
                {/if}

                {#if $courseStore.searchResults.length > 0}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Code</TableHead>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Schedule</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead>Units</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {#each $courseStore.searchResults as course}
                                <TableRow>
                                    <TableCell>
                                        <button class="text-blue-600" on:click={() => openPopup(course)}>
                                            {course.crs_code} ({course.sect_ID})
                                        </button>
                                    </TableCell>
                                    <TableCell>{course.crs_name}</TableCell>
                                    <TableCell>
                                        {course.sect_days} {course.sect_start_time} - {course.sect_end_time}
                                    </TableCell>
                                    <TableCell>{course.crs_instructor}</TableCell>
                                    <TableCell>{course.crs_units}</TableCell>
                                    <TableCell>{course.sect_status}</TableCell>
                                    <TableCell>
                                        <Button variant="default" size="sm">Add to Cart</Button>
                                    </TableCell>
                                </TableRow>
                            {/each}
                        </TableBody>
                    </Table>
                {:else if !$courseStore.isLoading}
                    <p>No results found for "{searchQuery}".</p>
                {/if}
            </CardContent>
        </Card>
    </div>

    {#if isPopupVisible}
        <CourseDetailPopup course={$courseStore.selectedCourse} {closePopup} />
    {/if}
</PageLayout>
