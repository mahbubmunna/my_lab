import Link from 'next/link';
import { BOOK_PATH, EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/lib/site';
import Container from './Container';

const siteLinks = [
  { name: 'Book a 30-min call', href: BOOK_PATH },
  { name: 'Work', href: '/#work' },
  { name: 'Writing', href: '/blog' },
  { name: 'About', href: '/about' },
];

const elsewhere = [
  { name: 'linkedin.com/in/munnacs', href: LINKEDIN_URL },
  { name: 'github.com/mahbubmunna', href: GITHUB_URL },
  { name: EMAIL, href: `mailto:${EMAIL}` },
  { name: '/rss.xml', href: '/rss.xml' },
];

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="flex flex-wrap justify-between gap-8 border-t pt-10 pb-14">
          <div className="flex max-w-sm flex-col gap-2 text-[15px]">
            <p className="text-foreground font-medium">
              Mahbub Hassan <span className="text-muted-foreground">· AI Product Engineer</span>
            </p>
            <p className="text-muted-foreground">
              Voice agents, AI products, and the apps around them.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <ul className="flex flex-col gap-1 text-[15px]">
              {siteLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-muted-foreground inline-block py-1 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-1 font-mono text-[13px]">
              {elsewhere.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground inline-block py-[5px] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="text-muted-foreground py-[5px]">© {new Date().getFullYear()} Mahbub Hassan</li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
