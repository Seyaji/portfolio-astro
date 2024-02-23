import { getCollection } from "astro:content";

export const prerender = false;
export async function GET({ params, request, url }: any) {
  const filter = url.searchParams.get("topic");
  const posts = await getCollection("blog");
  const filteredPosts = posts.filter((post) => post.data.tags.includes(filter));
  console.log(posts, filteredPosts);
  return new Response(`
  ${filteredPosts
    .map((post) => {
      const { title, pubDate } = post.data;
      return `<div class='blog-post-item'>
      <a href="/blog/${post.slug}"> 
      <p class='post-name'>${title}</p>
      <p class='post-date'>${pubDate.toLocaleDateString()}</p>
      </a>
    </div>`;
    })
    .join("")}
  `);
}
