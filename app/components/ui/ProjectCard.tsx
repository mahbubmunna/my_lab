// components/ui/ProjectCard.tsx (Updated)

import Link from 'next/link';
import React from 'react';

interface ProjectCardProps {
  slug: string;
  href: string; // This can be '/notes' or 'https://external.app'
  title: string;
  description: string;
  tags: string[];
}

export default function ProjectCard({
  href,
  title,
  description,
  tags,
}: ProjectCardProps) {
  // Determine if the link is external
  const isExternal = href.startsWith('http');

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
      <h3 className="text-foreground mb-2 text-xl font-semibold">{title}</h3>
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
