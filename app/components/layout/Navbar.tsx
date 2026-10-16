import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';
import Image from 'next/image';
import Container from './Container';

const navLinks = [
  { name: 'Work', href: '/#work' },
  { name: 'Writing', href: '/blog' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  return (
    <header className="bg-background/85 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-50 w-full backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between gap-3 md:h-[88px]">
        <Link
          href="/"
          aria-label="Mahbub Hassan, home"
          className="group text-foreground inline-flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap"
        >
          <span className="bg-muted relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/mahbub-hassan-square.jpg"
              alt=""
              fill
              sizes="32px"
              className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
            />
          </span>
          <span className="hidden min-[420px]:inline">Mahbub Hassan</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground px-2 py-3 text-[15px] transition-colors sm:px-3"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
