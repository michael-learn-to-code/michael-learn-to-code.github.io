<script lang="ts">
  const siteTitle = process.env.SITE_TITLE;
  const siteMeta = (process.env.SITE_META as unknown) as [TMeta];
</script>

<style>
  main {
    max-width: 100vw;
    margin: auto;
    box-sizing: border-box;
  }
</style>

<svelte:head>
  <title>{siteTitle}</title>
  {#each siteMeta as meta}
    <meta type={meta.name} content={meta.value} />
  {/each}
</svelte:head>
<main>
  <slot />
</main>
