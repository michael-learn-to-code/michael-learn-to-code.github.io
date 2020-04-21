<script context="module">
  let showAll = true
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
  import UnsplashImage from '../components/UnsplashImage.svelte'
  export let posts;

</script>

<svelte:head>
  <title>#MLTC - Michael Learn To Code</title>
</svelte:head>

    <UnsplashImage photoId="PQHOmT-vkgA" author="Norbert Kowalczyk" alt="find myself in space" />
<main class="flex flex-col content-center w-full max-w-full p-12">
    {#each posts as post, index}
      <PostThumbnail post={post} />
    {/each}
</main>
