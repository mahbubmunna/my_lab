import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { BOOK_PATH } from '@/lib/site';
import Container from '../layout/Container';
import BookButton from '../ui/BookButton';

const facts = [
  'Technical Lead at FairPattern',
  'AI and backend since 2024',
  'Shipping apps since 2016',
  'Working remotely',
];

export default function HeroSection() {
  return (
    <Container>
      <section className="flex flex-wrap items-end gap-x-[clamp(40px,6vw,88px)] gap-y-14 pt-[clamp(40px,7vw,104px)] pb-[clamp(96px,12vw,160px)]">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-10">
          <h1 className="text-foreground m-0 max-w-[13ch] text-[clamp(44px,6.6vw,96px)] leading-[0.98] font-medium tracking-[-0.045em]">
            I build voice agents,{' '}
            <span className="text-subtle">and the products around them.</span>
          </h1>
          <p className="text-muted-foreground m-0 max-w-[520px] text-lg leading-relaxed">
            <span className="text-foreground">The model is rarely what breaks.</span>{' '}
            It&apos;s the voice that talks over you, the documents that can&apos;t
            leave the building, the app nobody finished. That&apos;s the part
            I&apos;ve worked on for the past 2+ years, from the backend to the
            screen people actually touch.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <BookButton href={BOOK_PATH} />
            <Link
              href="/#work"
              className="text-foreground hover:text-muted-foreground inline-flex h-[52px] items-center gap-2 px-5 text-[15px] font-medium transition-colors"
            >
              See my work
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <figure className="group m-0 flex max-w-[260px] flex-[1_1_240px] flex-col gap-4 sm:max-w-[380px] sm:flex-[1_1_280px]">
          <div className="bg-muted relative aspect-[4/5] w-full overflow-hidden rounded-[4px]">
            <Image
              src="/mahbub-hassan.jpg"
              alt="Portrait of Mahbub Hassan"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 380px"
              className="object-cover contrast-[1.04] grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
            />
          </div>
          <figcaption className="flex flex-col gap-3.5">
            <span className="flex flex-col text-[22px] leading-tight font-medium tracking-[-0.02em]">
              <span className="text-foreground">Mahbub Hassan</span>
              <span className="text-subtle">AI Product Engineer</span>
            </span>
            <span className="text-muted-foreground flex flex-col gap-0.5 font-mono text-[13px] leading-relaxed">
              {facts.map((fact) => (
                <span key={fact}>{fact}</span>
              ))}
            </span>
          </figcaption>
        </figure>
      </section>
    </Container>
  );
}
