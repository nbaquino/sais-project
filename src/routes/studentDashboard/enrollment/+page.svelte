<script lang="ts">
    import CourseDetailPopup from "$lib/components/layout/CourseDetailPopup.svelte";
    import CourseScheduleCard from "$lib/components/layout/CourseScheduleCard.svelte";
    import PageLayout from "$lib/components/layout/PageLayout.svelte";
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import { courseStore } from '$lib/stores/courseStore';
    import { CourseService } from '$lib/services/courseService';
    import { cartStore, loadCartItems } from '$lib/stores/cartStore';
    import { addToast } from '$lib/stores/toastStore';
    import { supabase } from '$lib/supabaseClient';
    import type { CourseSearchResult } from '$lib/types/database';

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
            const query = searchQuery.toLowerCase().trim();
            const allCourses = await CourseService.searchCourses("");

            $courseStore.searchResults = allCourses.filter(course =>
                // Original search criteria
                course.crs_code?.toLowerCase().includes(query) ||
                course.crs_name?.toLowerCase().includes(query) ||
                course.crs_instructor?.toLowerCase().includes(query) ||
                // Updated room search using correct field name
                course.room_name?.toLowerCase().includes(query) ||
                course.sect_status?.toLowerCase().includes(query) ||
                course.sect_ID?.toString().toLowerCase().includes(query)
            );

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

    async function addToCart(course: CourseSearchResult) {
        try {
            const storedStudent = localStorage.getItem('student');
            if (!storedStudent) {
                addToast('Please log in to add items to cart', 'error');
                return;
            }

            const studentData = JSON.parse(storedStudent);
            console.log('Adding course:', course);
            console.log('Student ID:', studentData.stud_id);

            // Check if the section is already in the cart
            const { data: existingItem, error: checkError } = await supabase
                .from('Shopping Cart')
                .select('*')
                .eq('stud_id', studentData.stud_id)
                .eq('sect_id', course.sect_ID);

            console.log('Existing items:', existingItem);
            console.log('Check error:', checkError);

            if (existingItem && existingItem.length > 0) {
                addToast(`${course.crs_code} is already in your cart`, 'warning');
                return;
            }

            // Add to Shopping Cart table
            const { error } = await supabase
                .from('Shopping Cart')
                .insert({
                    stud_id: studentData.stud_id,
                    sect_id: course.sect_ID
                });

            if (error) {
                console.error('Error adding to cart:', error);
                addToast('Failed to add item to cart', 'error');
                return;
            }

            await loadCartItems();
            addToast(`${course.crs_code} added to cart`, 'success');
        } catch (error) {
            console.error('Error adding to cart:', error);
            addToast('Failed to add item to cart', 'error');
        }
    }

    async function removeFromCart(cartId: number) {
        try {
            const storedStudent = localStorage.getItem('student');
            if (!storedStudent) {
                addToast('Please log in to remove courses from cart', 'error');
                return;
            }

            const studentData = JSON.parse(storedStudent);
            const studentId = studentData.stud_id || studentData.stud_ID || studentData.id;

            // Set the RLS policy with corrected claim name
            await supabase.rpc('set_claim', {
                claim: 'stud_id',
                value: studentId
            });

            const { error } = await supabase
                .from('Shopping Cart')
                .delete()
                .eq('cart_id', cartId);

            if (error) throw error;

            await loadCartItems();
            addToast('Course removed from cart', 'success');
        } catch (error) {
            console.error('Error removing from cart:', error);
            addToast('Failed to remove course from cart', 'error');
        }
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

        <CourseScheduleCard />

<!--CLASS SEARCH SECTION--->
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
                        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button variant="outline" class="flex gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                        </svg>
                        Filters
                    </Button>
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
                                            {#if course.sect_name && course.sect_name !== 'N/A'}
                                                 {course.sect_name}
                                            {/if}
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
                                        <Button
                                            variant="default"
                                            size="sm"
                                            on:click={() => addToCart(course)}
                                        >
                                            Add to Cart
                                        </Button>
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
