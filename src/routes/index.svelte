<script context="module">
  let showAll = false
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts: showAll ? posts : posts.slice(0, 9) };
      });
  }
</script>

<script>
  import PostThumbnail from '../components/PostThumbnail.svelte'
  export let posts;

</script>

<svelte:head>
  <title>#MLTC - Michael Learn To Code</title>
</svelte:head>

<main class="flex flex-col content-center w-full max-w-full p-12">
    {#each posts as post, index}
      <PostThumbnail post={post} />
    {/each}
</main>
