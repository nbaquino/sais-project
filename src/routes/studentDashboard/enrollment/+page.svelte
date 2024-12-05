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

            <div class="schedule-section">
                <h2 class="schedule-title">My Class Schedule</h2>

                <div class="nav-bar">
                    <div class="status-filters">
                        <div class="status-label">
                            <span class="status-icon enrolled">✓</span>
                            <span>Enrolled</span>
                        </div>
                        <div class="status-label">
                            <span class="status-icon dropped">●</span>
                            <span>Dropped</span>
                        </div>
                        <div class="status-label">
                            <span class="status-icon waitlisted">▲</span>
                            <span>Wait Listed</span>
                        </div>
                    </div>
                    <div class="term-selector">
                        <label for="term">Term:</label>
                        <select id="term" name="term">
                            <option value="2024-1">1st Term 2024-2025</option>
                            <option value="2023-2">2nd Term 2023-2024</option>
                            <option value="2023-1">1st Term 2023-2024</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</PageLayout>

<style>
    .enrollment-wrapper {
        background-color: #f5f5f5;
        min-height: 100%;
    }

    .enrollment-container {
        background-color: #fff;
        border-radius: 12px;
        margin: 24px;
    }

    .enrollment-header {
        padding: 24px 32px;
        background-color: #fff;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }

    .enrollment-header h1 {
        font-size: 28px;
        font-weight: 600;
        color: #333;
        margin: 0;
    }

    .subtitle {
        color: #666;
        margin: 8px 0 0 0;
        font-size: 14px;
    }

    .schedule-section {
        padding: 0 32px 24px 32px;
    }

    .schedule-title {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        margin: 24px 0;
    }

    .nav-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .status-filters {
        display: flex;
        gap: 24px;
    }

    .status-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #495057;
    }

    .status-icon {
        display: inline-flex;
        align-items: center;
    }

    .status-icon.enrolled {
        color: #28a745;
    }

    .status-icon.dropped {
        color: #007bff;
    }

    .status-icon.waitlisted {
        color: #ffc107;
    }

    .term-selector {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .term-selector label {
        font-size: 14px;
        color: #495057;
    }

    .term-selector select {
        padding: 6px 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        color: #495057;
        background-color: white;
        min-width: 200px;
    }

    @media (max-width: 768px) {
        .enrollment-container {
            margin: 16px;
        }

        .enrollment-header,
        .schedule-section {
            padding: 16px;
        }

        .nav-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        .term-selector {
            width: 100%;
        }

        .term-selector select {
            flex-grow: 1;
            width: 100%;
        }
    }
</style>
