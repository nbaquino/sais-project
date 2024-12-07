<script>
	import * as Card from "$lib/components/ui/card";
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

<div class="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-5xl">
        <div class="flex flex-row bg-white rounded-3xl overflow-hidden shadow-xl h-full">
            <!-- Left Panel (Login) -->
            <div class="w-full md:w-1/2 p-8">
                <Card.Root class="border-none shadow-none">
                    <Card.Header class="space-y-4">
                        <div class="flex justify-center">
                            <img src="/assets/up_logo.png" alt="UP Logo" class="h-20 w-auto object-contain" />
                        </div>
                        <div class="space-y-2 text-center">
                            <Card.Title class="text-2xl font-bold">Login</Card.Title>
                            <Card.Description>Enter your account details</Card.Description>
                        </div>
                    </Card.Header>

                    <Card.Content>
                        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                            <div class="space-y-2">
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    bind:value={email}
                                    required
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
                                    />
                                    <button
                                        type="button"
                                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        on:click={() => showPassword = !showPassword}
                                    >
                                        {#if showPassword}👁️{:else}👁️‍🗨️{/if}
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
                                class="w-full bg-[#7B1113] hover:bg-[#5d0c0e]"
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
                    </Card.Content>
                </Card.Root>
            </div>

            <!-- Right Panel (Welcome) -->
            <div class="hidden md:block md:w-1/2 bg-[#7B1113] p-12 text-white rounded-r-3xl">
                <div class="flex flex-col h-full">
                    <div class="text-center mb-8">
                        <h1 class="text-4xl font-bold text-white leading-tight">Welcome to</h1>
                        <h1 class="text-4xl font-bold text-white leading-tight">Student Academic</h1>
                        <h1 class="text-4xl font-bold text-white leading-tight">Information System</h1>
                    </div>

                    <div class="w-full h-px bg-white/20 mb-8"></div>

                    <p class="text-white/90 text-base leading-relaxed text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                    </p>

                    <p class="text-white/70 text-sm text-center mt-auto pt-8">
                        © 2024 University of the Philippines. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<Toaster />
