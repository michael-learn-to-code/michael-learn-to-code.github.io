<script>
  import Header from "../components/Header.svelte";
  import UnsplashImage from "../components/UnsplashImage.svelte"
  export let segment;
</script>

<style>
  :global(kbd) {
    color: #fff;
    background: #333;
    border-radius: 4px;
    box-shadow: 2px 2px 2px #aaa;
    font-size: 22px;
    padding: 5px 10px;
    line-height: 33px;
  }
</style>

<div class="layout">
  <Header {segment} />
  <main class="flex flex-col w-full max-w-full">
    <UnsplashImage photoId="1584852498908-85e3e7bb303a" alt="find myself in space" />
    <slot />
  </main>
</div>
