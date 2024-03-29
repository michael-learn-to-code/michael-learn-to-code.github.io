import fs from 'fs';
import path from 'path';
import marked from 'marked';
import matter from "gray-matter"
import formatDate from "date-fns/format"
import readingTime from "reading-time"
import tocParser from "markdown-toc"
import prism from "prismjs"

const cwd = process.cwd();
const POSTS_DIR = path.join(cwd, "articles/");

const EXCERPT_SEPARATOR = "<!-- more -->";

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;

renderer.link = (href, title, text) => {
  const html = linkRenderer.call(renderer, href, title, text);

  if (href.indexOf("/") === 0) {
    // Do not open internal links on new tab
    return html;
  } else if (href.indexOf("#") === 0) {
    // Handle hash links to internal elements
    const html = linkRenderer.call(renderer, "javascript:;", title, text);
    return html.replace(
      /^<a /,
      `<a onclick="document.location.hash='${href.substr(1)}';" `
    );
  }

  return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
};

renderer.code = (code, language) => {
  const parser = prism.languages[language] || prism.languages.html;
  const highlighted = prism.highlight(code, parser, language);
  return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
};

marked.setOptions({ renderer });

const posts = fs
  .readdirSync(POSTS_DIR)
  .filter((fileName) => /\.md$/.test(fileName))
  .map((fileName) => {
    const fileMd = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
    const { data, content: rawContent } = matter(fileMd);

    const {
      title,
      date,
      tags,
      mathjax = false,
      image,
      imageAuthor,
      imageId,
      description,
      keywords,
      toc = false,
    } = data;

    const slug = fileName.split(".")[0];
    const tagList = (!!tags && tags.split(",").map((t) => t.trim())) || [];
    let content = rawContent;
    let excerpt = "";
    let tocHtml = "";
    if (toc) {
      const tocContent = tocParser(rawContent, {
        firsth1: false,
      }).content;
      tocHtml = marked(tocContent);
    }

    if (rawContent.indexOf(EXCERPT_SEPARATOR) !== -1) {
      const splittedContent = rawContent.split(EXCERPT_SEPARATOR);
      excerpt = splittedContent[0];
      content = splittedContent[1];
    }

    const html = marked(content);
    const readingStats = readingTime(content);
    const printReadingTime = readingStats.text;
    if (!date) {
      console.log(fileName)
    }
    const printDate = date ? formatDate(new Date(date), "MMMM d, yyyy") : new Date()

    return {
      title: title || slug,
      slug,
      html,
      date,
      excerpt: excerpt,
      printDate,
      printReadingTime,
      tagList,
      imageId,
      image,
      imageAuthor,
      mathjax,
      tocHtml,
      metadata: {
        description,
        keywords,
      },
    };

  })

posts.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return 0;
});

posts.forEach((post) => {
  post.html = post.html.replace(/^\t{3}/gm, "");
});

export default posts
