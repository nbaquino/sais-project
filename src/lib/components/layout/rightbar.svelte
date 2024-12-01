<script lang="ts">
	import { getLocalTimeZone, today } from "@internationalized/date";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import Divider from './divider.svelte';

	export let page;
	let value = today(getLocalTimeZone());
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
				<h3>Jose Rizal</h3>
				<p>BS Computer Science</p>
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
		background-color: white;
		height: 100vh;
		width: 320px;
		position: fixed;
		top: 0;
		right: 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
		border-left: 1px solid #e9ecef;
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

	/* Responsive styles */
	@media (max-width: 768px) {
		.profile-section {
			padding: 10px 16px;
			gap: 12px;
			max-width: 240px;
		}

		.avatar-frame {
			width: 44px;
			height: 44px;
		}

		.user-details {
			max-width: calc(100% - 56px);
		}

		.user-details h3 {
			font-size: 14px;
		}

		.user-details p {
			font-size: 12px;
		}
	}

	@media (max-width: 480px) {
		.profile-section {
			padding: 8px 12px;
			gap: 10px;
			max-width: 200px;
		}

		.avatar-frame {
			width: 40px;
			height: 40px;
		}

		.user-details {
			max-width: calc(100% - 50px);
		}
	}
</style>
