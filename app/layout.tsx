import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from './components/layout/ThemeProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mahbub Hassan | Digital Showcase & Portfolio',
  description:
    'Full-stack developer portfolio, blog, and lab for advanced Next.js projects.',
  keywords: ['Next.js', 'React', 'Full-stack', 'Portfolio', 'Mahbub Hassan'],
  openGraph: {
    title: "Mahbub Hassan's Portfolio",
    description: 'The official digital showcase.',
    url: 'https://yourwebsite.com',
    siteName: 'Mahbub Hassan | Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  // Add other tags like twitter, icons, etc.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider must wrap the entire body to enable dark mode switching
          via the 'class' attribute.
        */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {/* The main content area. min-h-[calc(100vh-10rem)] is used to ensure
            the footer stays at the bottom on short pages.
          */}
          <main className="min-h-[calc(100vh-10rem)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
