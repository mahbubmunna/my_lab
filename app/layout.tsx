import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from './components/layout/ThemeProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { SITE_URL } from '@/lib/site';

const sans = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});
const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mahbub Hassan | I build voice agents and the products around them',
    template: '%s | Mahbub Hassan',
  },
  description:
    'AI product engineer building voice agents, private RAG, and the web and mobile apps around them. Case studies and long-form notes on what broke in production and how I fixed it.',
  keywords: [
    'Mahbub Hassan',
    'AI engineer',
    'voice agents',
    'voice AI',
    'RAG',
    'self-hosted LLM',
    'Flutter',
    'React Native',
  ],
  alternates: {
    types: { 'application/rss+xml': `${SITE_URL}/rss.xml` },
  },
  openGraph: {
    title: 'Mahbub Hassan',
    description: 'I build voice agents and the products around them.',
    url: SITE_URL,
    siteName: 'Mahbub Hassan',
    images: [{ url: '/mahbub-hassan-square.jpg', width: 512, height: 512 }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-[calc(100vh-10rem)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
