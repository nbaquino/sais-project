<script>
	import { PrimCard } from '$lib/components/layout/index';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button';

	// Program options
	const programs = [
		{ value: 'BS Computer Science', label: 'BS Computer Science' },
		{ value: 'BS Mathematics', label: 'BS Mathematics' },
		{ value: 'BS Biology', label: 'BS Biology' },
		{ value: 'BS Physics', label: 'BS Physics' },
		{ value: 'BA Communication', label: 'BA Communication' }
	];

	// Form state variables with correct column names
	let stud_Fname = '';
	let stud_Mname = '';
	let stud_Lname = '';
	let program = '';
	let id = '';
	let stud_email = '';
	let login_pw = '';

	// Generate student ID, email, and password
	$: id = `${new Date().getFullYear()}${Math.floor(Math.random() * 900) + 100}${new Date().toISOString().slice(5, 10).replace(/-/g, '')}`;
	$: stud_email = `${stud_Fname.charAt(0).toLowerCase()}${stud_Mname.charAt(0).toLowerCase()}${stud_Lname.toLowerCase()}@email.com`;
	$: login_pw = id;

	const handleSubmit = async () => {
		// Construct the student object
		const newStudent = {
			stud_Fname,
			stud_Mname,
			stud_Lname,
			program,
			id,
			stud_email,
			login_pw
		};

		// Send data to the API route
		const response = await fetch('/api/student', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newStudent)
		});

		const result = await response.json();

		// Check if the submission was successful
		if (result.success) {
			alert(result.message); // Show success message

			// Reset form fields after submission
			stud_Fname = '';
			stud_Mname = '';
			stud_Lname = '';
			program = ''; // Reset program selector
		} else {
			alert(`Error: ${result.message}`); // Show error message
		}
	};
</script>

<PrimCard title="Add New Student">
	<div class="mb-5 flex">
		<div>
			<Label for="Fname">First Name</Label>
			<Input type="text" id="Fname" placeholder="Jose" bind:value={stud_Fname} />
		</div>
		<div>
			<Label for="Mname">Middle Name</Label>
			<Input type="text" id="Mname" placeholder="Protasio" bind:value={stud_Mname} />
		</div>
		<div>
			<Label for="Lname">Last Name</Label>
			<Input type="text" id="Lname" placeholder="Rizal" bind:value={stud_Lname} />
		</div>
	</div>
	<div class="mb-5 flex justify-between">
		<div>
			<Label for="stud_id">Student ID Number</Label>
			<p id="stud_id">{id}</p>
		</div>
		<div>
			<Label for="email">Email</Label>
			<p id="email">{stud_email}</p>
		</div>
		<div>
			<Label for="loginPW">Password</Label>
			<p id="loginPW">{login_pw}</p>
		</div>
	</div>
	<Select.Root portal={null} bind:value={program} on:change={(event) => (program = event.detail)}>
		<Select.Trigger class="w-[180px]">
			<Select.Value placeholder="Select Program" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Label>Programs</Select.Label>
				{#each programs as prog}
					<Select.Item value={prog.value} label={prog.label}>{prog.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</PrimCard>

<Button variant="secondary" on:click={handleSubmit}>Submit</Button>

<style>
</style>
