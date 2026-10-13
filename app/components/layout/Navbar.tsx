import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';
import { BOOK_PATH } from '@/lib/site';

const navLinks = [
  { name: 'Work', href: '/#work' },
  { name: 'Writing', href: '/blog' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  return (
    <header className="bg-background/90 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-serif text-base font-semibold whitespace-nowrap sm:text-lg">
          Mahbub Hassan
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={BOOK_PATH}
            className="bg-primary text-primary-foreground hover:bg-primary/90 hidden h-8 items-center rounded-md px-3 text-sm font-medium transition-colors sm:inline-flex"
          >
            Book a call
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
