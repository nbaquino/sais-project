<script>
  export let date = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'long'
  });
</script>

<header class="header">
  <div class="search-container">
    <div class="search-wrapper">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#8B0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <input type="search" placeholder="Search" class="search-input" />
    </div>
  </div>
  <div class="date">{date}</div>
</header>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    position: fixed;
    top: 8px;
    right: 0;
    left: 260px;
    height: 60px;
    z-index: 10;
  }

  .search-container {
    flex: 1;
    max-width: 500px;
  }

  .search-wrapper {
    position: relative;
    width: 420px;
    background: #F8F8F8;
    border-radius: 12px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 1;
  }

  .search-input {
    padding: 0.75rem 1.25rem 0.75rem 2.75rem;
    border-radius: 12px;
    border: none;
    width: 100%;
    font-size: 1rem;
    background: transparent;
    outline: none;
    color: #64748b;
  }

  .search-input::placeholder {
    color: #94a3b8;
  }

  .date {
    color: #666;
    margin-right: 320px;
    flex-shrink: 0;
  }

  /* Responsive styles matching navbar */
  @media (max-width: 1024px) {
    .header {
      left: 200px;
    }

    .search-wrapper {
      width: 320px;
    }

    .date {
      margin-right: 280px;
    }
  }

  @media (max-width: 768px) {
    .header {
      left: 80px;
      padding: 1rem;
    }

    .search-wrapper {
      width: 40px;
      height: 40px;
      background: transparent;
      justify-content: center;
    }

    .search-input {
      display: none;
    }

    .search-icon {
      position: static;
      transform: none;
      cursor: pointer;
      pointer-events: auto;
    }

    .date {
      display: none;
    }

    .search-container {
      display: flex;
      justify-content: flex-start;
    }
  }

  @media (max-width: 480px) {
    .header {
      left: 64px;
      padding: 0.75rem;
    }

    .search-wrapper {
      width: 36px;
      height: 36px;
    }
  }

  @media (max-width: 360px) {
    .header {
      left: 56px;
      padding: 0.5rem;
    }

    .search-wrapper {
      width: 32px;
      height: 32px;
    }

    .search-icon {
      width: 18px;
      height: 18px;
    }
  }
</style>
