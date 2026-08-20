// This is a Server Component by default

import { Metadata } from 'next';
import HeroSection from './components/home/HeroSection';
import FeaturedProjects from './components/home/FeaturedProjects';

// ----------------------------------------------------------------------
// Mock Data (Phase 2) - This would be fetched from lib/data or DB in production
// ----------------------------------------------------------------------
//
//
const mockProjects = [
  {
    slug: 'ezyglobal-ai',
    title: 'Ezyglobal.ai — AI-Powered UAE Business-Setup Platform',
    href: 'https://ezyglobal.ai',
    description:
      'Full-stack platform for UAE company licensing: Next.js frontend, FastAPI backend with Celery/Redis async pipelines, and a private-knowledge RAG layer served by self-hosted Llama 3 on vLLM — deployed with Docker on DigitalOcean.',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'vLLM', 'Llama 3', 'LangChain'],
    status: 'Live in Production',
  },
  {
    slug: 'mama-desk',
    title: 'Mama Desk — Autonomous AI Front Desk Employee',
    href: 'projects/mama-desk',
    description:
      'A domain-agnostic AI front-desk platform, debuting in healthcare with Hope Medical Clinic: natural voice dialogues with sub-400ms latency, dynamic patient intake and symptom triage, live doctor-calendar scheduling, and schema-validated EHR record extraction — built on real-time speech streaming, RAG knowledge retrieval, and multi-agent tool delegation.',
    tags: ['Python', 'Whisper', 'Llama 3.1', 'Kokoro TTS', 'Multi-Agent', 'FastAPI', 'WebSockets'],
    status: 'In Development',
  },
  {
    slug: 'causelist-pro',
    title: 'CauseList Pro — Real-Time Court Case Tracking',
    href: 'projects/causelist-pro',
    description:
      'A cause-list scraper and case-tracking system for Bangladeshi legal advocates: automated daily Supreme Court / High Court scraping, FastAPI backend, instant Firebase push notifications, and a bilingual Flutter app with an AI legal assistant — plus an admin portal for scraper operations, payments, and broadcasts. Built end to end solo.',
    tags: ['Flutter', 'Riverpod', 'FastAPI', 'BeautifulSoup4', 'Firebase'],
    status: 'In Development',
  },
  {
    slug: 'ratio-launcher',
    title: 'Ratio Launcher — Minimalist Android Launcher',
    href: 'https://play.google.com/store/apps/details?id=com.bllocosn',
    description:
      'Core engineer on a system-level Android launcher on the Play Store — music player, calculator, text editor, and home-screen widget tools built with native Kotlin and Jetpack.',
    tags: ['Kotlin', 'Jetpack', 'Room', 'Android'],
    status: 'Live on Play Store',
  },
  {
    slug: 'ai-notes-app',
    title: 'AI-Powered Notes Application',
    href: 'notes',
    description:
      'An intelligent notes app (built into this site) that uses an LLM to summarize your notes for easy organization and retrieval.',
    tags: ['Next.js', 'TypeScript', 'Gemini API', 'Zustand'],
  },
  {
    slug: 'mobile-app-showcase',
    title: 'Mobile App Showcase',
    href: 'https://mahbubmunna.github.io/projects/',
    description:
      'A curated collection of my published and prototype mobile applications — 20+ apps shipped across native Android, Flutter, and React Native over 9 years.',
    tags: ['Flutter', 'Kotlin', 'Jetpack Compose', 'React Native'],
  },
];

// Define Page-Specific Metadata
export const metadata: Metadata = {
  title: 'Mahbub Hassan | AI, Full-Stack & Mobile Engineer',
  description:
    'Portfolio and digital lab of Mahbub Hassan — 9+ years shipping mobile, full-stack, and generative AI products: AI agents, RAG systems, and real-time voice AI on self-hosted models.',
};

export default async function HomePage() {
  // 1. Data fetching happens on the server
  // In a real application, you would fetch data here:
  // const projects = await getFeaturedProjects();

  const projects = mockProjects;

  return (
    <div className="space-y-16 pb-16">
      <HeroSection />

      {/* Pass the server-fetched data to the Client Component */}
      <FeaturedProjects projects={projects} />
    </div>
  );
}
