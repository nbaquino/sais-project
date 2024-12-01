<script>
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

<div class="container">
	<Card class="w-full max-w-md">
		<CardHeader class="space-y-6">
			<div class="logo-container">
				<img src="/assets/up_logo.png" alt="UP Logo" class="logo" />
			</div>
			<div class="text-center">
				<CardTitle class="text-[#7B1113] text-3xl mb-2">Welcome to SAIS</CardTitle>
				<CardDescription class="text-gray-600 text-lg">Please login to continue</CardDescription>
			</div>
		</CardHeader>

		<CardContent class="flex flex-col gap-4 px-6 pb-8">
			<form on:submit|preventDefault={handleSubmit} class="space-y-4">
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input
						type="email"
						id="email"
						bind:value={email}
						placeholder="Enter your email"
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						type="password"
						id="password"
						bind:value={password}
						placeholder="Enter your password"
						required
					/>
				</div>

				<Button
					type="submit"
					class="login-button w-full"
					disabled={loading}
				>
					{loading ? 'Logging in...' : 'Login'}
				</Button>
			</form>
		</CardContent>
	</Card>
</div>

<Toaster />

<style>
	.container {
		min-height: 100vh;
		display: grid;
		place-items: center;
		background-color: #F8F8F8;
		padding: 1rem;
	}

	.logo-container {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.logo {
		width: 100px;
		height: 100px;
		object-fit: contain;
	}

	:global(.login-button) {
		background-color: #7B1113 !important;
		color: white;
		font-weight: 500;
		height: 48px;
		padding: 0 20px !important;
		border-radius: 6px;
		font-size: 1rem;
		box-sizing: border-box;
	}

	:global(.login-button:hover) {
		background-color: #5d0c0e !important;
	}
</style>
