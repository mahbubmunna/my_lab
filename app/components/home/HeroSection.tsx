import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { BOOK_PATH } from '@/lib/site';
import Container from '../layout/Container';
import BookButton from '../ui/BookButton';

export default function HeroSection() {
  return (
    <Container>
      <section className="flex flex-wrap items-end gap-x-[clamp(40px,6vw,88px)] gap-y-14 pt-[clamp(16px,3vw,48px)] pb-[clamp(72px,11vw,144px)]">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-10">
          <h1 className="text-foreground m-0 max-w-[13ch] text-[clamp(48px,7vw,104px)] leading-[0.98] font-medium tracking-[-0.045em]">
            I build voice&nbsp;agents,{' '}
            <span className="text-subtle">and the AI products around them.</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <BookButton href={BOOK_PATH} />
            <Link
              href="/#work"
              className="text-foreground hover:text-muted-foreground inline-flex h-[52px] items-center gap-2 px-3 text-[15px] font-medium transition-colors sm:px-5"
            >
              See my work
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="flex items-center gap-4 border-t pt-6 sm:hidden">
            <div className="bg-muted relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[4px]">
              <Image
                src="/mahbub-hassan-square.jpg"
                alt="Portrait of Mahbub Hassan"
                fill
                sizes="72px"
                className="object-cover grayscale"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="m-0 flex flex-col text-[17px] leading-tight font-medium tracking-[-0.02em]">
                <span className="text-foreground">Mahbub Hassan</span>
                <span className="text-muted-foreground">AI Product Engineer</span>
              </p>
              <p className="text-muted-foreground m-0 font-mono text-xs leading-relaxed">
                Technical Lead @ FairPattern (US)&nbsp;·&nbsp;Remote
              </p>
            </div>
          </div>
        </div>

        <figure className="group m-0 hidden max-w-[340px] flex-[1_1_280px] flex-col gap-4 sm:flex">
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
            <span className="text-muted-foreground font-mono text-[13px] leading-relaxed">
              Technical Lead @ FairPattern (US)&nbsp;·&nbsp;Remote
            </span>
          </figcaption>
        </figure>
      </section>
    </Container>
  );
}
