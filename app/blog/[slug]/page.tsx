import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { CAL_URL } from '@/lib/site';
import TableOfContents from '../../components/blog/TableOfContents';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug).catch(() => null);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    // The site is the original; cross-posts (dev.to, Substack) point back here.
    alternates: { canonical: post.canonical ?? `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostData(slug).catch(() => null);
  if (!post) notFound();

  const { title, date, summary, tags, contentHtml, headings, readingMinutes } = post;
  const showToc = (headings?.length ?? 0) >= 3;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
        <article className="mx-auto w-full max-w-[68ch]">
          <header className="mb-10">
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              ← All writing
            </Link>
            <h1 className="text-foreground mt-4 text-4xl leading-tight md:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">{summary}</p>
            <p className="text-muted-foreground/80 mt-4 text-sm">
              <time dateTime={date}>{format(parseISO(date), 'd MMMM yyyy')}</time>
              {readingMinutes ? ` · ${readingMinutes} min read` : ''}
              {tags?.length ? ` · ${tags.join(', ')}` : ''}
            </p>
          </header>

          <div
            className="article"
            dangerouslySetInnerHTML={{ __html: contentHtml ?? '' }}
          />

          <aside className="bg-muted mt-16 rounded-xl p-6">
            <p className="text-foreground font-serif text-xl">
              Dealing with something similar?
            </p>
            <p className="text-muted-foreground mt-2">
              I&apos;m happy to talk it through. Thirty minutes, bring the
              problem.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 inline-flex h-10 items-center gap-1.5 rounded-lg px-5 text-sm font-medium transition-colors"
            >
              Book a 30-min call
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </aside>
        </article>

        {showToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
                On this page
              </p>
              <TableOfContents headings={headings ?? []} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
