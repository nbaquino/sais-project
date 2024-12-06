<script lang="ts">
    export let course: any;  // Define the course prop that will receive the course details
    export let closePopup: () => void;  // Function to close the popup
    $: console.log('Course data in Popup:', course);
  </script>
  
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg w-1/3">
      <button class="absolute top-2 right-2 text-xl" on:click={closePopup}>×</button>
      <h2 class="text-2xl font-semibold">{course.crs_code} {course.crs_ID} - {course.crs_name}</h2>
      <ul class="mt-4 space-y-2">
        <li><strong>Section ID:</strong> {course.sect_ID}</li>
        <li><strong>Instructor:</strong> {course.crs_instructor}</li>
        <li><strong>Units:</strong> {course.crs_units}</li>
        <li><strong>Schedule:</strong> {course.sect_days} {course.sect_start_time} - {course.sect_end_time}</li>
        <li><strong>Room:</strong> {course.room_ID || 'N/A'}</li>
        <li><strong>Status:</strong> {course.sect_status}</li>
        <li><strong>Section Name:</strong> {course.sect_name}</li>
      </ul>
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
  