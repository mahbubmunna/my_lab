import { Metadata } from 'next';
import { Dot } from 'lucide-react';
import ResumeSection from '../components/about/ResumeSection';
import TimelineEntry from '../components/about/TimelineEntry';

// --- MOCK DATA ---
const experienceData = [
  {
    title: 'Senior Full-Stack Developer',
    subtitle: 'Innovatech Solutions',
    period: '2022 — Present',
    description: [
      'Led the migration of a monolithic API to a serverless microservices architecture, improving latency by 40%.',
      'Developed and maintained 3 high-traffic Next.js applications, utilizing Server Components and Server Actions for data fetching.',
      'Mentored junior developers on best practices in React hooks, state management (Zustand), and performance optimization.',
    ],
  },
  {
    title: 'Front-End Engineer',
    subtitle: 'Growth Metrics',
    period: '2019 — 2022',
    description: [
      'Built a reusable design system using Tailwind CSS and CVA, reducing component development time by 30%.',
      'Implemented real-time data visualization dashboards using D3.js and React, handling large datasets efficiently.',
    ],
  },
];

const educationData = [
  {
    title: 'M.S. in Computer Science',
    subtitle: 'University of Engineering & Technology, Dhaka',
    period: '2017 — 2019',
    description: 'Specialization in Distributed Systems and Cloud Computing.',
  },
  {
    title: 'B.S. in Software Engineering',
    subtitle: 'Dhaka University',
    period: '2013 — 2017',
    description:
      'Graduated with Honors. Focused on object-oriented programming and database design.',
  },
];

const skillsData = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Go'],
  Frameworks: ['Next.js', 'React', 'Node.js/Express', 'NestJS', 'Tailwind CSS'],
  Databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
  Tools: [
    'Docker',
    'Kubernetes',
    'AWS',
    'Vercel',
    'Git/GitHub',
    'Zustand',
    'React Query',
  ],
};

// --- METADATA ---
export const metadata: Metadata = {
  title: 'Resume | Mahbub Hassan',
  description:
    'Professional portfolio and resume for Mahbub Hassan, a Full-Stack Developer specializing in modern web applications (Next.js, TypeScript).',
  keywords: ['Resume', 'Mahbub Hassan', 'Developer', 'Full-Stack', 'Next.js'],
};

/**
 * The main component for the About/Resume page (Server Component).
 * It fetches (or loads) all static resume data and renders the structure.
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto space-y-12 px-4 py-12">
      {/* 1. Introduction & Professional Summary */}
      <header className="py-4 text-center md:text-left">
        <h1 className="text-foreground mb-2 text-4xl font-extrabold tracking-tight">
          Mahbub Hassan
        </h1>
        <p className="text-primary mb-4 text-xl font-semibold">
          Senior Full-Stack Developer | Next.js & Cloud Architecture Specialist
        </p>
        <p className="text-muted-foreground mx-auto max-w-4xl leading-relaxed md:mx-0">
          I am a passionate developer with over 5 years of experience building
          and scaling robust, user-centric digital products. I specialize in the
          modern web stack (Next.js, TypeScript) and cloud-native services,
          focusing on performance, maintainability, and elegant user experience.
        </p>
      </header>

      {/* 2. Experience Section */}
      <ResumeSection title="Professional Experience">
        {experienceData.map((entry, index) => (
          <TimelineEntry key={index} {...entry} />
        ))}
      </ResumeSection>

      {/* 3. Education Section */}
      <ResumeSection title="Education">
        {educationData.map((entry, index) => (
          <TimelineEntry key={index} {...entry} />
        ))}
      </ResumeSection>

      {/* 4. Skills Section */}
      <ResumeSection
        title="Technical Skills"
        className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-foreground/90 border-border mb-2 border-b pb-1 text-lg font-semibold">
              {category}
            </h3>
            <ul className="list-none space-y-1">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="text-muted-foreground flex items-center text-sm"
                >
                  <Dot className="text-primary/50 h-5 w-5 flex-shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ResumeSection>
    </div>
  );
}
