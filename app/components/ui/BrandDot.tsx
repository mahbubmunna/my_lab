import { cn } from '@/lib/utils';

// The small accent dot: the site's only use of colour besides links.
export default function BrandDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('bg-brand inline-block h-2 w-2 shrink-0 rounded-full', className)}
    />
  );
}
