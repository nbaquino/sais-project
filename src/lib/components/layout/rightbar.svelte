<script lang="ts">
	import { getLocalTimeZone, today } from "@internationalized/date";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import Divider from './divider.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte/internal';

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

	// Add keyboard handler for accessibility
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			// Add your click handler logic here
			event.preventDefault();
		}
	}

	export let page: 'home' | 'dashboard';
</script>

<div class="rightbar">
	<a
		href="#"
		class="user-info"
		role="button"
		on:keydown={handleKeyDown}
	>
		<div class="avatar">
			<span>{userData.stud_Fname?.[0]}{userData.stud_Lname?.[0] || 'JR'}</span>
		</div>
		<div class="user-details">
			<span class="name">{userData.stud_Fname} {userData.stud_Lname || 'Loading...'}</span>
			<span class="role">Student</span>
		</div>
	</a>

	<div class="divider"></div>

	<div class="calendar-section">
		<span class="section-title">ACADEMIC CALENDAR</span>
		<Calendar bind:value class="rounded-md border" />
	</div>
</div>

<style>
	.rightbar {
		padding: 1rem;
		width: 320px;
		height: 100vh;
		position: fixed;
		right: 0;
		top: 0;
		background: white;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem;
		margin: -0.75rem;
		margin-bottom: -0.5rem;
		cursor: pointer;
		border-radius: 8px;
		transition: all 0.2s ease;
		text-decoration: none;
		width: calc(100% + 1.5rem);
	}

	.user-info:hover {
		background-color: #f3f4f6;
	}

	.avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: #8B0000;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: all 0.2s ease;
	}

	.avatar span {
		color: white;
		font-weight: 500;
		font-size: 16px;
		pointer-events: none;
	}

	.user-info:hover .avatar {
		background-color: #8B0000;
	}

	.user-info:hover .avatar span {
		color: white;
	}

	.user-details {
		display: flex;
		flex-direction: column;
		pointer-events: none;
	}

	.name {
		color: #495057;
		font-size: 15px;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.role {
		color: #6c757d;
		font-size: 13px;
		transition: color 0.2s ease;
		pointer-events: none;
	}

	/* Hover styles for the entire button */
	.user-info:hover {
		background-color: #f3f4f6;
	}

	.user-info:hover .avatar {
		background-color: #8B0000;
	}

	.user-info:hover .avatar span {
		color: white;
	}

	.user-info:hover .name {
		color: #8B0000;
	}

	.user-info:hover .role {
		color: #495057;
	}

	.divider {
		height: 1px;
		background: #e5e7eb;
		margin: 0.5rem -1rem;
		margin-top: 0.75rem;
	}

	/* Responsive styles */
	@media (max-width: 1024px) {
		.rightbar {
			width: 280px;
			padding: 16px;
		}
	}

	@media (max-width: 768px) {
		.rightbar {
			width: 80px;
			height: auto;
			padding: 12px 8px;
			top: 0;
			right: 0;
			position: fixed;
			background: white;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			border-bottom-left-radius: 8px;
		}

		.user-info {
			padding: 8px;
			margin: 0;
			justify-content: center;
		}

		.user-details {
			display: none;
		}

		.avatar {
			width: 44px;
			height: 44px;
			margin: 0 auto;
		}

		.calendar-section, .divider {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.rightbar {
			width: 64px;
			padding: 8px 4px;
		}

		.avatar {
			width: 40px;
			height: 40px;
		}

		.user-info {
			padding: 4px;
		}
	}

	/* For very small screens */
	@media (max-width: 360px) {
		.rightbar {
			width: 56px;
			padding: 6px 3px;
		}

		.avatar {
			width: 36px;
			height: 36px;
		}

		.avatar span {
			font-size: 14px;
		}
	}

	.calendar-section {
		margin-top: 1.5rem;
	}

	.section-title {
		display: block;
		font-size: 12px;
		font-weight: 500;
		color: #6c757d;
		margin-bottom: 1rem;
		letter-spacing: 0.05em;
	}
</style>
