import { Metadata } from 'next';
import ResumeSection from '../components/about/ResumeSection';
import TimelineEntry from '../components/about/TimelineEntry';
import { Dot } from 'lucide-react';
import SkillProgressBar from '../components/about/SkillProgressBar';

// --- MOCK DATA (Updated with Md Mahbub Hassan's details) ---
const experienceData = [
  // ... (Your detailed experience data as provided previously)
  {
    title: 'Technical PM & Fullstack Developer (AI Systems)',
    subtitle: 'Fair Pattern',
    period: 'June 2023 – Present',
    description: [
      'Led fullstack and AI system initiatives, bridging backend logic, frontend design, and intelligent automation.',
      'Integrated OpenAI APIs with FastAPI services for workflow and document automation.',
      'Developed React + Node.js dashboards with AI recommendation modules.',
      'Streamlined deployments with Dockerized microservices and CI/CD.',
      'Mentored developers on implementing AI models and scalable architecture.',
    ],
  },
  {
    title: 'Senior Fullstack Engineer',
    subtitle: 'Bigspace Ring',
    period: '2021 – 2023',
    description: [
      'Developed fintech and blockchain solutions, preparing backend and analytics systems for AI integration.',
      'Designed modular Node.js and React applications.',
      'Improved backend scalability with caching and optimized APIs.',
    ],
  },
  {
    title: 'Software Engineer (Mobile & AI-Assisted Search)',
    subtitle: 'Advanced Apps Bangladesh Limited',
    period: '2019 – 2021',
    description: [
      'Built Flutter and Android apps with robust architecture, focusing on performance and AI-assisted search capabilities.',
    ],
  },
  {
    title: 'Mobile Engineer',
    subtitle: 'Wizdoor Incorporation',
    period: '2017 – 2019',
    description: 'Focused on developing and maintaining mobile applications.',
  },
  {
    title: 'Junior Android Developer',
    subtitle: 'TheCoffeeCoders',
    period: '2016 – 2017',
    description: 'Initial experience in Android development.',
  },
];

const educationData = [
  {
    title: 'BSc in Computer Science & Engineering (CSE)',
    subtitle: 'Daffodil International University',
    period: '2013 — 2016',
    description:
      'CGPA: 3.64. Focused on core programming, algorithms, and software design principles.',
  },
];

// --- MOCK DATA (Updated with Md Mahbub Hassan's details) ---
// Note: SkillProgressBar component needs to be created in components/about/
const skillsData = {
  'Programming Languages': [
    { skill: 'TypeScript', level: 95 },
    { skill: 'Python', level: 90 },
    { skill: 'Dart', level: 85 },
    { skill: 'Java/Kotlin', level: 75 },
  ],
  'AI & ML Tools': [
    { skill: 'OpenAI APIs', level: 90 },
    { skill: 'LangChain', level: 85 },
    { skill: 'RAG Pipelines', level: 80 },
    { skill: 'LoRA / PEFT', level: 70 },
    { skill: 'Prompt Engineering', level: 95 },
  ],
  'Web & Backend': [
    { skill: 'React.js / Next.js', level: 95 },
    { skill: 'FastAPI', level: 90 },
    { skill: 'Node.js / Express.js', level: 85 },
    { skill: 'Tailwind CSS', level: 98 },
    { skill: 'Redux / Zustand', level: 80 },
  ],
  'Mobile & Architecture': [
    { skill: 'Flutter', level: 85 },
    { skill: 'React Native', level: 75 },
    { skill: 'Microservices', level: 90 },
    { skill: 'Docker / CI/CD', level: 85 },
    { skill: 'PostgreSQL / MongoDB', level: 80 },
  ],
};

const aiExperienceData = [
  'Built and deployed intelligent agents using **LangChain and OpenAI APIs** for automation and customer interaction.',
  'Integrated **GPT-based assistants** into Flutter and React apps for user support and smart recommendations.',
  'Developed microservices using **FastAPI** to handle AI inference and data workflows.',
  'Designed **RAG pipelines** with vector databases for contextual document retrieval.',
  'Experimented with **fine-tuning (LoRA, PEFT)** to improve domain-specific model accuracy.',
];

// --- METADATA ---
export const metadata: Metadata = {
  title: 'Resume | Md Mahbub Hassan - AI Engineer',
  description:
    'Official resume for Md Mahbub Hassan, an AI Engineer and Senior Fullstack Developer specializing in LLMs, LangChain, Next.js, and scalable architecture.',
  keywords: [
    'AI Engineer',
    'Md Mahbub Hassan',
    'Senior Full-Stack',
    'Next.js',
    'LangChain',
    'Mobile Developer',
  ],
};

/**
 * The main component for the About/Resume page (Server Component).
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto space-y-12 px-4 py-12">
      {/* 1. Header and Contact */}
      <header className="border-border/50 border-b py-4">
        <h1 className="text-foreground mb-1 text-4xl font-extrabold tracking-tight">
          Md Mahbub Hassan
        </h1>
        <p className="text-primary mb-3 text-xl font-semibold">
          AI Engineer | Senior Fullstack & Mobile Developer
        </p>
        <p className="text-muted-foreground max-w-4xl leading-relaxed">
          AI Engineer with 9+ years of software development experience, merging
          expertise in fullstack and mobile engineering with practical AI
          implementation. Specialized in integrating large language models
          (LLMs), building LangChain pipelines, and developing AI-enhanced
          systems using FastAPI, Node.js, and React. Proven ability to architect
          scalable solutions and lead teams to deliver intelligent, data-driven
          products.
        </p>
        <div className="text-foreground/80 mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium">
          <span>Mobile: +8801521214964</span>
          <span>Email: moonss.dev@gmail.com</span>
          <a
            href="https://github.com/mahbubmunna"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub: github.com/mahbubmunna
          </a>
        </div>
      </header>

      {/* 3. Skills Section - Skill Progress Bars */}
      <ResumeSection title="Core Skills & Expertise">
        <div className="space-y-8">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-foreground border-border/50 mb-3 border-b pb-1 text-xl font-bold">
                {category}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skills.map((skillItem) => (
                  <SkillProgressBar
                    key={skillItem.skill}
                    skill={skillItem.skill}
                    level={skillItem.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ResumeSection>

      {/* 2. AI Experience Section */}
      <ResumeSection title="AI Experience">
        <ul className="text-muted-foreground list-none space-y-2 text-base">
          {aiExperienceData.map((line, index) => (
            <li key={index} className="flex items-start">
              <Dot className="text-primary/50 mt-0.5 h-6 w-6 flex-shrink-0" />
              {/* Using dangerouslySetInnerHTML because we used bold tags in mock data */}
              <span
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: line }}
              ></span>
            </li>
          ))}
        </ul>
      </ResumeSection>

      {/* 3. Experience Section */}
      <ResumeSection title="Professional Experience">
        {experienceData.map((entry, index) => (
          <TimelineEntry key={index} {...entry} />
        ))}
      </ResumeSection>

      {/* 5. Education Section */}
      <ResumeSection title="Education">
        {educationData.map((entry, index) => (
          <TimelineEntry
            key={index}
            {...entry}
            description={entry.description}
          />
        ))}
      </ResumeSection>
    </div>
  );
}
