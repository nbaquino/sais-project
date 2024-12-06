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
  
        const searchInt = parseInt(searchQuery, 10);
        if (isNaN(searchInt)) {
            errorMessage = "Please enter a valid course number.";
            return;
        }
  
        isLoading = true;
        errorMessage = "";
  
        try {
            const { data, error } = await supabase
                .from("Section")
                .select(
                    "sect_ID,crs_ID, crs_code, sect_name, crs_name, sect_days, sect_start_time, sect_end_time, crs_instructor, crs_units, sect_status"
                )
                .eq("crs_ID", searchInt);
  
            if (error) {
                console.error("Error fetching search results:", error);
                errorMessage = "Failed to fetch search results. Please try again.";
                searchResults = [];
            } else {
                searchResults = data || [];
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            errorMessage = "An unexpected error occurred. Please try again.";
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
                          <span class="text-blue-600">●</span>
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
                                              {course.crs_code} - {course.crs_ID} ({course.sect_name}) ({course.sect_ID})
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
                                          <Button variant="default" size="sm">Enroll</Button>
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
  