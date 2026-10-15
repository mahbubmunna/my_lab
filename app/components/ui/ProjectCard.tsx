import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectCardProps {
  slug: string;
  href: string; // internal route ('/projects/mama-desk') or external URL
  title: string;
  description: string;
  tags: string[];
  status?: string; // e.g. 'Built and deployed', 'In development'
  ctaLabel?: string;
}

export default function ProjectCard({
  href,
  title,
  description,
  tags,
  status,
  ctaLabel = 'Read the case study',
}: ProjectCardProps) {
  const isExternal = href.startsWith('http');
  const linkClasses =
    'text-brand inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline';

  return (
    <article className="border-border bg-card rounded-xl border p-6 transition-colors hover:border-foreground/25">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-foreground text-xl">{title}</h3>
        {status && (
          <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {status}
          </span>
        )}
      </div>
      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
      <p className="text-muted-foreground mb-4 text-sm">
        {tags.join(' · ')}
      </p>
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          {ctaLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : (
        <Link href={href} className={linkClasses}>
          {ctaLabel} →
        </Link>
      )}
    </article>
  );
}
