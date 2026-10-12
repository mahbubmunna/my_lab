// RSS feed of published articles. dev.to ("Publishing to DEV from RSS") and
// Substack can import from it, keeping this site as the canonical original.

import { getPostData, getSortedPostsData } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

const escape = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function GET() {
  const posts = await Promise.all(
    getSortedPostsData().map((post) => getPostData(post.slug)),
  );

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `
    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.summary)}</description>
      ${(post.tags ?? []).map((tag) => `<category>${escape(tag)}</category>`).join('')}
      <content:encoded><![CDATA[${post.contentHtml ?? ''}]]></content:encoded>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mahbub Hassan</title>
    <link>${SITE_URL}</link>
    <description>Notes from building voice agents and AI products: what broke and how I fixed it.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
