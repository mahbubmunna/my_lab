import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroSection from './components/home/HeroSection';
import SelectedWork, { type WorkItem } from './components/home/SelectedWork';
import Container from './components/layout/Container';
import BookButton from './components/ui/BookButton';
import { getSortedPostsData } from '@/lib/blog';
import { BOOK_PATH } from '@/lib/site';

const work: WorkItem[] = [
  {
    name: 'ezyglobal.ai',
    line: 'Voice guide and private document AI for UAE business setup',
    status: 'Built and deployed',
    live: true,
    description:
      'A business-setup platform for corporate service providers in the UAE. A voice guide named Nora walks customers through each step, an AI data room is built to cut manual document review, and a private model on our own servers keeps every document in-house.',
    facts: [
      { label: 'Role', value: 'Mostly solo' },
      { label: 'Built in', value: '~6 months' },
      { label: 'Inside', value: 'Voice guide, data room, private model' },
    ],
    href: 'https://ezyglobal.ai',
    cta: 'Visit ezyglobal.ai',
  },
  {
    name: 'Mama Desk',
    line: 'A clinic front desk that talks, on fully local models',
    status: 'In development',
    live: false,
    description:
      'A front-desk voice agent for clinics that runs fully on local models. It answers in about a second, books real calendar slots, flags urgent cases for staff, and turns each call into a structured record.',
    facts: [
      { label: 'Response', value: '~1 second' },
      { label: 'Runs on', value: 'Local models' },
    ],
    href: '/projects/mama-desk',
    cta: 'Read the case study',
  },
  {
    name: 'CauseList Pro',
    line: 'Court case alerts and cited law answers for lawyers in Bangladesh',
    status: 'In development',
    live: false,
    description:
      'Court case tracking for lawyers in Bangladesh. It reads the daily cause lists, sends a push alert when a tracked case is listed, and answers law questions with citations in Bangla and English.',
    facts: [
      { label: 'Role', value: 'Built solo, app and admin portal' },
      { label: 'Languages', value: 'Bangla, English' },
    ],
    href: '/projects/causelist-pro',
    cta: 'Read the case study',
  },
  {
    name: 'Ratio Launcher',
    line: 'A grayscale Android launcher built for less distraction',
    status: 'Google Play · 1M+',
    live: true,
    description:
      'A minimalist, grayscale Android launcher built for less distraction. I owned the widgets section, including a music player with custom-drawn graphics and a notepad.',
    facts: [
      { label: 'Downloads', value: '1M+' },
      { label: 'Role', value: 'Owned the widgets section' },
    ],
    href: 'https://play.google.com/store/apps/details?id=com.bllocosn',
    cta: 'See it on Google Play',
  },
];

export default function HomePage() {
  const [latest, ...older] = getSortedPostsData().slice(0, 4);

  return (
    <>
      <HeroSection />
      <SelectedWork items={work} />

      <Container>
        <section
          id="writing"
          aria-labelledby="writing-h"
          className="flex flex-col gap-8 pt-[clamp(96px,12vw,160px)]"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="writing-h" className="text-foreground m-0 font-mono text-[13px] font-medium tracking-normal">
              Writing
            </h2>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center gap-1.5 text-[15px] transition-colors"
            >
              All writing
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          {latest && (
            <Link href={`/blog/${latest.slug}`} className="group text-foreground flex flex-col gap-6 border-t pt-8">
              <span className="max-w-[18ch] text-[clamp(28px,3.6vw,44px)] leading-[1.1] font-medium tracking-[-0.03em] transition-colors group-hover:text-muted-foreground">
                {latest.title}
              </span>
              <span className="text-muted-foreground max-w-[560px] text-[17px] leading-relaxed">
                {latest.summary}
              </span>
              {latest.meter && (
                <span aria-hidden="true" className="flex max-w-[560px] flex-col gap-2.5">
                  <span className="bg-brand block h-0.5" />
                  <span className="text-muted-foreground flex justify-between font-mono text-xs">
                    <span>0 s</span>
                    <span>{latest.meter}</span>
                  </span>
                </span>
              )}
            </Link>
          )}

          {older.length > 0 && (
            <ul className="border-b">
              {older.map((post) => (
                <li key={post.slug} className="border-t">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-foreground hover:text-muted-foreground block py-5 text-xl font-medium tracking-[-0.02em] transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          aria-labelledby="book-h"
          className="flex flex-col gap-8 py-[clamp(120px,14vw,200px)]"
        >
          <h2
            id="book-h"
            className="text-foreground m-0 max-w-[16ch] text-[clamp(36px,5.2vw,72px)] leading-[1.02] font-medium tracking-[-0.04em]"
          >
            Building a voice agent or an AI product{' '}
            <span className="text-subtle">people have to use?</span>
          </h2>
          <p className="text-muted-foreground m-0 max-w-[460px] text-lg leading-relaxed">
            I&apos;m happy to talk it through. Thirty minutes, bring the problem,
            no deck needed.
          </p>
          <div>
            <BookButton href={BOOK_PATH} />
          </div>
        </section>
      </Container>
    </>
  );
}
