<script lang="ts">
    import { courseStore } from '$lib/stores/courseStore';
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";

    export let searchQuery: string;
    export let handleSearch: () => Promise<void>;
</script>

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
                                <button
                                    class="text-blue-600"
                                    on:click={() => $courseStore.selectedCourse = course}
                                >
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
