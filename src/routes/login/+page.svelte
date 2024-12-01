<script>
	import { theme } from '$lib/config/theme';
	import '$lib/styles/components.css';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { addToast } from '$lib/stores/toastStore';
	import Toaster from '$lib/components/Toaster.svelte';

	let email = '';
	let password = '';
	let loading = false;
	let showPassword = false;

	async function handleSubmit() {
		try {
			loading = true;

			const { data, error } = await supabase
				.from('Student')
				.select('*')
				.eq('stud_email', email)
				.eq('login_pw', password)
				.single();

			if (error) throw error;

			if (data) {
				localStorage.setItem('student', JSON.stringify(data));
				addToast('Login successful!', 'success');
				setTimeout(() => goto('/studentHP'), 1000);
			} else {
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

<div class="min-h-screen w-full bg-white/90 backdrop-blur-sm flex items-center justify-center p-4 font-poppins">
    <div class="card-container border-black">
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
                    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
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

<Toaster />

<style>
    :global(body) {
        font-family: 'Poppins', sans-serif;
    }
</style>
