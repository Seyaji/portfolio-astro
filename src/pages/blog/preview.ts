import { getCollection } from "astro:content";

export const prerender = false;
export async function GET({ params, request, url }: any) {
  const filter = url.searchParams.get("topic");
  const posts = await getCollection("blog");
  const filteredPosts = posts.filter((post) => post.data.tags.includes(filter));
  const post = filteredPosts[0];

  let html;

  if (post?.data) {
    const { title, pubDate } = post.data;
    html = `
    <div class='blog-post-tv-box' href="/blog/post-2">
    <br />
    <p>${title}</p>
    <p>-------------------</p>
    <p>${pubDate.toLocaleDateString()}</p>
    <p>---------</p>
    <p>${post.body}</p>
    </div>`;
  }
  return new Response(html ? html : `<div class='no-posts'><p>${filter}: No posts found...</p></div>`);
}
