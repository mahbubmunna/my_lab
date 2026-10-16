'use client';

import { useTheme } from 'next-themes';
import { Contrast } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="text-foreground hover:text-muted-foreground inline-flex h-11 w-11 items-center justify-center transition-colors"
    >
      <Contrast className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}
