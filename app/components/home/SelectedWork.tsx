'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Container from '../layout/Container';

export interface WorkItem {
  name: string;
  line: string; // one-line summary, always visible
  status: string;
  live: boolean; // shipped and public: filled dot
  description: string;
  facts: { label: string; value: string }[];
  href: string;
  cta: string;
}

export default function SelectedWork({ items }: { items: WorkItem[] }) {
  const [open, setOpen] = useState(0);
  const [hovered, setHovered] = useState(-1);

  return (
    <Container>
      <section id="work" aria-labelledby="work-h" className="scroll-mt-24">
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-8">
          <h2 id="work-h" className="text-foreground m-0 font-mono text-[13px] font-medium tracking-normal">
            Selected work
          </h2>
          <p className="text-muted-foreground m-0 text-[15px]">
            Things I built end to end, and what each one taught me.
          </p>
        </div>

        <ul className="border-b" onMouseLeave={() => setHovered(-1)}>
          {items.map((item, i) => {
            const isOpen = open === i;
            const dimmed = hovered !== -1 && hovered !== i;
            const external = item.href.startsWith('http');
            const panelId = `work-panel-${i}`;
            return (
              <li
                key={item.name}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
                className={cn(
                  '-mx-4 rounded-[4px] border-t px-4 transition-colors duration-300',
                  isOpen && 'bg-brand/[0.035]',
                )}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className={cn(
                      'flex w-full cursor-pointer flex-wrap items-center gap-x-6 gap-y-2 py-7 text-left transition-colors duration-300',
                      dimmed ? 'text-subtle' : 'text-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'hidden w-10 font-mono text-[13px] font-normal tracking-normal sm:inline',
                        dimmed ? 'text-subtle' : 'text-muted-foreground',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex min-w-0 flex-[1_1_280px] flex-col gap-2">
                      <span className="text-[clamp(30px,4vw,52px)] leading-[1.05] font-medium tracking-[-0.035em]">
                        {item.name}
                      </span>
                      <span
                        className={cn(
                          'text-base leading-normal font-normal tracking-normal',
                          dimmed ? 'text-subtle' : 'text-muted-foreground',
                        )}
                      >
                        {item.line}
                      </span>
                    </span>
                    <span className="flex basis-full items-center justify-between gap-6 sm:basis-auto">
                    <span
                      className={cn(
                        'inline-flex items-center gap-2.5 font-mono text-[13px] font-normal tracking-normal',
                        dimmed ? 'text-subtle' : 'text-muted-foreground',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-2 w-2 rounded-full border-[1.5px]',
                          item.live ? 'border-brand bg-brand' : 'border-current',
                        )}
                      />
                      {item.status}
                    </span>
                    <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center">
                      {isOpen ? (
                        <Minus className="h-4 w-4" strokeWidth={1.5} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      )}
                    </span>
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  inert={!isOpen}
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-10 pb-12 sm:pl-16">
                      <p className="m-0 max-w-[620px] flex-[999_1_420px] text-lg leading-relaxed text-foreground/80">
                        {item.description}
                      </p>
                      <div className="flex flex-[1_1_260px] flex-col gap-4">
                        <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                          {item.facts.map((fact) => (
                            <div key={fact.label} className="contents">
                              <dt className="text-muted-foreground font-mono text-[13px]">{fact.label}</dt>
                              <dd className="text-foreground m-0">{fact.value}</dd>
                            </div>
                          ))}
                        </dl>
                        {external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-medium underline-offset-4 hover:underline"
                          >
                            {item.cta}
                            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-brand inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-medium underline-offset-4 hover:underline"
                          >
                            {item.cta}
                            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}
