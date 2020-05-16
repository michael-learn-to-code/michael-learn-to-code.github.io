<script>
  export let posts;
</script>

<nav class="sidebar flex-none">
  <ul>
    {#each { length: posts.length } as _, i}
      <li>
        <a class="underline text-sm italic" href={`blog/${posts[i].slug}`}>
          {posts[i].title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
