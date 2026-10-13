import Link from 'next/link';
import { Github, Linkedin, Mail, Rss } from 'lucide-react';
import { BOOK_PATH, EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/lib/site';

const socialLinks = [
  { href: LINKEDIN_URL, icon: Linkedin, label: 'LinkedIn' },
  { href: GITHUB_URL, icon: Github, label: 'GitHub' },
  { href: `mailto:${EMAIL}`, icon: Mail, label: 'Email' },
  { href: '/rss.xml', icon: Rss, label: 'RSS feed' },
];

const siteLinks = [
  { name: 'Work', href: '/#work' },
  { name: 'Writing', href: '/blog' },
  { name: 'About', href: '/about' },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-2">
          <Link href="/" className="font-serif text-lg font-semibold">
            Mahbub Hassan
          </Link>
          <p className="text-muted-foreground text-sm">
            Voice agents, AI products, and the apps around them.
          </p>
          <Link
            href={BOOK_PATH}
            className="text-brand inline-block text-sm font-medium hover:underline"
          >
            Book a 30-min call →
          </Link>
        </div>

        <ul className="flex gap-5 text-sm md:flex-col md:gap-2">
          {siteLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground pb-8 text-center text-xs">
        © {new Date().getFullYear()} Mahbub Hassan
      </p>
    </footer>
  );
}
