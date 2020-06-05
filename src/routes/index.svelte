<script context="module">
  let showAll = true;
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
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
  class="flex flex-col content-center w-full max-w-full lg:p-4 sm:p-2 md:p-2
  grid sm:grid-cols-12">
  <div
    class="ads-display sm:col-start-1 sm:col-end-3 flex flex-col items-center
    invisible hidden sm:visible sm:block">
    <Ads />
  </div>
  <div class="content sm:col-start-3 sm:col-end-12">
    <div class="my-2 underline text-lg">
      <a target="_blank" href="https://slides.com/ducvuanh/resume/fullscreen">
        I'm looking for a remote job. Check my Resume here
      </a>
    </div>
    {#each posts as post, index}
      <PostThumbnail {post} />
    {/each}
  </div>
</main>
