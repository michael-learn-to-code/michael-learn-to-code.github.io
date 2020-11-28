import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    printDate: post.printDate,
    tagList: post.tagList,
    imageId: post.imageId,
    image: post.image,
    imageAuthor: post.imageAuthor,
    metadata: post.metadata,
    tocHtml: post.tocHtml,
  };
}));

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(contents);
}