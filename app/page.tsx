// This is a Server Component by default

import { Metadata } from 'next';
import HeroSection from './components/home/HeroSection';
import FeaturedProjects from './components/home/FeaturedProjects';

// ----------------------------------------------------------------------
// Mock Data (Phase 2) - This would be fetched from lib/data or DB in production
// ----------------------------------------------------------------------
const mockProjects = [
  {
    slug: 'ecommerce-demo',
    title: 'E-commerce Platform Demo',
    href: 'ecommerce',
    description:
      'A full-featured e-commerce platform with product listings, a shopping cart, and a secure checkout process.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    slug: 'ai-notes-app',
    title: 'AI-Powered Notes Application',
    href: 'notes',
    description:
      'An intelligent notes app that uses AI to automatically summarize and tag your notes for easy organization and retrieval.',
    tags: ['Python', 'Flask', 'TensorFlow', 'OpenAI API'],
  },
  {
    slug: 'project-tool',
    title: 'Agile Project Management Tool',
    href: 'project-tool',
    description:
      'A collaborative tool for task management and team coordination, designed with agile principles in mind.',
    tags: ['Vue.js', 'Firebase', 'GraphQL', 'dnd-kit'],
  },
];

// Define Page-Specific Metadata
export const metadata: Metadata = {
  title: 'Mahbub Hassan | Full-Stack Developer Showcase',
  description:
    'The portfolio and digital lab for Mahbub Hassan, specializing in modern web development and advanced Next.js projects.',
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
