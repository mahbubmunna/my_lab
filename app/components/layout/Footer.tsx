import Link from 'next/link';
import { cn } from '@/lib/utils'; // Assuming you have the cn utility set up

// You can install lucide-react for icons: pnpm install lucide-react
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://github.com/yourusername', icon: Github, label: 'GitHub' },
    {
      href: 'https://linkedin.com/in/yourusername',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: 'https://twitter.com/yourusername',
      icon: Twitter,
      label: 'Twitter',
    },
  ];

  const siteLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
  ];

  return (
    <footer
      className={cn(
        // Base styling for the footer
        'bg-background text-foreground/80 border-t',
        className,
      )}
    >
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col space-y-8 md:flex-row md:items-start md:justify-between md:space-y-0">
          {/* 1. Brand / Slogan Section */}
          <div className="w-full space-y-2 md:w-1/3">
            <Link href="/" className="text-foreground text-xl font-bold">
              Mahbub Hassan
            </Link>
            <p className="text-sm">
              Digital Showcase, Resume, and Full-Stack Lab.
            </p>
          </div>

          {/* 2. Navigation Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">
              Explore
            </h3>
            <ul className="space-y-1">
              {siteLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Social Media Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separator and Copyright */}
        <div className="border-border/50 mt-8 border-t pt-6 text-center">
          <p className="text-xs">
            &copy; {currentYear} Mahbub Hassan. Built with Next.js, Tailwind,
            and <span className="text-primary">passion</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
