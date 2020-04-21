<script>
  export let post = {}
</script>
<a rel="prefetch" href="blog/{post.slug}">
<article class="flex flex-col w-full h-40 p-3 my-4 border border-gray-300 shadow-xl rounded-md">
  <h2 class="text-4xl font-bold tracking-wide">{post.title}</h2>
  <p class="text-xl text-gray-800">{post.excerpt}</p>
  <div class="flex flex-row mt-auto">
    <div class="flex flex-row mr-auto">
      {#if post.tagList}
            {#each post.tagList as tag, index}
              <span class="mr-2 text-xs text-gray-700 ">#{tag}</span>
            {/each}
      {/if}
    </div>
    <div class="flex ml-auto">
      {post.printDate}
    </div>
  </div>
</article>
</a>
