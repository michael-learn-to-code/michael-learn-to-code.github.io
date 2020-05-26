<script>
  export let posts;
  export let maxPosts = 10;
</script>

<nav class="mt-6">
  <h2 class="text-xl">Related Posts</h2>
  {#each { length: maxPosts } as _, i}
    <li>
      <a class="underline text-sm italic" href={`blog/${posts[i].slug}`}>
        {posts[i].title}
      </a>
    </li>
  {/each}
</nav>
