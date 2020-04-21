import posts from "./blog/_posts";
const renderSitemap = (allPosts) => {
  const contents = allPosts.map((post) => {
    return {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      printDate: post.printDate,
      tagList: post.tagList,
    };
  });
  const sitemap = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        ${contents.map(
          (p) =>
            `<url>
                <loc>https://mi4t.me/blog/${p.slug}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority> 
            </url>`
        )}
    </urlset>
    `;

  return sitemap;
};
export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/rss+xml",
  });
  const sitemap = renderSitemap(posts);
  res.end(sitemap);
}
