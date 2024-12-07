<script lang="ts">
    import CourseDetailPopup from "$lib/components/layout/CourseDetailPopup.svelte"; // Ensure the correct import path
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import PageLayout from "$lib/components/layout/PageLayout.svelte";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    let searchQuery = "";
    let searchResults: string | any[] = [];
    let isLoading = false;
    let errorMessage = "";
    let selectedCourse: any = null;
    let isPopupVisible = false;
    let course = "";

    async function handleSearch() {
        if (!searchQuery.trim()) {
            errorMessage = "Please enter a search query.";
            return;
        }

        isLoading = true;
        errorMessage = "";
        const searchQueryLower = searchQuery.toLowerCase();
        console.log('Search Query:', searchQueryLower);

        try {
            // First get course catalog from API
            console.log('Fetching course catalog from API...');
            const courseResponse = await fetch('https://one27-advising.onrender.com/apis/getCourseCatalogue');
            const courseCatalog = await courseResponse.json();
            console.log('Course Catalog:', courseCatalog);

            // Filter courses based on search query
            const matchingCourses = courseCatalog.filter((course: any) =>
                course.course_id.toString().toLowerCase().includes(searchQueryLower) ||
                course.name.toLowerCase().includes(searchQueryLower)
            );

            if (matchingCourses.length > 0) {
                console.log('Matching Courses:', matchingCourses);
                // Get the course IDs that matched
                const courseIds = matchingCourses.map(course => course.course_id);

                // Get sections for these courses from Supabase
                const { data: sectionData, error: sectionError } = await supabase
                    .from("Section")
                    .select(`
                        sect_ID,
                        course_id,
                        sect_days,
                        sect_start_time,
                        sect_end_time,
                        sect_status,
                        inst_ID
                    `)
                    .in('course_id', courseIds);

                if (sectionError) throw sectionError;

                // Get instructor data
                const { data: instructorData, error: instructorError } = await supabase
                    .from("Instructor")
                    .select('inst_id, inst_fname, inst_lname');

                if (instructorError) throw instructorError;

                // Combine the data
                searchResults = sectionData.map(section => {
                    const course = courseCatalog.find((c: any) => c.course_id === section.course_id);
                    const instructor = instructorData.find(i => i.inst_id === section.inst_ID);

                    return {
                        crs_ID: course.course_id,
                        crs_code: course.course_id,
                        crs_name: course.name,
                        crs_units: course.units,
                        sect_ID: section.sect_ID,
                        sect_days: section.sect_days,
                        sect_start_time: section.sect_start_time,
                        sect_end_time: section.sect_end_time,
                        sect_status: section.sect_status,
                        crs_instructor: instructor
                            ? `${instructor.inst_fname} ${instructor.inst_lname}`
                            : 'TBA'
                    };
                });
            } else {
                // If no courses match, try searching by section or instructor
                const { data: sectionData, error: sectionError } = await supabase
                    .from("Section")
                    .select(`
                        sect_ID,
                        course_id,
                        sect_days,
                        sect_start_time,
                        sect_end_time,
                        sect_status,
                        inst_ID
                    `);

                if (sectionError) throw sectionError;

                const { data: instructorData, error: instructorError } = await supabase
                    .from("Instructor")
                    .select('inst_id, inst_fname, inst_lname');

                if (instructorError) throw instructorError;

                // Filter sections based on other criteria
                const filteredSections = sectionData.filter(section => {
                    const instructor = instructorData.find(i => i.inst_id === section.inst_ID);
                    const instructorName = instructor
                        ? `${instructor.inst_fname} ${instructor.inst_lname}`.toLowerCase()
                        : '';

                    return section.sect_ID.toString().toLowerCase().includes(searchQueryLower) ||
                           section.sect_days?.toLowerCase().includes(searchQueryLower) ||
                           section.sect_start_time?.toLowerCase().includes(searchQueryLower) ||
                           section.sect_end_time?.toLowerCase().includes(searchQueryLower) ||
                           instructorName.includes(searchQueryLower);
                });

                // Combine the data
                searchResults = filteredSections.map(section => {
                    const course = courseCatalog.find((c: any) => c.course_id === section.course_id);
                    const instructor = instructorData.find(i => i.inst_id === section.inst_ID);

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
                            : 'TBA'
                    };
                });
            }

            console.log('Final Search Results:', searchResults);

            if (searchResults.length === 0) {
                errorMessage = "No results found matching your search criteria.";
            }

        } catch (err) {
            console.error("Unexpected error:", err);
            errorMessage = "An unexpected error occurred. Please try again.";
            searchResults = [];
        } finally {
            isLoading = false;
        }
    }

    function openPopup(course: any) {
        console.log('Opening pop-up for:', course);  // Debugging log
        selectedCourse = course;
        isPopupVisible = true;
        console.log('Popup visibility:', isPopupVisible);
    }

    function closePopup() {
        isPopupVisible = false;
        selectedCourse = null;
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
                          <span class="text-blue-600">��</span>
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
                      <Button variant="default" on:click={handleSearch} disabled={isLoading}>
                          {isLoading ? "Searching..." : "Search"}
                      </Button>
                  </div>

                  {#if errorMessage}
                      <p class="text-red-500">{errorMessage}</p>
                  {/if}

                  {#if searchResults.length > 0}
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
                              {#each searchResults as course}
                                  <TableRow>
                                      <TableCell>
                                          <button class="text-blue-600" on:click={() => openPopup(course)}>
                                              {course.crs_code}
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
                  {:else if !isLoading}
                      <p>No results found for "{searchQuery}".</p>
                  {/if}
              </CardContent>
          </Card>
      </div>

      {#if isPopupVisible}
            {console.log('Selected Course in Parent:', selectedCourse)}
            <CourseDetailPopup course={selectedCourse} {closePopup} />

      {/if}
  </PageLayout>
