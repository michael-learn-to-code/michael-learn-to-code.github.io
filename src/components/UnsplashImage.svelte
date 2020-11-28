<script>
  export let photoId = "";
  export let alt = "";
  export let author = "";

  let src = `https://source.unsplash.com/${photoId}/1600x900`;
  let href = `https://unsplash.com/photos/${photoId}`;
</script>

<style>
  .block-uimage {
    @apply w-full;
    .banner {
      @apply w-full;
      @apply h-64;
      display: block;
      object-fit: cover;
      border-radius: 0px;
      opacity: 1;
      object-position: center 42.13%;
    }
    .credit {
      @apply pl-2;
      &--text {
        @apply text-gray-700;
        @apply text-sm;
      }
      &--author {
        @apply text-base;
      }
    }
  }
</style>

<div class="block-uimage">
  <div class=""><img class="banner" {alt} {src} /></div>
  <div class="credit">
    <span class="credit--text">Photo by</span>
    <a class="credit--author" target="__blank" {href}>{author}</a>
    <span class="credit--text">on</span>
    <a
      class="credit--source text-gray-900"
      target="__blank"
      href="https://unsplash.com/">Unsplash</a>
  </div>
</div>
