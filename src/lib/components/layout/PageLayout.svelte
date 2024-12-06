<script lang="ts">
    import { browser } from '$app/environment';
    import Navbar from './navbar.svelte';
    import Rightbar from './rightbar.svelte';
    import SearchBar from './SearchBar.svelte';

    export let currentPage: 'studentDashboard' | 'studentDashboard/enrollment' | 'inbox' | 'account' | 'recents';

    let isSidebarOpen = true;

    // Handler to toggle sidebar state
    function handleSidebarToggle(event: { detail: boolean; }) {
        isSidebarOpen = event.detail;
    }
</script>

<div class="layout">
    {#if browser}
        <Navbar {currentPage} />
        <main class="main-content" style="margin-right: {isSidebarOpen ? '320px' : '0'};">
            <div class="search-wrapper">
                <SearchBar placeholder="Search..." />
            </div>
            <div class="content-wrapper">
                <slot />
            </div>
        </main>
        <Rightbar bind:isSidebarOpen on:toggleSidebar={handleSidebarToggle} />
    {/if}
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .layout {
        display: flex;
        width: 100%;
        height: 100vh;
        background-color: #f5f5f5;
        gap: 0;
    }

    .main-content {
        margin-left: 220px;
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: #F2F2F2;
        height: 100vh;
        overflow: hidden;
        transition: margin-right 0.3s ease; /* Smooth transition */
    }

    .search-wrapper {
        height: 80px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e9ecef;
    }

    .content-wrapper {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }

    @media (max-width: 1024px) {
        .main-content {
            margin-left: 200px;
        }
    }

    @media (max-width: 768px) {
        .main-content {
            margin-left: 0;
        }
    }
</style>
