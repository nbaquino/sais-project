<script>
	const menuItems = [
		{ iconClass: 'ri-home-4-line', label: 'Home', id: 1 }, //need to include link from routes
		{ iconClass: 'ri-inbox-2-line', label: 'Inbox', id: 2 },
		{ iconClass: 'ri-user-line', label: 'Account', id: 3 },
		{ iconClass: 'ri-time-line', label: 'Recents', id: 4 }
	];
</script>

<div class="frame">
	<div class="top">
		<img src="/assets/up_logo.png" alt="UP Logo" class="logo" />
		<h3>University of the Philippines</h3>
	</div>
	<div class="menu-frame">
		{#each menuItems as item (item.id)}
			<div class="menu" id={`menu-${item.id}`}>
				<i class={item.iconClass}></i>
				<a href="http://" class="link">{item.label}</a>
			</div>
		{/each}
	</div>
	<div class="bottom">
		<i class="ri-tools-line"></i>
		<a href="http://" class="link"> Support</a>
	</div>
</div>

<style>
	.frame {
		height: 100%;
		width: 250px;
		background-color: white;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
	}

	.top {
		height: 100px;
		width: 100%;
		background-color: #7b1113;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		padding: 0 20px;
		gap: 15px;
	}

	.logo {
		width: 80px;
		height: 80px;
		object-fit: contain;
	}

	h3 {
		font-size: 18px;
		font-weight: normal;
		margin: 0;
		text-align: center;
		display: flex;
		align-items: center;
		line-height: 1.2;
	}

	@media (max-width: 768px) {
		h3 {
			font-size: 1.4rem;
		}
		.logo {
			width: 60px;
			height: 60px;
		}
		.top {
			padding: 0 1rem;
		}
	}

	.menu-frame {
		margin: 50px auto auto auto;
	}

	.menu {
		display: flex;
		align-items: center;
		padding-bottom: 30px;
	}

	i {
		font-size: 24px;
	}

	a {
		margin-left: 20px;
	}

	.bottom {
		height: 50px;
		width: 100%;
		background-color: #7b1113;
		margin-top: auto;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
