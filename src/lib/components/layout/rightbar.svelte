<script lang="ts">
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { Calendar } from "$lib/components/ui/calendar/index.js";
    import { supabase } from '$lib/supabaseClient';
    import { onMount, onDestroy } from 'svelte';
    import { createEventDispatcher } from "svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { cartStore, loadCartItems, removeFromCart } from '$lib/stores/cartStore';
    import { addToast } from '$lib/stores/toastStore';
    import * as Alert from "$lib/components/ui/alert";
    import { proceedToEnrollment } from '$lib/stores/cartStore';

    let value = today(getLocalTimeZone());
    let isSidebarOpen = true;
    const dispatch = createEventDispatcher();
    let proceedBool = false;
    let parsedSectDays1 = null;
    let parsedSectDays2 = null;

    let userData = {
        stud_Fname: '',
        stud_Lname: ''
    };

    $: cartItems = $cartStore.items;

    let subscription: any;

    let semesters = [];
    let selectedSemesterId: number | null = null;

    async function setupRealtimeSubscription() {
        const storedStudent = localStorage.getItem('student');
        if (!storedStudent) return;

        const studentData = JSON.parse(storedStudent);

        subscription = supabase
            .channel('cart-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Shopping Cart',
                    filter: `stud_id=eq.${studentData.stud_id}`
                },
                async (payload) => {
                    console.log('Cart change detected:', payload);
                    await loadCartItems();
                }
            )
            .subscribe();
    }

    onMount(async () => {
        const storedStudent = localStorage.getItem('student');
        if (storedStudent) {
            const studentData = JSON.parse(storedStudent);
            userData = {
                stud_Fname: studentData.stud_Fname,
                stud_Lname: studentData.stud_Lname
            };
        }

        // Initial load of cart items
        await loadCartItems();

        // Setup real-time subscription after loading initial items
        await setupRealtimeSubscription();

        const { data, error } = await supabase
            .from('Semester')
            .select('sem_id, sem_name, sem_start, sem_end')
            .order('sem_start', { ascending: false });

        if (data) {
            semesters = data;
            // Optionally set the most recent semester as default
            if (data.length > 0) {
                selectedSemesterId = data[0].sem_id;
            }
        }
    });

    onDestroy(() => {
        if (subscription) {
            subscription.unsubscribe();
        }
    });

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
        dispatch('toggleSidebar', isSidebarOpen);
    }


    async function handleRemoveFromCart(cartId: number) {
        try {
            const success = await removeFromCart(cartId);
            if (success) {
                addToast('Item removed from cart', 'success');
            } else {
                addToast('Failed to remove item from cart', 'error');
            }
        } catch (error) {
            console.error('Error removing item:', error);
            addToast('Failed to remove item from cart', 'error');
        }
    }

    //Handle Proceed to Enrollment
    async function handleEnrollClick() {
        if (!selectedSemesterId) {
            addToast('Please select a semester first', 'error');
            return;
        }

        const result = await proceedToEnrollment(selectedSemesterId);
        if (result.success) {
            addToast('Successfully enrolled in courses!', 'success');
            cancel();
            cartStore.update(state => ({ ...state, items: [] }));
        } else {
            addToast(result.message || 'Failed to enroll in courses', 'error');
        }
    }


    // Handle Cancel
    function proceed() {
        proceedBool = true;
    }

    function cancel() {
        proceedBool = false;
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

    <div class="divider"></div>

    <!-- Shopping Cart -->
    <div class="shopping-cart-section">
        <span class="section-title">SHOPPING CART</span>
        {#if cartItems.length === 0}
            <p class="text-sm text-gray-500 text-center py-4">Your cart is empty</p>
        {:else}
            <div class="cart-items">
                {#each cartItems as course}
                    <div class="cart-item">
                        <div class="cart-item-details">
                            <span class="cart-item-code">
                                {course.course_id} ({course.sect_ID})
                            </span>
                            <span class="cart-item-name">{course.sect_name}</span>
                            <span class="cart-item-schedule">
                                {course.sect_days} {course.sect_start_time} - {course.sect_end_time}
                            </span>
                        </div>
                        <button
                            class="remove-btn"
                            on:click={() => handleRemoveFromCart(course.cart_id)}
                        >
                            ×
                        </button>
                    </div>
                {/each}
            </div>
            <div class="cart-actions">
                <Button variant="default" class="w-full" on:click={() => proceed()}>Proceed to Enrollment</Button>
            </div>
        {/if}
    </div>
</div>


<!-- Popup for Proceed to Enrollment -->
{#if proceedBool}
    <div class="overlay">
        <div class="popup">
            <Alert.Root>
                <Alert.Title>Heads up!</Alert.Title>

                <Alert.Description>
                    You are now enrolling to these subjects. Please select a semester and confirm.
                </Alert.Description>

                <!-- Add semester selection -->
                <div class="semester-selection mb-4">
                    <label for="semester" class="block text-sm font-medium text-gray-700 mb-2">
                        Select Semester
                    </label>
                    <select
                        id="semester"
                        class="w-full p-2 border rounded-md"
                        bind:value={selectedSemesterId}
                    >
                        <option value={null}>Select a semester...</option>
                        {#each semesters as semester}
                            <option value={semester.sem_id}>
                                {semester.sem_name} ({new Date(semester.sem_start).toLocaleDateString()} -
                                {new Date(semester.sem_end).toLocaleDateString()})
                            </option>
                        {/each}
                    </select>
                </div>

                <div class="cart-items">
                    {#each cartItems as course}
                        <div class="cart-item">
                            <div class="cart-item-details">
                                <span class="cart-item-code">
                                    {course.course_id} ({course.sect_ID})
                                </span>
                                <span class="cart-item-name">{course.sect_name}</span>
                                <span class="cart-item-schedule">
                                    {course.sect_days} {course.sect_start_time} - {course.sect_end_time}
                                </span>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="flex justify-end gap-2 mt-4">
                    <Button variant="outline" on:click={() => cancel()}>Cancel</Button>
                    <Button
                        variant="default"
                        on:click={handleEnrollClick}
                        disabled={!selectedSemesterId}
                    >
                        Confirm
                    </Button>
                </div>
            </Alert.Root>
        </div>
    </div>
{/if}

<!-- Toggle Button -->
<button class="toggle-btn" on:click={toggleSidebar}>
    {isSidebarOpen ? '→' : '←'}
</button>

<style>
    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px); /* Apply blur effect to the background */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }

    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px); /* Apply blur effect to the background */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }

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
        z-index: 998;
        z-index: 998;
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
        z-index: 998;
        z-index: 998;
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

    .shopping-cart-section {
        margin-top: 1.5rem;
    }

    .cart-items {
        max-height: 300px;
        overflow-y: auto;
        margin: 0.5rem 0;
    }

    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: start;
        padding: 0.75rem;
        border-bottom: 1px solid #e5e7eb;
        gap: 0.5rem;
    }

    .cart-item-details {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;
    }

    .cart-item-code {
        font-weight: 500;
        font-size: 0.875rem;
        color: #1f2937;
    }

    .cart-item-name {
        font-size: 0.75rem;
        color: #6b7280;
    }

    .cart-item-section {
        font-size: 0.75rem;
        color: #6b7280;
    }

    .cart-item-schedule {
        font-size: 0.75rem;
        color: #6b7280;
    }

    .remove-btn {
        color: #ef4444;
        font-size: 1.25rem;
        padding: 0 0.25rem;
        line-height: 1;
        border-radius: 0.25rem;
    }

    .remove-btn:hover {
        background-color: #fee2e2;
    }

    .cart-actions {
        padding: 1rem 0 0;
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
            width: 100%;
            padding: 16px;
        }

        .user-details,
        .calendar-section,
        .shopping-cart-section {
            display: none;
        }

        .rightbar.closed {
            transform: translateX(100%);
        }

        .toggle-btn {
            right: 0.5rem;
            top: 0.5rem;
            padding: 0.25rem 0.5rem;
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

    .semester-selection {
        background: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }

    select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.375rem;
        background-color: white;
    }
</style>
