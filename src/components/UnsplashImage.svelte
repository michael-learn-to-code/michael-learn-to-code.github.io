<script>
  export let photoId = ''
  export let alt = ''
  export let author = ''
  let src = `https://source.unsplash.com/${photoId}/1600x900`
  let href = `https://unsplash.com/photos/${photoId}}`

</script>
<style>
  .banner {
    display: block;
    object-fit: cover;
    border-radius: 0px;
    width: 100%;
    height: 30vh;
    opacity: 1;
    object-position: center 42.13%;
  }
</style>
<div class="w-full">
<div class="w-full overflow-hidden h-30vh" >
<img class="banner" {alt} {src} />
</div>
  <div class="text-left">
    <span class="credit-text">Photo by</span>
    <a class="credit-link " {href}>{author}</a> <span class="credit-text">on</span> <a class="credit-link" href="https://unsplash.com/">Unsplash</a></div>
</div>
