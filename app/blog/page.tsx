import Link from 'next/link';
import { Metadata } from 'next';
import { format, parseISO } from 'date-fns';
import { getSortedPostsData } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Long-form notes from building AI products: voice agents, private RAG, and what broke in production.',
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
      <header className="mb-12">
        <h1 className="text-foreground text-4xl md:text-5xl">Writing</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
          Long-form notes from building AI products: what broke, what I tried,
          and what finally worked. Follow along by{' '}
          <a href="/rss.xml" className="text-brand hover:underline">
            RSS
          </a>
          .
        </p>
      </header>

      {posts.length > 0 ? (
        <ul className="divide-border divide-y">
          {posts.map(({ slug, title, date, summary, tags }) => (
            <li key={slug} className="py-6">
              <Link href={`/blog/${slug}`} className="group block space-y-2">
                <h2 className="text-foreground group-hover:text-brand text-2xl transition-colors">
                  {title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{summary}</p>
                <p className="text-muted-foreground/80 text-sm">
                  <time dateTime={date}>{format(parseISO(date), 'd MMMM yyyy')}</time>
                  {tags?.length ? ` · ${tags.join(', ')}` : ''}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">
          The first articles are being written now. Check back soon, or
          subscribe by RSS.
        </p>
      )}
    </div>
  );
}
