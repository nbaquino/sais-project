<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { cartStore } from '$lib/stores/cartStore';
    import { addToast } from '$lib/stores/toastStore';
    export let course: any;
    export let closePopup: () => void;

    function addToCart() {
        cartStore.update(state => {
            if (state.items.some(item => item.sect_ID === course.sect_ID)) {
                addToast(`${course.crs_code} (${course.sect_ID}) ${course.sect_name || ''} - ${course.crs_name} is already in your cart`, 'warning');
                return state;
            }

            addToast(`${course.crs_code} (${course.sect_ID}) ${course.sect_name || ''} - ${course.crs_name} added to cart`, 'success');
            return {
                ...state,
                items: [...state.items, course]
            };
        });
        closePopup();
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
        <button
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            on:click={closePopup}
        >
            ✕
        </button>

        <h2 class="text-2xl font-bold mb-4">{course.crs_code} - {course.crs_name}</h2>

        <div class="space-y-4">
            <!-- Course & Section Details -->
            <div class="border-b pb-4">
                <h3 class="font-semibold mb-2">Course Information</h3>
                <p><strong>Section Name:</strong> {course.sect_name || 'N/A'}</p>
                <p><strong>Schedule:</strong> {course.sect_days} {course.sect_start_time} - {course.sect_end_time}</p>
                <p><strong>Instructor:</strong> {course.crs_instructor}</p>
                <p><strong>Units:</strong> {course.crs_units}</p>
                <p><strong>Status:</strong> {course.sect_status}</p>
            </div>

            <!-- Room Details -->
            <div class="border-b pb-4">
                <h3 class="font-semibold mb-2">Location</h3>
                <p><strong>Room:</strong> {course.room_name || 'TBA'}</p>
                <p><strong>Room Capacity:</strong> {course.room_capac || 'N/A'}</p>
            </div>

            <!-- Availability Details -->
            <div class="border-b pb-4">
                <h3 class="font-semibold mb-2">Enrollment Information</h3>
                <p><strong>Total Enrolled:</strong> {course.avail_enrollTot || '0'}</p>
                <p><strong>Waitlist Total:</strong> {course.avail_waistlistTot || '0'}</p>
                <p><strong>Waitlist Capacity:</strong> {course.avail_waitlistCap || 'N/A'}</p>
            </div>

            <div class="flex justify-end gap-2 mt-6">
                <Button variant="outline" on:click={closePopup}>Close</Button>
                <Button variant="default" on:click={addToCart}>Add to Cart</Button>
            </div>
        </div>
    </div>
</div>

  <style>
    /* Ensure the pop-up covers the screen and looks good */
    .fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .bg-black {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .z-50 {
      z-index: 50;
    }

    .bg-white {
      background-color: white;
    }
  </style>
