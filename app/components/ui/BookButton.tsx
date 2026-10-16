import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

// Primary call to action: ink pill with a calendar icon.
export default function BookButton({
  href,
  label = 'Book a 30-min call',
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-[52px] items-center gap-2.5 rounded-full px-6 text-[15px] font-medium transition-colors"
    >
      <CalendarDays aria-hidden="true" className="text-brand-on-primary h-4 w-4" strokeWidth={1.75} />
      {label}
    </Link>
  );
}
