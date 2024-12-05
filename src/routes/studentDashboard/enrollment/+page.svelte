<script lang="ts">
    import PageLayout from '$lib/components/layout/PageLayout.svelte';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import * as Card from "$lib/components/ui/card";
</script>

<PageLayout currentPage="studentDashboard/enrollment">
    <div class="p-6">
        <Card.Root class="w-full">
            <Card.Header>
                <Card.Title>Enrollment</Card.Title>
                <Card.Description>Manage your course enrollment here</Card.Description>
            </Card.Header>

            <Card.Content>
                <div class="space-y-6">
                    <!-- Schedule Section -->
                    <div>
                        <h2 class="text-2xl font-semibold mb-4">My Class Schedule</h2>
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
                    </div>

                    <!-- Search Section -->
                    <div>
                        <h2 class="text-2xl font-semibold mb-4">Class Search</h2>
                        <div class="flex gap-2 mb-4">
                            <Input placeholder="Search for classes..." class="flex-1"/>
                            <Button>Search</Button>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead>Course Name</TableHead>
                                    <TableHead>Schedule</TableHead>
                                    <TableHead>Instructor</TableHead>
                                    <TableHead>Available Seats</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>CS101</TableCell>
                                    <TableCell>Introduction to Programming</TableCell>
                                    <TableCell>MWF 10:00-11:20</TableCell>
                                    <TableCell>Dr. Smith</TableCell>
                                    <TableCell>15</TableCell>
                                    <TableCell>
                                        <Button variant="default" size="sm">Enroll</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Card.Content>
        </Card.Root>
    </div>
</PageLayout>

<style>
</style>
