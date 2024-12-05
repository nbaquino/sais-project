<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import PageLayout from "$lib/components/layout/PageLayout.svelte";
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
                    <Input type="text" placeholder="Search for classes..." class="flex-1" />
                    <Button variant="default">Search</Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course Code</TableHead>
                            <TableHead>Course Name</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Units</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>CS101</TableCell>
                            <TableCell>Introduction to Programming</TableCell>
                            <TableCell>MWF 10:00-11:20</TableCell>
                            <TableCell>Dr. Smith</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>
                                <Button variant="default" size="sm">Enroll</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
</PageLayout>
