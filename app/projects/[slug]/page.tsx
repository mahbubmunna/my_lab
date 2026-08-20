import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  BrowserFrame,
  PhoneFrame,
} from '@/app/components/ui/DeviceFrames';
import { caseStudies, getCaseStudy } from '@/lib/projects';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} | Mahbub Hassan`,
    description: study.oneLiner,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const isLive = study.status.toLowerCase().includes('live');

  return (
    <div className="container mx-auto space-y-14 px-4 py-12 pb-24">
      {/* Back link */}
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      {/* Hero */}
      <header className="max-w-3xl space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
              isLive
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-500'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            {study.status}
          </span>
          <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            {study.kicker}
          </span>
        </div>

        <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
          {study.title}
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          {study.oneLiner}
        </p>

        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="text-secondary-foreground bg-secondary/50 border-secondary/70 rounded-full border px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-1">
          <a
            href={study.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-semibold transition-colors"
          >
            See on GitHub
          </a>
          <Link
            href="/about"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border/50 inline-flex h-11 items-center justify-center rounded-lg border px-6 text-sm font-medium transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </header>

      {/* Stats strip */}
      {study.stats && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {study.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-border/50 flex flex-col gap-1 rounded-xl border p-5"
            >
              <span className="text-foreground text-2xl font-extrabold sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Capabilities */}
      <section className="space-y-6">
        <h2 className="text-foreground text-2xl font-bold sm:text-3xl">
          What it does
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {study.capabilities.map((cap) => (
            <div
              key={cap.title}
              className="border-border/50 space-y-2 rounded-xl border p-6"
            >
              <h3 className="text-foreground text-base font-semibold">
                {cap.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {cap.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Screens */}
      <section className="space-y-10">
        <h2 className="text-foreground text-2xl font-bold sm:text-3xl">
          Product screens
        </h2>

        {study.rows.map((row, index) => (
          <div key={index} className="space-y-6">
            {row.heading && (
              <h3 className="text-foreground text-xl font-semibold">
                {row.heading}
              </h3>
            )}

            {row.layout === 'phones' ? (
              <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 lg:grid-cols-4">
                {row.screens.map((screen) => (
                  <PhoneFrame key={screen.src} screen={screen} />
                ))}
              </div>
            ) : row.layout === 'two-up' ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {row.screens.map((screen) => (
                  <BrowserFrame key={screen.src} screen={screen} />
                ))}
              </div>
            ) : (
              row.screens.map((screen) => (
                <BrowserFrame key={screen.src} screen={screen} />
              ))
            )}
          </div>
        ))}
      </section>

      {/* Origin note */}
      {study.originNote && (
        <div className="border-border/50 bg-secondary/20 rounded-xl border p-6">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {study.originNote}
          </p>
        </div>
      )}
    </div>
  );
}
