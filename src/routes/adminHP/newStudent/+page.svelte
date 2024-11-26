<script>
	import { PrimCard } from '$lib/components/layout/index';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { onMount } from 'svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import * as Alert from '$lib/components/ui/alert';

	let programs = []; // Initialize the outer array to hold the programs
	let advisors = [];

	onMount(async () => {
		try {
			// Fetch data from the API
			const programRes = await fetch('https://one27-advising.onrender.com/APIs/getAllPrograms');
			const programJson = await programRes.text(); // Get raw JSON string
			const advisorRes = await fetch('https://one27-advising.onrender.com/APIs/getAllAdvisers');
			const advisorJson = await advisorRes.text();
			// console.log('Received JSON String:', advisorJson);

			// Parse JSON string into objects
			const parsedPrograms = JSON.parse(programJson);
			const parsedAdvisers = JSON.parse(advisorJson);

			// Validate the parsed data is an array
			if (Array.isArray(parsedPrograms)) {
				// Map the programs into the desired structure
				programs = parsedPrograms.map((program) => ({
					value: program.program_id,
					label: program.program_name
				}));
				// console.log('Mapped Programs:', programs);
			} else {
				console.error('Unexpected data structure:', parsedPrograms);
			}
			if (Array.isArray(parsedAdvisers)) {
				advisors = parsedAdvisers.map((adviser) => ({
					value: adviser.adviser_id,
					label: `${adviser.first_name} ${adviser.middle_name} ${adviser.last_name}`
				}));
				// console.log('Mapped Advisors:', advisors);
			} else {
				console.error('Unexpected data structure:', parsedAdvisers);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});

	const addresses = [
		'Trancoville',
		'Aurora Hill',
		'Quezon Hill',
		'Phil-Am Village',
		'Teachers Camp',
		'Camp John Hay',
		'Bakakeng',
		'La Trinidad',
		'La Union'
	];

	let stud_Fname = '';
	let stud_Mname = '';
	let stud_Lname = '';
	let id = '';
	let login_pw = '';
	let stud_email = '';
	let program = '';
	let advisor = '';
	let stud_yr = 0;
	let address = '';
	let contact_num = '';

	$: id = `${new Date().getFullYear()}${Math.floor(Math.random() * 900) + 100}${new Date().toISOString().slice(5, 10).replace(/-/g, '')}`;
	$: login_pw = id;
	$: stud_email = `${stud_Fname.charAt(0).toLowerCase()}${stud_Mname.charAt(0).toLowerCase()}${stud_Lname.toLowerCase()}@email.com`;
	$: address = addresses[Math.floor(Math.random() * addresses.length)];
	$: contact_num = `639${Math.floor(100000000 + Math.random() * 900000000)}`;

	let showAlert = false;

	const showTemporaryAlert = () => {
		showAlert = true;
		setTimeout(() => {
			showAlert = false;
		}, 500); // Hide after 0.5 seconds
	};

	const handleSubmit = async () => {
		const student = {
			id,
			login_pw,
			stud_Fname,
			stud_Mname,
			stud_Lname,
			stud_yr,
			stud_email,
			program,
			advisor,
			status: 'Active',
			address,
			contact_num
		};
		// console.log('New Student:', student);

		const hasEmptyFields = Object.values(student).some(
			(value) => value === null || value === '' || value === undefined
		);

		if (!hasEmptyFields) {
			const response = await fetch('../../api/student/newStudent', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(student)
			});

			const report = await response.json();
			if (report.success) {
				showTemporaryAlert();
			}

			//resetting values
			stud_Fname = '';
			stud_Mname = '';
			stud_Lname = '';
			stud_email = `${stud_Fname.charAt(0).toLowerCase()}${stud_Mname.charAt(0).toLowerCase()}${stud_Lname.toLowerCase()}@email.com`;
			stud_yr = 0;
			id = `${new Date().getFullYear()}${Math.floor(Math.random() * 900) + 100}${new Date().toISOString().slice(5, 10).replace(/-/g, '')}`;
		}
	};
</script>

{#if showAlert}
	<div class="showAlert absolute top-1">
		<Alert.Root>
			<Alert.Title>Success!</Alert.Title>
			<Alert.Description>New student successfully added!</Alert.Description>
		</Alert.Root>
	</div>
{/if}

<PrimCard title="Add New Students">
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
	<div class="mb-5 flex">
		<div class="w-1/3">
			<Label for="id">Student Id</Label>
			<p id="id">{id}</p>
		</div>
		<div class="w-1/3">
			<Label for="stud_email">Email</Label>
			<p id="stud_email">{stud_email}</p>
		</div>
		<div class="w-1/3">
			<Label for="login_pw">Password</Label>
			<p id="login_pw">{login_pw}</p>
		</div>
	</div>
	<div class="mb-5 flex">
		<div class="w-1/3">
			<Select.Root>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Program" />
				</Select.Trigger>
				<Select.Content>
					<ScrollArea class="h-[200px] overflow-y-auto">
						{#each programs as prog}
							<Select.Item
								value={prog.value}
								label={prog.label}
								on:click={() => (program = prog.value)}
							>
								{prog.label}
							</Select.Item>
						{/each}
					</ScrollArea>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="w-1/3">
			<Select.Root>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Advisor" />
				</Select.Trigger>
				<Select.Content>
					<ScrollArea class="h-[200px] overflow-y-auto">
						{#each advisors as advisorOption}
							<Select.Item
								value={advisorOption.value}
								label={advisorOption.label}
								on:click={() => {
									advisor = advisorOption.value;
								}}
							>
								{advisorOption.label}
							</Select.Item>
						{/each}
					</ScrollArea>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="w-1/3">
			<Select.Root>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Year Level" />
				</Select.Trigger>
				<Select.Content>
					<ScrollArea class="h-[200px] overflow-y-auto">
						{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as yr}
							<Select.Item value={yr} label={`Year ${yr}`} on:click={() => (stud_yr = yr)}>
								{`Year ${yr}`}
							</Select.Item>
						{/each}
					</ScrollArea>
				</Select.Content>
			</Select.Root>
		</div>
	</div>
</PrimCard>

<Button variant="secondary" on:click={handleSubmit}>Submit</Button>
