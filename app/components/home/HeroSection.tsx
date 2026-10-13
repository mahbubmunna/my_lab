import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BOOK_PATH } from '@/lib/site';

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-14 pb-10 md:pt-24 md:pb-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
        <div className="order-2 space-y-6 md:order-1">
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            AI engineer · Dhaka, working remotely
          </p>

          <h1 className="text-foreground text-4xl leading-[1.1] sm:text-5xl">
            I build voice agents, and the products around them.
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            The model is rarely what breaks. It&apos;s the voice that talks
            over you, the documents that can&apos;t leave the building, the app
            nobody finished. That&apos;s the part I work on, from the backend
            to the screen people actually touch.
          </p>

          <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
            Before AI, I spent 9+ years shipping 20+ mobile and web apps in
            Flutter, Android, and React Native. One of them has over a million
            downloads.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              href={BOOK_PATH}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center gap-1.5 rounded-lg px-6 text-base font-medium transition-colors"
            >
              Book a 30-min call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#work"
              className="hover:bg-secondary border-border inline-flex h-11 items-center justify-center rounded-lg border px-6 text-base font-medium transition-colors"
            >
              See my work
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="border-border relative aspect-[4/5] w-40 overflow-hidden rounded-2xl border shadow-sm sm:w-48 md:w-64">
            <Image
              src="/mahbub-hassan.jpg"
              alt="Mahbub Hassan"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
