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

    // Update the style binding to adjust both margins
    $: mainContentStyle = isSidebarOpen
        ? 'margin-right: 280px; width: calc(100% - 460px);'
        : 'margin-right: 0; width: calc(100% - 180px);';
</script>

<div class="layout">
    {#if browser}
        <Navbar {currentPage} />
        <main class="main-content" style={mainContentStyle}>
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
        position: relative;
    }

    .main-content {
        position: absolute;
        left: 180px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #F2F2F2;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .search-wrapper {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        border-bottom: 1px solid #e9ecef;
        background-color: #F2F2F2;
        width: 100%;
    }

    .content-wrapper {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
    }

    @media (max-width: 1024px) {
        .main-content {
            right: 0;
            width: calc(100% - 180px) !important; /* Override inline styles for mobile */
            margin-right: 0 !important; /* Override inline styles for mobile */
        }
    }

    @media (max-width: 768px) {
        .main-content {
            left: 0;
            width: 100% !important; /* Override inline styles for mobile */
        }
    }
</style>
