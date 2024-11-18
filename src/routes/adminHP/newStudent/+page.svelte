<script>
	import { onMount } from 'svelte';
	import { PrimCard } from '$lib/components/layout/index';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Slider } from '$lib/components/ui/slider/index.js';

	let programs = [];
	let advisors = [];
	let stud_Fname = '';
	let stud_Mname = '';
	let stud_Lname = '';
	let program = ''; // Store selected program ID
	let id = '';
	let stud_email = '';
	let login_pw = '';
	let advisor = 0;
	let year = 0;

	// Fetch programs from API on component mount
	onMount(async () => {
		try {
			const response = await fetch('/api/program'); //change api from checklist and advisors
			console.log('Programs API Response:', response);
			const result = await response.json();
			console.log('Programs Data:', result);

			const response2 = await fetch('/api/advisor'); //change api from checklist and advisors
			console.log('Advisors API Response:', response2);
			const result2 = await response2.json();
			console.log('Advisors Data:', result2);

			if (result.success && result2.success) {
				programs = result.data.map((program) => ({
					value: program.id,
					label: program.prog_name
				}));
				advisors = result2.data.map((advisor) => ({
					value: advisor.id,
					label: advisor.teacher_name
				}));
			} else {
				console.error('Failed to fetch programs or advisors');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});

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
			id,
			stud_email,
			login_pw,
			program,
			advisor,
			stud_yr: year
		};
		console.log('Submitting New Student:', newStudent);

		const response = await fetch('/api/student', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newStudent)
		});

		console.log('Student Submission Response:', response);
		const result = await response.json();
		console.log('Student Submission Result:', result);

		// Check if the submission was successful
		if (result.success) {
			alert(result.message); // Show success message

			// Reset form fields after submission
			stud_Fname = '';
			stud_Mname = '';
			stud_Lname = '';
			program = ''; // Reset selected program
			year = 0; // Reset selected year
			advisor = 0; // Reset selected advisor if needed
			id = `${new Date().getFullYear()}${Math.floor(Math.random() * 900) + 100}${new Date().toISOString().slice(5, 10).replace(/-/g, '')}`;
		} else {
			alert(`Error: ${result.message}`); // Show error message

			// Reset form fields after submission
			stud_Fname = '';
			stud_Mname = '';
			stud_Lname = '';
			id = `${new Date().getFullYear()}${Math.floor(Math.random() * 900) + 100}${new Date().toISOString().slice(5, 10).replace(/-/g, '')}`;
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
		<div class="w-1/3">
			<Label for="stud_id">Student ID Number</Label>
			<p id="stud_id">{id}</p>
		</div>
		<div class="w-1/3">
			<Label for="email">Email</Label>
			<p id="email">{stud_email}</p>
		</div>
		<div class="w-1/3">
			<Label for="loginPW">Password</Label>
			<p id="loginPW">{login_pw}</p>
		</div>
	</div>
	<div class="mb-5 flex">
		<div>
			<Select.Root portal={null}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select Program" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Programs</Select.Label>
						{#each programs as prog}
							<Select.Item
								value={prog.value}
								label={prog.label}
								on:click={() => (program = prog.value)}
							>
								{prog.label}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="ml-5">
			<Select.Root portal={null} bind:value={advisor}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select Advisor" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Advisor</Select.Label>
						{#each advisors as adv}
							<Select.Item
								value={adv.value}
								label={adv.label}
								on:click={() => (advisor = adv.value)}
							>
								{adv.label}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="ml-5">
			<Select.Root portal={null}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Year Level" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as yr}
							<Select.Item value={yr} label={`Year ${yr}`} on:click={() => (year = yr)}>
								{yr}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
	</div>
</PrimCard>

<Button variant="secondary" on:click={handleSubmit}>Submit</Button>
