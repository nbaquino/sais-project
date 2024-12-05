<script lang="ts">
    export let placeholder: string = "Search...";
</script>

<div class="search-bar">
    <div class="search-wrapper">
        <i class="ri-search-line search-icon"></i>
        <input type="text" placeholder={placeholder} class="search-input" />
    </div>
</div>

<style>
    .search-bar {
        height: 60px;
        width: 30%;
        background-color: #F2F2F2;
        display: flex;
        align-items: center;
        padding: 0 32px;
    }

    .search-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
    }

    .search-icon {
        position: absolute;
        left: 12px;
        color: #6c757d;
        font-size: 18px;
    }

    .search-input {
        width: 100%;
        padding: 8px 12px 8px 38px;
        border: 1px solid #e9ecef;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
        transition: all 0.2s ease;
        background-color: white;
    }

    .search-input:focus {
        border-color: #7B1113;
        box-shadow: 0 0 0 2px rgba(123, 17, 19, 0.1);
    }

    .search-input::placeholder {
        color: #6c757d;
    }
</style>
