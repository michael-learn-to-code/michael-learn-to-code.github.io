<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();
    if (res.status === 200) {
      return { posts: data.posts, post: data.post };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import UnsplashImage from "../../components/UnsplashImage.svelte";
  import RelatedPosts from "../../components/RelatedPosts.svelte";
  export let post;
  export let posts;

  function getRandomSubarray(arr, size) {
    console.log("render again");
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - size,
      temp,
      index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }
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
          inlineMath: [["$", "$"], ["\\(", "\\)"]]
          // processEnvironments: true
        },
        svg: {
          fontCache: "global"
        }
      };
    </script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6">

    </script>
    <script
      id="MathJax-script"
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">

    </script>
  {/if}
  <link rel="stylesheet" href="highlight.css" />
  <title>{post.title}</title>
  <meta name="description" content={post.metadata.description} />
  <meta name="keywords" content={post.metadata.keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.mi4t.me/{post.slug}" />
  <meta property="og:title" content={post.metadata.title} />
  <meta property="og:description" content={post.metadata.description} />
  {#if post.metadata.thumb}
    <meta property="og:image" content={post.metadata.thumb} />
  {/if}

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://www.mi4t.me/{post.slug}" />
  <meta property="twitter:title" content={post.metadata.title} />
  <meta property="twitter:description" content={post.metadata.description} />
  {#if post.metadata.thumb}
    <meta property="twitter:image" content={post.metadata.thumb} />
  {/if}
</svelte:head>

<header class="flex flex-col items-center content-center">
  {#if post.imageId}
    <UnsplashImage
      photoId={post.imageId}
      author={post.imageAuthor}
      alt={post.title} />
  {/if}
  <p class="italic text-gray-500">{post.printDate} ~ {post.printReadingTime}</p>
  <h1 class="text-4xl text-gray-900">{post.title}</h1>
  <hr />
</header>
<div class="container flex flex-row gap-3">
  <article class="content p-5">
    {#if post.tocHtml}
      <div id="toc_container" class="toc p-10 block">
        <span class="text-base italic">Table of content</span>
        {@html post.tocHtml}
      </div>
    {/if}
    {@html post.html}
    <footer>
      <RelatedPosts posts={getRandomSubarray(posts, 10)} />
    </footer>
  </article>
  <hr />
</div>
