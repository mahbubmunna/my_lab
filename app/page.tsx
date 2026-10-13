import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroSection from './components/home/HeroSection';
import FeaturedProjects from './components/home/FeaturedProjects';
import type { ProjectCardProps } from './components/ui/ProjectCard';
import { getSortedPostsData } from '@/lib/blog';
import { BOOK_PATH } from '@/lib/site';

const projects: ProjectCardProps[] = [
  {
    slug: 'ezyglobal-ai',
    title: 'ezyglobal.ai',
    status: 'Built and deployed',
    href: 'https://ezyglobal.ai',
    ctaLabel: 'Visit ezyglobal.ai',
    description:
      'A business-setup platform for corporate service providers in the UAE. Nora, a voice guide, walks customers through each step, an AI data room is built to cut manual document review, and a self-hosted Llama 3 model keeps every document on our own servers. I built most of it alone in about six months.',
    tags: ['FastAPI', 'Next.js', 'vLLM', 'Llama 3', 'Kokoro TTS', 'Celery', 'PostgreSQL'],
  },
  {
    slug: 'mama-desk',
    title: 'Mama Desk',
    status: 'In development',
    href: '/projects/mama-desk',
    description:
      'A front-desk voice agent for clinics that runs fully on local models. It answers in about a second, books real calendar slots, flags urgent cases for staff, and turns each call into a structured record.',
    tags: ['Whisper', 'Llama 3.1', 'Kokoro TTS', 'Multi-agent', 'WebSockets'],
  },
  {
    slug: 'causelist-pro',
    title: 'CauseList Pro',
    status: 'In development',
    href: '/projects/causelist-pro',
    description:
      'Court case tracking for lawyers in Bangladesh. It scrapes the daily cause lists, sends a push alert when a tracked case is listed, and answers law questions with citations in Bangla and English. Built solo, app and admin portal.',
    tags: ['Flutter', 'FastAPI', 'Scraping', 'Firebase', 'RAG'],
  },
  {
    slug: 'ratio-launcher',
    title: 'Ratio Launcher',
    status: 'Live on Google Play · 1M+ downloads',
    href: 'https://play.google.com/store/apps/details?id=com.bllocosn',
    ctaLabel: 'See it on Google Play',
    description:
      'A minimalist, grayscale Android launcher built for less distraction. I worked on it as a core engineer in native Kotlin, where a cross-platform framework would have limited what the OS lets you do.',
    tags: ['Kotlin', 'Jetpack', 'Room', 'Android'],
  },
];

// Shown until the first long-form articles are published.
const upcoming = [
  'Where 1.2 seconds go in a local voice agent',
  'Teaching a voice agent when you have stopped talking',
  'Keeping documents off third-party AI: self-hosting Llama 3 on vLLM',
];

export default function HomePage() {
  const posts = getSortedPostsData().slice(0, 3);

  return (
    <div className="pb-16">
      <HeroSection />
      <FeaturedProjects projects={projects} />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-foreground text-3xl">Writing</h2>
          <Link href="/blog" className="text-brand text-sm font-medium hover:underline">
            All writing →
          </Link>
        </div>
        {posts.length > 0 ? (
          <ul className="divide-border divide-y">
            {posts.map((post) => (
              <li key={post.slug} className="py-4">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h3 className="text-foreground group-hover:text-brand text-xl transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">{post.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted-foreground max-w-2xl space-y-4">
            <p>
              Long-form notes on things that broke in production and how I
              fixed them. The first ones are being written now:
            </p>
            <ul className="space-y-2">
              {upcoming.map((title) => (
                <li key={title} className="text-foreground font-serif text-lg">
                  {title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="bg-muted rounded-2xl px-6 py-10 md:px-10">
          <h2 className="text-foreground text-2xl md:text-3xl">
            Building a voice agent or an AI product people have to use?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            I&apos;m happy to talk it through. Thirty minutes, bring the problem,
            no deck needed.
          </p>
          <Link
            href={BOOK_PATH}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-11 items-center gap-1.5 rounded-lg px-6 font-medium transition-colors"
          >
            Book a 30-min call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
