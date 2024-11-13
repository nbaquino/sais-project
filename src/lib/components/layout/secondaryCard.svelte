<script>
	export let title;
</script>

<div class="frame">
	<h2>{title}</h2>
	<!-- components from parent -->
	<div class="slot-content">
		<slot />
	</div>
</div>

<style>
	.frame {
		width: auto;
		height: fit-content;
		border-radius: 13px;
		overflow: hidden;
		background-color: white;
		padding-bottom: 30px;
	}
	h2 {
		color: white;
		background-color: #014421;
	}
	.frame * {
		padding: 5px 30px 5px 30px;
	}
</style>
