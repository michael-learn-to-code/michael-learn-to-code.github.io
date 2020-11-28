<script context="module" lang="ts">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts };
      });
  }
</script>

<script lang="ts">
  import UnsplashImage from "../components/UnsplashImage.svelte";
  import PostView from "../components/PostView.svelte";

  export let posts: Array<TPost>;
</script>

<style>
  .content {
    padding: 1em;
  }
</style>

<UnsplashImage
  photoId="PQHOmT-vkgA"
  author="Norbert Kowalczyk"
  alt="find myself in space" />

<section class="content lg:w-4/5 md:w-full flex m-auto flex-col">
  {#each posts as post, index}
    <PostView {post} />
  {/each}
</section>
