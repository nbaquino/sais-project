<script>
	import Divider from './divider.svelte';
	// rightbar also needs the name of the page for conditional rendering
	export let page;
</script>

<div class="frame">
	<div class="user-info">
		<!--info in here will be dynamic, inherited from the student record that was authenticated-->
		<div class="avatar-frame"></div>
		<h3>Jose Rizal</h3>
		<p>BS Computer Science</p>
	</div>
	<Divider />
	{#if page === 'home' || page === 'courseSearch'}
		<h3>Student Homepage</h3>
		<!-- insert yung calendar -->
	{:else}
		<h3>Other Page</h3>
	{/if}
</div>

<style>
	.frame {
		background-color: white;
		height: 80%;
		width: 20vw;
		position: fixed;
		top: 100px;
		right: 30px;
		border-radius: 13px;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}
	.user-info {
		text-align: right;
		margin-bottom: 45px;
	}
	.avatar-frame {
		width: 80px;
		height: 80px;
		border-radius: 100%;
		background-color: gray; /*change into image of the user*/
		position: absolute;
	}
	h3 {
		color: #7b1113;
	}
</style>
