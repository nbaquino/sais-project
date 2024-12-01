<script lang="ts">
	import { getLocalTimeZone, today } from "@internationalized/date";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import Divider from './divider.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	export let page;
	let value = today(getLocalTimeZone());

	// Update user data state to match Student table
	let userData = {
		stud_Fname: '',
		stud_Lname: ''
	};

	// Update the fetch to get data from Student table using stored email
	onMount(async () => {
		const storedStudent = localStorage.getItem('student');
		if (storedStudent) {
			const studentData = JSON.parse(storedStudent);
			const { data, error } = await supabase
				.from('Student')
				.select('stud_Fname, stud_Lname')
				.eq('stud_email', studentData.stud_email)
				.single();

			if (data && !error) {
				userData = data;
			}
		}
	});
</script>

<div class="frame">
	<div class="user-info">
		<div class="profile-section">
			<div class="avatar-frame">
				<img
					src="https://api.dicebear.com/7.x/initials/svg?seed=JR"
					alt="User avatar"
				/>
			</div>
			<div class="user-details">
				<h3>{userData.stud_Fname} {userData.stud_Lname || 'Loading...'}</h3>
				<p>Student</p>
			</div>
		</div>
	</div>
	<Divider />

	{#if page === 'home' || page === 'courseSearch'}
		<div class="calendar-section">
			<div class="calendar-header">
				<h3>Academic Calendar</h3>
			</div>
			<Calendar bind:value class="rounded-md border" />
		</div>
	{/if}
</div>

<style>
	.frame {
		height: 100vh;
		width: 320px;
		background-color: white;
		position: fixed;
		top: 0;
		right: 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
		border-left: 1px solid #e9ecef;
		z-index: 1000;
		overflow-y: auto;
	}

	.user-info {
		padding: 16px 0;
		margin-bottom: 16px;
	}

	.profile-section {
		display: flex;
		align-items: center;
		position: relative;
		gap: 16px;
		padding: 12px 24px;
		margin: 0 8px;
		border-radius: 12px;
		cursor: pointer;
		transition: background-color 0.2s;
		max-width: 280px;
	}

	.profile-section:hover {
		background-color: #7B1113;
	}

	.profile-section:hover .user-details h3,
	.profile-section:hover .user-details p {
		color: white;
	}

	.avatar-frame {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: #f0f0f0;
		flex-shrink: 0;
		overflow: hidden;
	}

	.avatar-frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.user-details {
		flex: 1;
		min-width: 0;
		max-width: calc(100% - 64px);
	}

	.user-details h3 {
		color: #495057;
		margin: 0;
		font-size: 15px;
		font-weight: 500;
		line-height: 1.4;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user-details p {
		color: #6c757d;
		margin: 2px 0 0 0;
		font-size: 13px;
		line-height: 1.4;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.calendar-section {
		margin-top: 20px;
		padding: 0 8px;
	}

	.calendar-header {
		margin-bottom: 16px;
	}

	.calendar-header h3 {
		color: #6c757d;
		font-size: 12px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin: 0;
	}

	:global(.range-calendar) {
		width: 100%;
		background: white;
		border-radius: 8px;
		padding: 16px;
	}

	.calendar-button {
		display: none;
	}

	/* Responsive styles */
	@media (max-width: 1024px) {
		.frame {
			width: 280px;
			padding: 16px;
		}
	}

	@media (max-width: 768px) {
		.frame {
			width: 80px;
			padding: 12px 8px;
		}

		.profile-section {
			padding: 8px;
			margin: 0;
			justify-content: center;
		}

		.user-details {
			display: none;
		}

		.avatar-frame {
			width: 44px;
			height: 44px;
			margin: 0 auto;
		}

		.calendar-full {
			display: none;
		}

		.calendar-button {
			width: 44px;
			height: 44px;
			border-radius: 50%;
			background-color: #f0f0f0;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			cursor: pointer;
			border: none;
		}

		.calendar-button i {
			font-size: 20px;
			color: #495057;
		}
	}

	@media (max-width: 480px) {
		.frame {
			width: 64px;
			padding: 8px 4px;
		}

		.avatar-frame {
			width: 40px;
			height: 40px;
		}

		.calendar-button {
			width: 40px;
			height: 40px;
		}

		.calendar-button i {
			font-size: 18px;
		}
	}
</style>
