<script>
	import '../app.css';
	import { page } from '$app/stores';

	$: console.log('Current route:', $page.url.pathname);
</script>

<slot />
