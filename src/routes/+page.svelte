<!-- Login -->
<!-- for now just leave this until everything is set inside the system -->
<script>
	import { Navbar, Rightbar } from '$lib/components/layout/index';
	import { Button } from '$lib/components/ui/button';
	console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL); // For frontend
	console.log('SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY); // For frontend
</script>

<h1><a href="/studentHP">WELCOME!</a></h1>
<Button variant="secondary" href="/studentHP">Student Homepage</Button>
<Button variant="secondary" href="/adminHP">Admin Homepage</Button>

<style>
</style>
