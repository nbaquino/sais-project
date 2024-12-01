<script>
  import Header from '$lib/components/Header.svelte';
</script>

<div class="container">
  <Header />
  <div class="classes-section">
    <div class="classes-header">
      <h2>Classes</h2>
      <a href="#view-all">View All →</a>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }

  .classes-section {
    margin-top: 2rem;
  }

  .classes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
</style>
