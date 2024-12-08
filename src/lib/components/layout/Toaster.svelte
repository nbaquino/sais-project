<script lang="ts">
    import { toasts } from '$lib/stores/toastStore';
    import { afterUpdate } from 'svelte';
    import * as Alert from "$lib/components/ui/alert";

    let toaster: HTMLDivElement;

    afterUpdate(() => {
        if (toaster) {
            toaster.scrollTop = toaster.scrollHeight;
        }
    });
</script>

<div
    bind:this={toaster}
    class="toaster fixed left-1/2 top-4 -translate-x-1/2 z-[9999] flex h-auto max-h-screen w-full flex-col gap-2 p-4 overflow-hidden sm:w-96"
>
    {#each $toasts as toast}
        <Alert.Root
            variant="default"
            class="toast flex w-full animate-[fadeIn_0.3s_ease-out] backdrop-blur-lg border-opacity-50 {
                toast.type === 'error'
                    ? 'bg-red-500/20 border-red-300 text-red-900'
                    : toast.type === 'success'
                    ? 'bg-green-500/20 border-green-300 text-green-900'
                    : 'bg-slate-950 bg-opacity-60 border-slate-50'
            }"
        >
            <div class="flex flex-col w-full">
                <Alert.Title class="font-semibold mb-1 {
                    toast.type === 'error'
                        ? 'text-red-700'
                        : toast.type === 'success'
                        ? 'text-green-700'
                        : 'text-slate-50'
                }">
                    {toast.type === 'error' ? 'Error' :
                     toast.type === 'success' ? 'Success' :
                     toast.type === 'warning' ? 'Warning' : 'Info'}
                </Alert.Title>
                <Alert.Description class="text-sm leading-relaxed {
                    toast.type === 'error'
                        ? 'text-red-600'
                        : toast.type === 'success'
                        ? 'text-green-600'
                        : 'text-slate-50'
                }">
                    {toast.message}
                </Alert.Description>
            </div>
        </Alert.Root>
    {/each}
</div>

<style>
    .toaster::-webkit-scrollbar {
        display: none;
    }

    .toaster {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    :global(.toast) {
        padding: 1rem !important;
        border-radius: 0.5rem !important;
        transition: all 0.2s ease-in-out;
    }

    @media (max-width: 640px) {
        .toaster {
            padding: 0.75rem;
        }

        :global(.toast) {
            padding: 0.75rem !important;
        }
    }
</style>
