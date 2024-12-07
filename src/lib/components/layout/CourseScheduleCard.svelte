<script lang="ts">
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
</script>

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
