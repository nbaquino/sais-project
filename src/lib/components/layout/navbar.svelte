<script>
	const menuItems = [
		{ iconClass: 'ri-home-4-line', label: 'Home', id: 1 },
		{ iconClass: 'ri-inbox-2-line', label: 'Inbox', id: 2 },
		{ iconClass: 'ri-user-line', label: 'Account', id: 3 },
		{ iconClass: 'ri-time-line', label: 'Recents', id: 4 }
	];

	const supportItems = [
		{ iconClass: 'ri-settings-3-line', label: 'Settings', id: 1 },
		{ iconClass: 'ri-question-line', label: 'Help Center', id: 2 }
	];

	function handleLogout() {
		// Add any cleanup operations here
		window.location.href = '/';
	}
</script>

<div class="frame">
	<div class="top">
		<div class="logo-container">
			<img src="/assets/up_logo.png" alt="UP Logo" class="logo" />
			<h3>UPB SAIS</h3>
		</div>
	</div>
	<div class="menu-frame">
		<div class="category-label">General</div>
		{#each menuItems as item (item.id)}
			<div class="menu-item">
				<i class={item.iconClass}></i>
				<span class="menu-label">{item.label}</span>
			</div>
		{/each}

		<div class="category-label" style="margin-top: 16px;">Support</div>
		{#each supportItems as item (item.id)}
			<div class="menu-item">
				<i class={item.iconClass}></i>
				<span class="menu-label">{item.label}</span>
			</div>
		{/each}
	</div>
	<div class="bottom">
		<div class="menu-item">
			<i class="ri-logout-box-line"></i>
			<a href="/" class="menu-label" on:click|preventDefault={handleLogout}>Logout</a>
		</div>
	</div>
</div>

<style>
	.frame {
		height: 100vh;
		width: 220px;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		border-right: 1px solid #e9ecef;
		z-index: 1000;
		overflow-y: auto;
	}

	.top {
		height: 80px;
		padding: 0 16px;
		background-color: #ffffff;
		border-bottom: 1px solid #e9ecef;
		display: flex;
		align-items: center;
	}

	.logo-container {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo {
		width: 50px;
		height: 50px;
		object-fit: contain;
	}

	h3 {
		font-size: 18px;
		font-weight: normal;
		margin: 0;
		line-height: 1.2;
        color: #7B1113;
	}

	@media (max-width: 1024px) {
		.frame {
			width: 200px;
		}

		.logo {
			width: 40px;
			height: 40px;
		}

		h3 {
			font-size: 16px;
		}
	}

	@media (max-width: 768px) {
		.frame {
			width: 180px;
		}

		.logo {
			width: 32px;
			height: 32px;
		}

		h3 {
			font-size: 14px;
		}

		.menu-item {
			padding: 6px 20px;
		}

		.menu-label {
			font-size: 13px;
		}

		i {
			font-size: 18px;
		}

		.category-label {
			font-size: 11px;
			padding: 6px 20px;
		}
	}

	@media (max-width: 480px) {
		.frame {
			width: 64px;
		}

		.logo-container h3 {
			display: none;
		}

		.menu-label {
			display: none;
		}

		.category-label {
			display: none;
		}

		.menu-item {
			padding: 12px;
			justify-content: center;
		}

		i {
			font-size: 20px;
		}

		.logo {
			width: 32px;
			height: 32px;
			margin: 0 auto;
		}

		.logo-container {
			justify-content: center;
		}
	}

	.menu-frame {
		padding: 8px 0;
		display: flex;
		flex-direction: column;
	}

	.menu-item {
		display: flex;
		align-items: center;
		padding: 8px 24px;
		color: #495057;
		cursor: pointer;
		transition: background-color 0.2s;
		background-color: #ffffff;
		margin: 0 8px;
		border-radius: 12px;
	}

	.menu-item:hover {
		background-color: #7B1113;
		color: white;
	}

	.menu-item:hover i {
		color: white;
	}

	.menu-item:hover .menu-label {
		color: white;
	}

	.menu-label {
		margin-left: 12px;
		font-size: 14px;
	}

	i {
		font-size: 20px;
		color: #6c757d;
	}

	.bottom {
		padding: 16px 0;
		background-color: #ffffff;
		margin-top: auto;
		border-top: 1px solid #e9ecef;
	}

	.bottom .menu-item {
		margin: 0 8px;
		border-radius: 12px;
	}

	.bottom .menu-item {
		color: #495057;
	}

	.bottom a {
		text-decoration: none;
		color: inherit;
	}

	.category-label {
		padding: 8px 24px;
		font-size: 12px;
		color: #6c757d;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-weight: 500;
	}
</style>
