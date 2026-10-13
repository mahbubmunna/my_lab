import { Metadata } from 'next';
import Image from 'next/image';
import { Clock, Video } from 'lucide-react';
import Scheduler from './Scheduler';
import { CAL_URL, EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book a call',
  description:
    'Book a 30-minute call with Mahbub Hassan about voice agents, private RAG, or the AI product you are building.',
  alternates: { canonical: '/schedule' },
};

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
      <header className="mb-10 flex items-start gap-5">
        <div className="border-border relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-full border sm:block">
          <Image
            src="/mahbub-hassan-square.jpg"
            alt="Mahbub Hassan"
            fill
            className="object-cover"
            sizes="64px"
            priority
          />
        </div>
        <div>
          <h1 className="text-foreground mb-2 text-4xl">Book a 30-min call</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Building a voice agent or an AI product people have to use? Bring
            the problem, no deck needed. Pick a time and you&apos;ll get a
            calendar invite with a video link.
          </p>
          <ul className="text-muted-foreground mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <li className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> 30 minutes
            </li>
            <li className="flex items-center gap-1.5">
              <Video className="h-4 w-4" /> Video call (link in the invite)
            </li>
          </ul>
        </div>
      </header>

      <Scheduler />

      <p className="text-muted-foreground mt-6 text-sm">
        Trouble booking? Use{' '}
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
          Cal.com
        </a>{' '}
        or email{' '}
        <a href={`mailto:${EMAIL}`} className="text-brand hover:underline">
          {EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
