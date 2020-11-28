<script context="module">
  let showAll = true;
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts: showAll ? posts : posts.slice(0, 9) };
      });
  }
</script>

<script>
  import PostThumbnail from "../components/PostThumbnail.svelte";
  import UnsplashImage from "../components/UnsplashImage.svelte";
  import Ads from "../components/Ads.svelte";
  export let posts;
</script>

<svelte:head>
  <title>#MLTC - Michael Learn To Code</title>
</svelte:head>

<UnsplashImage
  photoId="PQHOmT-vkgA"
  author="Norbert Kowalczyk"
  alt="find myself in space" />
<main
  class="flex flex-col content-center w-full max-w-full lg:p-4 sm:p-2 md:p-2 grid sm:grid-cols-12">
  <div class="content sm:col-start-3 sm:col-end-12">
    {#each posts as post, index}
      <PostThumbnail {post} />
    {/each}
  </div>
</main>
