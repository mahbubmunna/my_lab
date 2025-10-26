'use client';

import React from 'react';
import { cn } from '@/lib/utils';
interface SkillProgressBarProps {
  skill: string;
  level: number; // 0-100
  category?: string; // Optional category to help group skills
}

/**
 * A client component that renders a single skill with a visual progress bar.
 */
export default function SkillProgressBar({
  skill,
  level,
}: SkillProgressBarProps) {
  // Ensure level is within 0-100 bounds
  const clampedLevel = Math.max(0, Math.min(100, level));

  return (
    <div className="bg-card border-border hover:bg-muted/50 flex flex-col gap-2 rounded-lg border p-3 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-foreground text-sm font-medium">{skill}</span>
        <span className="text-muted-foreground text-xs">{clampedLevel}%</span>
      </div>
      <div className="bg-muted h-2 w-full rounded-full">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            // Dynamically set background color based on level or theme
            'bg-primary', // Use primary theme color
          )}
          style={{ width: `${clampedLevel}%` }}
        ></div>
      </div>
    </div>
  );
}
