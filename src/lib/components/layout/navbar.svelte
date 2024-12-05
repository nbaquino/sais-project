<script lang="ts">
	import { page } from '$app/stores';
	export const currentPage: string = '';

	let isMenuOpen = false;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const menuItems = [
		{ iconClass: 'ri-home-4-line', label: 'Home', id: 1, path: 'studentDashboard' },
		{ iconClass: 'ri-file-list-3-line', label: 'Enrollment', id: 5, path: 'studentDashboard/enrollment' },
		{ iconClass: 'ri-inbox-2-line', label: 'Inbox', id: 2, path: 'inbox' },
		{ iconClass: 'ri-user-line', label: 'Account', id: 3, path: 'account' },
		{ iconClass: 'ri-time-line', label: 'Recents', id: 4, path: 'recents' }
	];

	const supportItems = [
		{ iconClass: 'ri-settings-3-line', label: 'Settings', id: 1 },
		{ iconClass: 'ri-question-line', label: 'Help Center', id: 2 }
	];

	function handleLogout() {
		// Add any cleanup operations here
		window.location.href = '/';
	}

	// Function to check if a link is active
	const isActive = (path) => {
		return $page.url.pathname === `/${path}`;
	}
</script>

<button
    class="menu-button"
    on:click={toggleMenu}
    on:keydown={(e) => e.key === 'Enter' && toggleMenu()}
    aria-label="Toggle menu">
    <i class="ri-menu-line"></i>
</button>

<div class="frame" class:open={isMenuOpen}>
	<div class="top">
		<div class="logo-container">
			<img src="/assets/up_logo.png" alt="UP Logo" class="logo" />
			<h3>UPB SAIS</h3>
		</div>
	</div>
	<div class="menu-frame">
		<div class="category-label">General</div>
		{#each menuItems as item (item.id)}
			<a
				href="/{item.path}"
				class="menu-item"
				class:active={isActive(item.path)}
			>
				<i class={item.iconClass}></i>
				<span class="menu-label">{item.label}</span>
			</a>
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
		<div class="menu-item"
			role="button"
			tabindex="0"
			on:click={handleLogout}
			on:keydown={(e) => e.key === 'Enter' && handleLogout()}>
			<i class="ri-logout-box-line"></i>
			<span class="menu-label">Logout</span>
		</div>
	</div>
</div>

<style>
	.menu-button {
		display: none;
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 2000;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 8px;
		background: white;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}

	.menu-button i {
		font-size: 24px;
		color: #7B1113;
	}

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
		transition: transform 0.3s ease;
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
		font-weight: 600;
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
		.menu-button {
			display: block;
		}

		.frame {
			transform: translateX(-100%);
			width: 280px;
		}

		.frame.open {
			transform: translateX(0);
		}

		.logo {
			width: 40px;
			height: 40px;
		}

		h3 {
			font-size: 16px;
		}

		.menu-item {
			padding: 12px 24px;
		}

		.menu-label {
			font-size: 14px;
		}

		i {
			font-size: 20px;
		}

		.category-label {
			font-size: 12px;
			padding: 8px 24px;
		}
	}

	@media (max-width: 480px) {
		.frame {
			width: 260px;
		}

		.menu-item {
			padding: 10px 20px;
		}

		.menu-label {
			font-size: 13px;
		}

		i {
			font-size: 18px;
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

	.category-label {
		padding: 8px 24px;
		font-size: 12px;
		color: #6c757d;
		text-transform: uppercase;
			letter-spacing: 0.5px;
		font-weight: 500;
	}

	a {
		text-decoration: none;
	}
</style>
