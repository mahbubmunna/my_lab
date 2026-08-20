// components/ui/ProjectCard.tsx (Updated)

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface ProjectImage {
  src: string;
  alt: string;
  portrait?: boolean; // mobile screenshots render in a phone frame
  label?: string; // shown in the browser-chrome title bar (desktop shots)
}

interface ProjectCardProps {
  slug: string;
  href: string; // This can be '/notes' or 'https://external.app'
  title: string;
  description: string;
  tags: string[];
  images?: ProjectImage[];
  status?: string; // e.g. 'Live in Production', 'In Development'
}

/** Desktop screenshot wrapped in minimal browser chrome. */
function BrowserFrame({ image }: { image: ProjectImage }) {
  return (
    <div className="border-border/60 bg-secondary/40 flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-lg border shadow-md">
      <div className="border-border/60 bg-secondary/70 flex flex-none items-center gap-1.5 border-b px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
        <span className="h-2 w-2 rounded-full bg-green-400/80" />
        {image.label && (
          <span className="text-muted-foreground ml-2 truncate font-mono text-[10px] tracking-wide">
            {image.label}
          </span>
        )}
      </div>
      <div className="relative flex-1">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 60vw, 33vw"
        />
      </div>
    </div>
  );
}

/** Mobile screenshot wrapped in a phone frame. */
function PhoneFrame({ image }: { image: ProjectImage }) {
  return (
    <div className="h-full w-24 flex-none sm:w-36">
      <div className="border-border/70 bg-secondary/40 relative h-full overflow-hidden rounded-[1.4rem] border-[3px] shadow-md">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 30vw, 12vw"
        />
        {/* speaker notch */}
        <div className="bg-border/80 absolute top-1.5 left-1/2 z-10 h-1 w-8 -translate-x-1/2 rounded-full" />
      </div>
    </div>
  );
}

export default function ProjectCard({
  href,
  title,
  description,
  tags,
  images,
  status,
}: ProjectCardProps) {
  // Determine if the link is external
  const isExternal = href.startsWith('http');

  const isLive = status?.toLowerCase().includes('live');

  // Define the common styling for the View Demo button
  const buttonClasses =
    'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors';

  // Define the View Demo Element (Link or Anchor tag)
  const ViewDemoElement = isExternal ? (
    <a
      href={href}
      target="_blank" // Open external link in a new tab
      rel="noopener noreferrer"
      className={buttonClasses}
    >
      View Demo
    </a>
  ) : (
    <Link
      href={`/${href}`} // Use internal Link component for app routes
      className={buttonClasses}
    >
      View Demo
    </Link>
  );

  return (
    <div className="border-border/50 bg-card hover:border-primary/50 rounded-xl border p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
      {/* Product screenshots */}
      {images && images.length > 0 && (
        <div className="bg-secondary/20 border-border/40 mb-6 rounded-xl border p-3">
          <div className="flex h-48 gap-3 sm:h-64">
            {images.map((image) =>
              image.portrait ? (
                <PhoneFrame key={image.src} image={image} />
              ) : (
                <BrowserFrame key={image.src} image={image} />
              ),
            )}
          </div>
        </div>
      )}

      <div className="mb-2 flex flex-wrap items-center gap-3">
        <h3 className="text-foreground text-xl font-semibold">{title}</h3>
        {status && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
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
            {status}
          </span>
        )}
      </div>
      <p className="text-muted-foreground mb-4 text-sm">{description}</p>

      {/* Tags Section (Unchanged) */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-secondary-foreground bg-secondary/50 border-secondary/70 rounded-full border px-3 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {/* The dynamic View Demo element */}
        {ViewDemoElement}

        <a
          href="https://github.com/mahbubmunna" // Updated GitHub link for consistency
          target="_blank"
          rel="noopener noreferrer"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border/50 inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          See on GitHub
        </a>
      </div>
    </div>
  );
}
