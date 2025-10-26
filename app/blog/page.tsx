import Link from 'next/link';
import { Metadata } from 'next';
import { getSortedPostsData, PostData } from '@/lib/blog'; // Adjust alias if necessary
import { format, parseISO } from 'date-fns';

// --- METADATA ---
export const metadata: Metadata = {
  title: 'Blog | Technical Insights & Learnings',
  description:
    'A collection of technical articles and insights on AI engineering, Next.js, and full-stack development by Md Mahbub Hassan.',
};

/**
 * The Blog Listing Page - A Server Component that fetches post metadata at build time (SSG).
 */
export default function BlogPage() {
  // Fetch data during the server-side rendering process
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-foreground text-5xl font-extrabold tracking-tight">
          The Developer's Blog
        </h1>
        <p className="text-muted-foreground mt-2 text-xl">
          Insights on AI, Next.js, and Full-Stack Architecture.
        </p>
      </header>

      {/* Blog Post List */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6">
        {allPostsData.length > 0 ? (
          allPostsData.map(({ slug, title, date, summary, tags }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group border-border/50 bg-card hover:border-primary block rounded-xl border p-6 transition-all duration-300 hover:shadow-lg"
            >
              <article className="space-y-3">
                <h2 className="text-foreground group-hover:text-primary text-2xl font-semibold transition-colors duration-300">
                  {title}
                </h2>
                <div className="text-muted-foreground flex items-center space-x-3 text-sm">
                  <time dateTime={date}>
                    {format(parseISO(date), 'MMMM dd, yyyy')}
                  </time>
                  <span className="text-primary/50">/</span>
                  <span>
                    {/* Placeholder for estimated reading time or category */}
                    {tags[0] || 'Technical'}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {summary}
                </p>

                {/* Tags/Categories */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))
        ) : (
          <div className="text-muted-foreground py-12 text-center">
            <p className="text-lg">No posts found yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
