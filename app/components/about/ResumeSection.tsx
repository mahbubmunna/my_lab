import React from 'react';
import { cn } from '@/lib/utils';

interface ResumeSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

/**
 * A reusable component to structure major sections of the resume page.
 * @param title - The title of the section (e.g., "Experience", "Skills").
 * @param children - The content of the section.
 */
export default function ResumeSection({
  title,
  children,
  className,
  ...props
}: ResumeSectionProps) {
  return (
    <section
      className={cn('border-border border-b py-8 last:border-b-0', className)}
      {...props}
    >
      <h2 className="text-primary mb-6 text-3xl font-extrabold tracking-tight md:mb-8">
        {title}
      </h2>
      <div className="space-y-6 md:space-y-8">{children}</div>
    </section>
  );
}
