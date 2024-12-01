<script>
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
	console.log('SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
</script>

<div class="container">
	<Card class="w-full max-w-md">
		<CardHeader class="space-y-6">
			<div class="logo-container">
				<img src="/assets/up_logo.png" alt="UP Logo" class="logo" />
			</div>
			<div class="text-center">
				<CardTitle class="text-[#7B1113] text-3xl mb-2">Welcome to SAIS</CardTitle>
				<CardDescription class="text-gray-600 text-lg">Please select your login type</CardDescription>
			</div>
		</CardHeader>

		<CardContent class="flex flex-col gap-3 px-6 pb-8">
			<Button
				variant="default"
				href="/studentHP"
				class="login-button">
				Student Login
			</Button>
			<Button
				variant="default"
				href="/adminHP"
				class="login-button">
				Admin Login
			</Button>
		</CardContent>
	</Card>
</div>

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
		width: 100%;
		background-color: #7B1113 !important;
		color: white;
		font-weight: 500;
		height: 48px;
		padding: 0 20px !important;
		border-radius: 6px;
		font-size: 1rem;
		max-width: 100%;
		box-sizing: border-box;
	}

	:global(.login-button:hover) {
		background-color: #5d0c0e !important;
	}
</style>
