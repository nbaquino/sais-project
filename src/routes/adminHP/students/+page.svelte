<script>
	import { onMount } from 'svelte';
	import { PrimCard, Table } from '$lib/components/layout/index';
	import Button from '$lib/components/ui/button/button.svelte';

	let students = [];

	// Fetch student data when the component mounts
	onMount(async () => {
		try {
			const response = await fetch('../../api/student/getAllStudents');
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

	// Function to update a student's status to "Expelled"
	const expel = async (studentId) => {
		try {
			const response = await fetch('../../api/student/editStatus', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ studentId, newStatus: 'Expelled' })
			});
			const result = await response.json();
			if (result.success) {
				// Update the status of the student in the local students array
				students = students.map((student) =>
					student.id === studentId ? { ...student, status: 'Expelled' } : student
				);
				console.log('Student expelled:', studentId);
			} else {
				console.error('Failed to expel student:', result.message);
			}
		} catch (error) {
			console.error('Error expelling student:', error);
		}
	};

	// Function to update a student's status to "LOA" (Leave of Absence)
	const loa = async (studentId) => {
		try {
			const response = await fetch('../../api/student/editStatus', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ studentId, newStatus: 'LOA' })
			});
			const result = await response.json();
			if (result.success) {
				// Update the status of the student in the local students array
				students = students.map((student) =>
					student.id === studentId ? { ...student, status: 'LOA' } : student
				);
				console.log('Student on LOA:', studentId);
			} else {
				console.error('Failed to set student LOA:', result.message);
			}
		} catch (error) {
			console.error('Error setting student LOA:', error);
		}
	};

	// Function to reactivate a student (status to "Active")
	const active = async (studentId) => {
		try {
			const response = await fetch('../../api/student/editStatus', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ studentId, newStatus: 'Active' })
			});
			const result = await response.json();
			if (result.success) {
				// Update the status of the student in the local students array
				students = students.map((student) =>
					student.id === studentId ? { ...student, status: 'Active' } : student
				);
				console.log('Student reactivated:', studentId);
			} else {
				console.error('Failed to reactivate student:', result.message);
			}
		} catch (error) {
			console.error('Error reactivating student:', error);
		}
	};
</script>

<PrimCard title="All Active Students">
	<table class="w-full table-auto">
		<thead>
			<!-- Table headers -->
			<tr>
				<th class="px-4 py-2">ID</th>
				<th class="px-4 py-2">First Name</th>
				<th class="px-4 py-2">Middle Name</th>
				<th class="px-4 py-2">Surname</th>
				<th class="px-4 py-2">Program</th>
				<th class="px-4 py-2">Year</th>
				<th class="px-4 py-2">Email</th>
				<th class="px-4 py-2">Advisor</th>
				<th class="px-4 py-2">Actions</th>
			</tr>
		</thead>
		<tbody class="text-center">
			{#each students as student}
				{#if student.status === 'Active'}
					<tr>
						<td class="px-4 py-2">{student.id}</td>
						<td class="px-4 py-2">{student.stud_Fname}</td>
						<td class="px-4 py-2">{student.stud_Mname}</td>
						<td class="px-4 py-2">{student.stud_Lname}</td>
						<td class="px-4 py-2">{student.program}</td>
						<td class="px-4 py-2">{student.stud_yr}</td>
						<td class="px-4 py-2">{student.stud_email}</td>
						<td class="px-4 py-2">{student.advisor}</td>
						<td class="px-4 py-2">
							<Button variant="destructive" on:click={() => expel(student.id)}>Expel</Button>
							<Button variant="secondary" on:click={() => loa(student.id)}>LOA</Button>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</PrimCard>

<PrimCard title="LOA Students">
	<table class="w-full table-auto">
		<thead>
			<!-- Table headers -->
			<tr>
				<th class="px-4 py-2">ID</th>
				<th class="px-4 py-2">First Name</th>
				<th class="px-4 py-2">Middle Name</th>
				<th class="px-4 py-2">Surname</th>
				<th class="px-4 py-2">Program</th>
				<th class="px-4 py-2">Year</th>
				<th class="px-4 py-2">Email</th>
				<th class="px-4 py-2">Advisor</th>
			</tr>
		</thead>
		<tbody class="text-center">
			{#each students as student}
				{#if student.status === 'LOA'}
					<tr>
						<td class="px-4 py-2">{student.id}</td>
						<td class="px-4 py-2">{student.stud_Fname}</td>
						<td class="px-4 py-2">{student.stud_Mname}</td>
						<td class="px-4 py-2">{student.stud_Lname}</td>
						<td class="px-4 py-2">{student.program}</td>
						<td class="px-4 py-2">{student.stud_yr}</td>
						<td class="px-4 py-2">{student.stud_email}</td>
						<td class="px-4 py-2">{student.advisor}</td>
						<td class="px-4 py-2">
							<Button variant="destructive" on:click={() => expel(student.id)}>Expel</Button>
							<Button on:click={() => active(student.id)}>Re-enroll</Button>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</PrimCard>
