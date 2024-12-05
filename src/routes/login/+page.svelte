<script>
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { addToast } from '$lib/stores/toastStore';
	import Toaster from '$lib/components/layout/Toaster.svelte';

	let email = '';
	let password = '';
	let loading = false;
	let showPassword = false;

	async function handleSubmit() {
		try {
			loading = true;
			console.log('Starting login process...');

			const { data, error } = await supabase
				.from('Student')
				.select('*')
				.eq('stud_email', email)
				.eq('login_pw', password)
				.single();

			if (error) throw error;

			if (data) {
				console.log('Login successful, preparing to redirect...');
				localStorage.setItem('student', JSON.stringify(data));
				addToast('Login successful!', 'success');
				setTimeout(() => {
					console.log('Redirecting to dashboard...');
					goto('/studentDashboard')
				}, 1000);
			} else {
				console.log('No matching user found');
				addToast('Invalid email or password', 'error');
			}
		} catch (error) {
			console.error('Error:', error);
			addToast('An error occurred during login', 'error');
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen w-full bg-mesh flex items-center justify-center p-4 font-poppins">
    <div class="login-wrapper">
        <div class="card-container">
            <!-- Left Panel -->
            <div class="panel-left">
                <Card class="w-full max-w-md mx-auto border-none shadow-none">
                    <CardHeader class="space-y-6">
                        <div class="flex justify-center">
                            <img src="/assets/up_logo.png" alt="UP Logo" class="h-28 w-auto object-contain" />
                        </div>
                        <div class="space-y-2">
                            <CardTitle class="text-3xl font-bold text-center">Login</CardTitle>
                            <CardDescription class="text-center">Enter your account details</CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                            <div class="space-y-2">
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    bind:value={email}
                                    required
                                    class="rounded-xl"
                                />
                            </div>

                            <div class="space-y-2">
                                <Label for="password">Password</Label>
                                <div class="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Enter your password"
                                        bind:value={password}
                                        required
                                        class="rounded-xl"
                                    />
                                    <button
                                        type="button"
                                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        on:click={() => showPassword = !showPassword}
                                    >
                                        {#if showPassword}
                                            👁️
                                        {:else}
                                            👁️‍🗨️
                                        {/if}
                                    </button>
                                </div>
                            </div>

                            <div class="text-right">
                                <Button variant="link" class="text-[#7B1113] p-0 h-auto">
                                    Forgot Password?
                                </Button>
                            </div>

                            <Button
                                type="submit"
                                class="w-full bg-[#7B1113] hover:bg-[#5d0c0e] text-white rounded-xl"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>

                            <div class="relative my-6">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-gray-300"></div>
                                </div>
                                <div class="relative flex justify-center text-sm">
                                    <span class="px-2 bg-white text-gray-500">or continue with</span>
                                </div>
                            </div>

                            <div class="flex justify-center">
                                <button
                                    type="button"
                                    class="w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
                                >
                                    <img src="/assets/gmail-icon.svg" alt="Gmail" class="w-6 h-6" />
                                </button>
                            </div>

                            <div class="text-center space-x-2">
                                <span class="text-muted-foreground">Don't have an account?</span>
                                <Button variant="link" class="text-[#7B1113] p-0 h-auto">
                                    Sign up
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <!-- Right Panel -->
            <div class="panel-right">
                <div class="max-w-lg text-center space-y-3">
                    <div class="space-y-0">
                        <h1 class="heading-primary">Welcome to</h1>
                        <h1 class="heading-secondary">Student Academic</h1>
                        <h1 class="heading-secondary">Information System</h1>
                    </div>
                    <div class="w-full h-0.5 bg-white/20"></div>
                    <p class="text-white/90 text-base text-justify max-w-sm mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div class="pt-6">
                        <Button variant="outline" class="btn-outline-white">
                            Know More
                        </Button>
                        <p class="text-white/70 text-xs mt-8">
                            © 2024 University of the Philippines. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<Toaster />

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.4)
        ),
        linear-gradient(
            45deg,
            #f0f2f5,
            #ffffff,
            #f5f7fa
        );
    }

    /* Card Styles */
    :global(.card-container) {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 72rem;
        overflow: hidden;
        border-radius: 2rem;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        border: none;
        box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.1),
            0 1px 8px rgba(0, 0, 0, 0.05),
            0 20px 40px rgba(31, 38, 135, 0.15);
    }

    :global(.panel-left) {
        @apply flex w-1/2 flex-col justify-center p-12;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
    }

    :global(.panel-right) {
        display: flex;
        width: 50%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        background-color: rgba(123, 17, 19, 0.95);  /* Slightly transparent maroon */
        backdrop-filter: blur(10px);
    }

    /* Typography */
    :global(.heading-primary) {
        @apply text-4xl font-bold text-white;
    }

    :global(.heading-secondary) {
        @apply text-3xl font-bold text-white;
    }

    /* Button Styles */
    :global(.btn-outline-white) {
        border-radius: 9999px;
        border: 1px solid white;
        background: transparent;
        color: white;
        transition: all 0.2s;
    }
    :global(.btn-outline-white:hover) {
        background: white;
        color: #7B1113;
    }

    .login-container {
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.1),
            0 1px 8px rgba(0, 0, 0, 0.05),
            0 20px 40px rgba(31, 38, 135, 0.15);
    }

    .login-wrapper {
        width: 100%;
        max-width: 72rem;
        padding: 1rem;
    }

    .card-container {
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(10px);
        border-radius: 2rem;
        overflow: hidden;
        box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.1),
            0 1px 8px rgba(0, 0, 0, 0.05),
            0 20px 40px rgba(31, 38, 135, 0.15);
        border: none;
    }
    .panel-left {
        width: 100%;
        padding: 2rem;
        background: white;
        order: 2;
    }

    .panel-right {
        width: 100%;
        padding: 2.5rem;
        background-color: #7B1113;
        order: 1;
    }

    /* Desktop layout */
    @media (min-width: 768px) {
        .card-container {
            flex-direction: row;
        }

        .panel-left,
        .panel-right {
            width: 50%;
            order: unset;
        }
    }
</style>
