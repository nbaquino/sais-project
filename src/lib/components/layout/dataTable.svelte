<script>
	export let headers, width;
</script>

<!-- Headers -->
<div class="flex text-center" style="width: {width}em;">
	{#each Object.entries($$restProps) as [key, value]}
		<p class="opacity-60" style="width: calc(100% / {headers})">{value}</p>
	{/each}
</div>
<!-- rows -->
