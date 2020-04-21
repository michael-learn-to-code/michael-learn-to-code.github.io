<script>
  export let photoId = ''
  export let alt = ''
  const supportedWidths = [750, 1050, 1350, 1500]
  let srcset = supportedWidths.map(w => `https://images.unsplash.com/photo-${photoId}?w-${w}&q=80 ${w}w`).join(', ')
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
<img class="banner" {alt} {srcset} />
</div>
  <div class="">
    <span class="credit-text">Photo by</span>
    <a class="credit-link" href="https://unsplash.com/photos/PQHOmT-vkgA">Norbert Kowalczyk</a> <span class="credit-text">on</span> <a class="credit-link" href="https://unsplash.com/">Unsplash</a></div>
</div>
