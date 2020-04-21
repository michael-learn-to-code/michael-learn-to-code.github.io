<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import UnsplashImage from '../../components/UnsplashImage.svelte'
  export let post;
</script>

<style>
</style>

<svelte:head>
  {#if post.mathjax}
    <script>
      MathJax = {
        tex: {
          displayMath: [
            // start/end delimiter pairs for display math
            ["$$", "$$"]
          ],
          inlineMath: [["$", "$"]],
          processEnvironments: true
        },
        svg: {
          fontCache: "global"
        }
      };
    </script>
    <script
      type="text/javascript"
      id="MathJax-script"
      async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">

    </script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6">

    </script>
  {/if}
    <link rel="stylesheet" href="highlight.css" />
  <title>{post.title}</title>
</svelte:head>

<header class="flex flex-col items-center content-center">
  {#if post.imageId}
  <UnsplashImage photoId={post.imageId} author={post.imageAuthor} alt={post.title} />
  {/if}
  <p class="italic text-gray-500">{post.printDate} ~ {post.printReadingTime}</p>
  <h1 class="text-6xl text-gray-900">{post.title}</h1>
  <hr />
</header>
<div class="container">
  <article class="content">
    {@html post.html}
  </article>
  <hr />
</div>
