// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostData, getAllPostSlugs, PostData } from '@/lib/blog';
import { format } from 'date-fns';
import Link from 'next/link';
import TableOfContents from '../../components/blog/TableOfContents'; // NEW: Import the ToC component

// --- TYPE DEFINITIONS ---
interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// --- SSG FUNCTIONS (Unchanged) ---
export function generateStaticParams() {
  const slugs = getAllPostSlugs();

  console.log(slugs);
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug).catch(() => null);
  if (!postData) {
    return {};
  }
  return {
    title: postData.title,
    description: postData.summary,
    openGraph: { title: postData.title, description: postData.summary },
    keywords: postData.tags.join(', '),
  };
}

/**
 * The main component for displaying an individual blog post (Server Component).
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  params;

  // Fetch the full post data, including the HTML content AND headings
  const postData: PostData | null = await getPostData(slug).catch(() => null);

  console.log(postData);

  if (!postData) {
    notFound();
  }

  const { title, date, summary, tags, contentHtml, headings } = postData;

  // Render the component
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
        {/* Left Column (Main Content) */}
        <article className="lg:col-span-3">
          {/* Header */}
          <header className="border-border/50 mb-8 border-b pb-4">
            <Link
              href="/blog"
              className="text-primary/70 hover:text-primary mb-1 inline-block text-sm font-medium transition-colors"
            >
              ← Back to Blog Index
            </Link>
            <h1 className="text-foreground mb-3 text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
              {title}
            </h1>
            <div className="text-muted-foreground flex flex-wrap items-center space-x-4 text-sm">
              <time dateTime={date} className="font-semibold">
                {format(new Date(date), 'MMMM dd, yyyy')}
              </time>
              <span className="text-primary/50">/</span>
              <span>{tags.join(', ')}</span>
            </div>
          </header>

          {/* Post Summary */}
          <p className="text-foreground/80 border-primary/50 mb-8 border-l-4 pl-4 text-xl italic">
            {summary}
          </p>

          {/* Content Body */}
          <div
            className="prose dark:prose-invert text-muted-foreground max-w-none"
            dangerouslySetInnerHTML={{
              __html: contentHtml || '<p>No content available yet.</p>',
            }}
          />
        </article>

        {/* Right Column (Table of Contents) */}
        <aside className="mt-12 lg:col-span-1 lg:mt-0">
          {/* Ensure the sidebar stays sticky and doesn't scroll off screen */}
          <div className="border-border/50 bg-card toc-sidebar sticky top-20 rounded-xl border p-4">
            <h2 className="text-foreground mb-3 text-lg font-bold">
              Table of Contents
            </h2>
            <TableOfContents headings={headings || []} />{' '}
            {/* NEW: Render the component */}
          </div>
        </aside>
      </div>
    </div>
  );
}
