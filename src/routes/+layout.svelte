<script>
	import '../app.css';
	import { page } from '$app/stores';
	import Toaster from "$lib/components/layout/Toaster.svelte";

	$: console.log('Current route:', $page.url.pathname);
</script>

<Toaster />
<slot />
