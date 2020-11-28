<script lang="ts">
  export let post: TPost;
  let imageSrc = `https://source.unsplash.com/${post.imageId}/400x280`;
</script>

<style lang="scss">
  article {
    @apply h-40;
    @apply bg-white;
  }
  .post {
    &--image {
      @apply w-full;
      @apply h-full;
    }
  }
</style>

<a rel="prefetch" href="blog/{post.slug}">
  <article
    class="[ post ] flex flex-row w-full h-40 p-3 my-4 border border-gray-300 shadow-xl grid grid-rows-5 rounded-md">
    <div class="pb-3 overflow-hidden grid grid-cols-4 gap-4 row-span-4">
      {#if post.imageId}
        <div class="overflow-hidden col-span-1">
          <img class=" [ post--image ] " src={imageSrc} alt={post.title} />
        </div>
      {/if}
      <section class="flex flex-col col-span-3">
        <h2 class="text-xl font-bold tracking-wide">{post.title}</h2>
        <p class="text-sm italic tracking-wide text-gray-800">{post.excerpt}</p>
      </section>
    </div>
    <section class="flex flex-row mt-auto row-span-1">
      <div class="flex flex-row mr-auto">
        {#if post.tagList}
          {#each post.tagList.slice(0, 3) as tag, index}
            <span class="mr-2 text-xs text-gray-700 ">#{tag}</span>
          {/each}
        {/if}
      </div>
      <div class="flex ml-auto text-xs">{post.printDate}</div>
    </section>
  </article>
</a>
