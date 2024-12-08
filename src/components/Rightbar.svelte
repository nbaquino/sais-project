<script lang="ts">
    import { proceedToEnrollment } from '$lib/stores/cartStore';
    import { toastStore } from '$lib/stores/toastStore';
    import { get } from 'svelte/store';
    import { cartStore } from '$lib/stores/cartStore';
    import Alert from '$lib/components/ui/alert';
    import Button from '$lib/components/ui/button';

    let proceedBool = false;
    let cartItems = get(cartStore).items;

    function cancel() {
        proceedBool = false;
    }

    async function handleEnrollClick() {
        // Check if cart is empty
        if (cartItems.length === 0) {
            toastStore.error('Cart is empty');
            return;
        }

        const result = await proceedToEnrollment();
        if (result.success) {
            toastStore.success(result.message);
            proceedBool = false; // Close the confirmation dialog
        } else {
            toastStore.error(result.message);
        }
    }
</script>

{#if proceedBool}
    <div class="overlay">
        <div class="popup">
            <Alert.Root>
                <Alert.Title>Heads up!</Alert.Title>

                <Alert.Description>
                    You are now enrolling to these subjects. Are you sure you want to proceed?
                </Alert.Description>

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

                <Button variant="default" on:click={() => cancel()}>Cancel</Button>
                <Button variant="default" on:click={handleEnrollClick}>Confirm</Button>
            </Alert.Root>
        </div>
    </div>
{/if}
