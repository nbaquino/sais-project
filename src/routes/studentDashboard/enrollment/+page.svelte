<script lang="ts">
    import PageLayout from '$lib/components/layout/PageLayout.svelte';
</script>

<PageLayout currentPage="studentDashboard/enrollment">
    <div class="enrollment-wrapper">
        <div class="enrollment-container">
            <div class="enrollment-header">
                <h1>Enrollment</h1>
                <p class="subtitle">Manage your course enrollment here</p>
            </div>
            <!-- Content can be added here -->
        </div>
    </div>
</PageLayout>

<style>
    .enrollment-wrapper {
        padding: 24px 16px;
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    .enrollment-container {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        height: 100%;
    }

    .enrollment-header {
        padding: 24px;
        background-color: white;
        border-bottom: 1px solid #e9ecef;
    }

    .enrollment-header h1 {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        margin: 0;
    }

    .subtitle {
        color: #666;
        margin: 8px 0 0 0;
        font-size: 14px;
    }

    @media (max-width: 768px) {
        .enrollment-wrapper {
            padding: 16px 8px;
        }

        .enrollment-header {
            padding: 16px;
        }
    }
</style>
