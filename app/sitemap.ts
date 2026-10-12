import type { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/blog';
import { caseStudies } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/blog'].map((path) => ({ url: `${SITE_URL}${path}` }));
  const studies = caseStudies.map((c) => ({ url: `${SITE_URL}/projects/${c.slug}` }));
  const posts = getSortedPostsData().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
  }));
  return [...pages, ...studies, ...posts];
}
