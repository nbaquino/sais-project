<script lang="ts">
    export let course: any;
    export let closePopup: () => void;
</script>

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-5 rounded-lg shadow-lg max-w-xl w-full relative">
        <!-- Close button -->
        <button
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            on:click={closePopup}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>

        <!-- Course details -->
        <div class="space-y-6">
            <div>
                <h2 class="text-xl font-semibold">{course.course_id} - {course.crs_name}</h2>
                <p class="text-sm text-gray-500">Section {course.sect_ID}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h3 class="font-medium text-gray-700">Schedule</h3>
                    <p>{course.sect_days} {course.sect_start_time}-{course.sect_end_time}</p>
                </div>
                <div>
                    <h3 class="font-medium text-gray-700">Units</h3>
                    <p>{course.crs_units}</p>
                </div>
                <div>
                    <h3 class="font-medium text-gray-700">Status</h3>
                    <span class="px-2 py-1 rounded-full text-sm {course.sect_status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        {course.sect_status}
                    </span>
                </div>
            </div>

            <!-- Location Information -->
            <div>
                <h3 class="font-medium text-gray-700 mb-2">Location</h3>
                <div class="grid grid-cols-2 gap-4 pl-2">
                    <div>
                        <p class="text-sm text-gray-600">Room:</p>
                        <p>{course.room_name}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Room Capacity:</p>
                        <p>{course.room_capacity || 'N/A'}</p>
                    </div>
                </div>
            </div>

            <!-- Enrollment Information -->
            <div>
                <h3 class="font-medium text-gray-700 mb-2">Enrollment Information</h3>
                <div class="grid grid-cols-2 gap-4 pl-2">
                    <div>
                        <p class="text-sm text-gray-600">Total Enrolled:</p>
                        <p>{course.total_enrolled || 0}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Waitlist Total:</p>
                        <p>{course.waitlist_total || 0}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Waitlist Capacity:</p>
                        <p>{course.waitlist_capacity || 0}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
