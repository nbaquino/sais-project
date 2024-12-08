<script lang="ts">
	import { getLocalTimeZone, today } from "@internationalized/date";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import Divider from './divider.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from "svelte";
	import { cartStore } from "$lib/stores/cartStores";
  
	let value = today(getLocalTimeZone());
  
	// State to control the visibility of the sidebar
	let isSidebarOpen = true;
	const dispatch = createEventDispatcher(); // Event dispatcher
  
	// Define the types
	interface User {
	  id: string;
	  stud_Fname: string;
	  stud_Lname: string;
	}
  
	interface CartItem {
	  id: string;
	  studentId: string;
	  productName: string;
	  quantity: number;
	  // Add other fields as needed
	}
  
	// User data from Student table
	let userData: User = {
	  id: '',
	  stud_Fname: '',
	  stud_Lname: ''
	};
	let items: CartItem[] = [];
  
	// Fetch user data and cart items
	onMount(async () => {
	  const storedStudent = localStorage.getItem('student');
	  if (storedStudent) {
		const studentData = JSON.parse(storedStudent);
		const { data, error } = await supabase
		  .from('Student')
		  .select('id, stud_Fname, stud_Lname')
		  .eq('stud_email', studentData.stud_email)
		  .single();
  
		if (data && !error) {
		  userData = data;
		  await fetchCartItems();
		  subscribeToCartChanges();
		}
	  }
	});
  
	// Function to fetch cart items
	async function fetchCartItems() {
	  const { data, error } = await supabase
		.from('Shopping Cart')
		.select("*")
		.eq('studentId', userData.id);
  
	  if (data && !error) {
		items = data as CartItem[];
	  }
	}
	$: console.log(items);
  
	// Function to set up a real-time subscription
	function subscribeToCartChanges() {
	  const subscription = supabase
		.channel('public:Shopping Cart')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Shopping Cart' }, payload => {
		  if (payload.new.studentId === userData.id) {
			items = [...items, payload.new];
		  }
		})
		.subscribe();
  
	  // Clean up subscription on component destroy
	  return () => {
		supabase.removeChannel(subscription);
	  };
	}
  
	// Toggle sidebar visibility and dispatch event to parent
	function toggleSidebar() {
	  isSidebarOpen = !isSidebarOpen;
	  dispatch('toggleSidebar', isSidebarOpen); // Emit event to parent
	}
  </script>

<!-- Sidebar -->
<div class="rightbar {isSidebarOpen ? '' : 'closed'}">
    <a href="#" class="user-info" role="button">
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

<!-- Toggle Button -->
<button class="toggle-btn" on:click={toggleSidebar}>
    {isSidebarOpen ? '→' : '←'}
</button>

<style>
    .rightbar {
        width: 320px;
        height: 100vh;
        position: fixed;
        right: 0;
        top: 0;
        background: white;
        padding: 16px;
        border-left: 1px solid #e5e7eb;
        transition: transform 0.3s ease;
        transform: translateX(0);
        z-index: 1000;
    }

    .rightbar.closed {
        transform: translateX(100%);
    }

    .toggle-btn {
        position: fixed;
        right: 1rem;
        top: 1rem;
        background-color: #8B0000;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        z-index: 1100;
    }

    .toggle-btn:hover {
        background-color: #a90000;
    }

	/* Original styles preserved */
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

	.divider {
		height: 1px;
		background: #e5e7eb;
		margin: 0.5rem -1rem;
		margin-top: 0.75rem;
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
			padding: 12px 8px;
		}
	}

	@media (max-width: 480px) {
		.rightbar {
			width: 64px;
			padding: 8px 4px;
		}
	}

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
</style>
