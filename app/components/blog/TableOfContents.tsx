// components/blog/TableOfContents.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

// Map the HSL primary color variable to a CSS variable for Tailwind compatibility
// This ensures the active highlight respects light/dark mode
const activeLinkStyle =
  'border-l-2 border-primary text-primary transition-colors duration-200';
const baseLinkStyle =
  'border-l-2 border-transparent hover:border-muted-foreground/50 hover:text-foreground/80 transition-colors duration-200';

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // 1. Get all scrollable heading elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set the active ID when a heading enters the viewport
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px', // Trigger activation when heading is near the top
        threshold: 0.2, // Trigger when 20% of the heading is visible
      },
    );

    // 2. Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    // 3. Cleanup observer
    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]); // Re-run effect if headings change

  if (!headings.length) {
    return (
      <p className="text-muted-foreground text-sm">
        No headings found for Table of Contents.
      </p>
    );
  }

  return (
    <nav className="space-y-1">
      {headings.map((heading) => (
        <div key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
          <a
            href={`#${heading.id}`}
            className={`block px-2 py-1 text-sm ${
              activeId === heading.id ? activeLinkStyle : baseLinkStyle
            } ${heading.level === 3 ? 'text-xs font-light' : 'font-medium'}`}
            onClick={(e) => {
              // Smooth scroll on click
              e.preventDefault();
              document
                .getElementById(heading.id)
                ?.scrollIntoView({ behavior: 'smooth' });
              // Update active ID immediately for better UX
              setActiveId(heading.id);
            }}
          >
            {heading.text}
          </a>
        </div>
      ))}
    </nav>
  );
}
