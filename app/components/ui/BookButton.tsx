import Link from 'next/link';

// Primary call to action: ink pill with the accent dot.
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
      className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-[52px] items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors"
    >
      <span aria-hidden="true" className="bg-brand-on-primary h-2 w-2 rounded-full" />
      {label}
    </Link>
  );
}
