<script lang="ts">
	import { page } from '$app/stores';
	import { Sheet, SheetContent, SheetTrigger } from "$lib/components/ui/sheet";
	import { Button } from "$lib/components/ui/button";

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

	const isActive = (path: string) => $page.url.pathname === `/${path}`;

	function handleLogout() {
		window.location.href = '/';
	}
</script>

<style>
	.active {
		background-color: #7B1113;
		color: white;
	}
</style>

<Sheet>
	<SheetTrigger class="lg:hidden fixed top-4 left-4 z-50">
		<Button variant="outline" size="icon">
			<i class="ri-menu-line"></i>
		</Button>
	</SheetTrigger>
	<SheetContent side="left" class="w-[220px] p-0">
		<nav class="h-full flex flex-col">
			<div class="p-5 border-b">
				<div class="flex items-center gap-3">
					<img src="/assets/up_logo.png" alt="UP Logo" class="w-7 h-7" />
					<h3 class="text-lg font-semibold text-[#7B1113]">UPB SAIS</h3>
				</div>
			</div>

			<div class="flex-1 overflow-auto">
				<div class="p-5">
					<h4 class="text-sm font-medium text-muted-foreground mb-4">GENERAL</h4>
					{#each menuItems as item (item.id)}
						<a
							href="/{item.path}"
							class="flex items-center gap-4 py-2 px-3 rounded-lg text-muted-foreground group"
							class:active={isActive(item.path)}
						>
							<i class={`${item.iconClass} text-lg`}></i>
							<span class="text-sm group-hover:text-black">
								{item.label}
							</span>
						</a>
					{/each}

					<h4 class="text-sm font-medium text-muted-foreground mt-8 mb-4">SUPPORT</h4>
					{#each supportItems as item (item.id)}
						<div class="flex items-center gap-4 py-2 px-3 rounded-lg text-muted-foreground group cursor-pointer">
							<i class={`${item.iconClass} text-lg`}></i>
							<span class="text-sm group-hover:text-[#7B1113]">
								{item.label}
							</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="border-t p-5">
				<button
					on:click={handleLogout}
					class="flex w-full items-center gap-4 py-2 px-3 rounded-lg text-muted-foreground group"
				>
					<i class="ri-logout-box-line text-lg"></i>
					<span class="text-sm group-hover:text-black">
						Logout
					</span>
				</button>
			</div>
		</nav>
	</SheetContent>
</Sheet>

<!-- Desktop Navigation -->
<nav class="hidden lg:block h-screen w-[220px] border-r bg-background fixed top-0 left-0">
	<div class="p-5 border-b">
		<div class="flex items-center gap-3">
			<img src="/assets/up_logo.png" alt="UP Logo" class="w-7 h-7" />
			<h3 class="text-lg font-semibold text-[#7B1113]">UPB SAIS</h3>
		</div>
	</div>

	<div class="p-5">
		<h4 class="text-sm font-medium text-muted-foreground mb-4">GENERAL</h4>
		{#each menuItems as item (item.id)}
			<a
				href="/{item.path}"
				class="flex items-center gap-4 py-2 px-3 rounded-lg text-muted-foreground group"
				class:active={isActive(item.path)}
			>
				<i class={`${item.iconClass} text-lg`}></i>
				<span class="text-sm group-hover:text-black">
					{item.label}
				</span>
			</a>
		{/each}

		<h4 class="text-sm font-medium text-muted-foreground mt-8 mb-4">SUPPORT</h4>
		{#each supportItems as item (item.id)}
			<div class="flex items-center gap-4 py-2 px-3 rounded-lg text-muted-foreground group cursor-pointer">
				<i class={`${item.iconClass} text-lg`}></i>
				<span class="text-sm group-hover:text-[#7B1113]">
					{item.label}
				</span>
			</div>
		{/each}
	</div>

	<div class="absolute bottom-0 left-0 right-0 border-t p-5">
		<button
			on:click={handleLogout}
			class="flex w-full items-center gap-4 py-2 px-3 rounded-lg text-muted-foreground group"
		>
			<i class="ri-logout-box-line text-lg"></i>
			<span class="text-sm group-hover:text-black">
				Logout
			</span>
		</button>
	</div>
</nav>
