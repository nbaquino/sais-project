<script>
	export let color;

	// Define color based on the `color` prop value
	let backgroundColor = color === 'maroon' ? '#7B1113' : color === 'black' ? '#333333' : '#000000';
</script>

<button style="background-color: {backgroundColor};">Button</button>

<style>
	button {
		color: white;
		font-size: 16px;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
