<script>
	import { Navbar, Rightbar } from '$lib/components/layout/index';
</script>

<div class="body">
	<slot />
</div>

<Navbar />
<Rightbar page="home" />

<style>
	.body {
		width: 100%;
		height: 100%;
		padding-left: 20vw;
		padding-right: 25vw;
		padding-top: 100px;
	}
</style>
