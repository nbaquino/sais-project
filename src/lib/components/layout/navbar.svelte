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
		<img src="/sais-project/assets/up_logo.png" alt="" />
		<!--fucken ayaw magpakita ng logo-->
		<h3>University of the Philippines</h3>
	</div>
	<div class="menu-frame">
		{#each menuItems as item (item.id)}
			<div class="menu" id={item.id}>
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
		width: 15vw;
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
		justify-content: center;
		align-items: center;
		color: white;
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
