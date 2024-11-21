<script>
	import { onMount } from 'svelte';
	import { PrimCard, Table } from '$lib/components/layout/index';
	let students = [];

	// Fetch student data when the component mounts
	onMount(async () => {
		try {
			const response = await fetch('/api/student');
			const result = await response.json();

			if (result.success) {
				students = result.data; // Store the fetched students in the array
				console.log('Fetched Students:', students);
			} else {
				console.error('Failed to fetch students:', result.message);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<PrimCard title="All Students">
	<table class="table-auto">
		<thead>
			<!-- table headers -->
			<tr>
				<th>ID</th>
				<th>First Name</th>
				<th>Middle Name</th>
				<th>Surname</th>
				<th>Program</th>
				<th>Year</th>
				<th>Email</th>
				<th>Advisor</th>
			</tr>
		</thead>
		<tbody> </tbody>
	</table>
</PrimCard>
