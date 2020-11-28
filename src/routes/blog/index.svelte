<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts };
      });
  }
</script>

<script>
  export let posts: Array<TPost>;
</script>

<style>
  h2,
  .post-item__footer {
    font-family: Rubik, sans-serif;
    font-weight: 700;
  }

  .post-item__date {
    color: #aaa;
    text-align: left;
    text-transform: uppercase;
    margin-right: 16px;
  }
  .post-item__tags {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    list-style: none;
    padding: 0px;
  }
  .post-item__tags .tag {
    color: #aaabbb;
    text-transform: uppercase;
    font-size: 14px;
    margin: 0px 10px;
  }

  hr {
    margin: 60px auto;
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="container">
  <h1>Blog</h1>
  {#each posts as post, index}
    {#if index}
      <hr />
    {/if}
    <div class="post-item">
      <h2><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></h2>
      <p>{post.excerpt}</p>
      <div class="post-item__footer">
        <span class="post-item__date">— {post.printDate}</span>
      </div>
      {#if post.tagList}
        <div class="post-item__tagList">
          <ul class="post-item__tags">
            {#each post.tagList as tag, index}
              <li class="tag">#{tag}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/each}
</div>
