<script lang="ts">
    import Navbar from './navbar.svelte';
    import Rightbar from './rightbar.svelte';

    export let currentPage: string;
</script>

<div class="layout">
    <Navbar {currentPage} />

    <div class="main-container">
        <main class="content">
            <slot />
        </main>
    </div>

    <Rightbar />
</div>

<style>
    .layout {
        display: grid;
        grid-template-columns: 220px 1fr 300px;
        min-height: 100vh;
    }

    .main-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .content {
        padding: 24px;
        background-color: #f8f9fa;
        flex: 1;
    }

    @media (max-width: 1024px) {
        .layout {
            grid-template-columns: 200px 1fr 280px;
        }
    }

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }

        .content {
            margin-left: 0;
            padding: 16px;
        }
    }
</style>
