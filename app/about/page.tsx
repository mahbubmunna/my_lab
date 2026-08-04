import { Metadata } from 'next';
import ResumeSection from '../components/about/ResumeSection';
import TimelineEntry from '../components/about/TimelineEntry';
import { Dot } from 'lucide-react';
import SkillProgressBar from '../components/about/SkillProgressBar';

const experienceData = [
  {
    title: 'Technical Lead',
    subtitle: 'FairPattern — New York, USA (Remote)',
    period: 'Jun 2023 – Present',
    description: [
      'Own full-stack and AI delivery on ezyglobal.ai: FastAPI services, Next.js frontend, PostgreSQL/Redis data layer, Celery async processing, and LLM/RAG integration with self-hosted Llama 3 (vLLM).',
      'Architected critical modules of an enterprise Document Management System (backend + Flutter mobile client with optimized PDF handling).',
      'Built server-driven UI for the DealerAppVantage dealer platform — menus and dashboards rendered dynamically from backend configuration.',
      'Built VSM, a vehicle service-management product, full-stack in Dart with Serverpod + Flutter.',
      'Lead design, frontend, backend, and mobile teams as technical program manager.',
    ],
  },
  {
    title: 'Senior Software Engineer (Contract)',
    subtitle: 'NETMARK — Bergen, Norway (Remote)',
    period: 'May 2023 – Aug 2023',
    description: [
      'Delivered two React Native apps for the Norwegian market: BilDialog (car servicing) and KitchenQ (restaurant orders with Bluetooth kitchen printing).',
    ],
  },
  {
    title: 'Senior Software Engineer (Part-time)',
    subtitle: 'Bigspace Ring — Remote',
    period: 'Apr 2021 – Oct 2023',
    description: [
      'Contributed across Web3 and consumer products: HMP blockchain wallet, Pawtocol NFT tracker (React Native), Slipper (Flutter), and a grocery-ordering app (Expo) built end to end.',
      'Raised code quality via separation of concerns, tests on critical components, and shared component libraries.',
    ],
  },
  {
    title: 'Android Software Engineer',
    subtitle: 'AppCoder.xyz — Dhaka (Remote)',
    period: 'Apr 2021 – Apr 2023',
    description: [
      'Core engineer on Ratio Launcher (system-level Android launcher — Kotlin, Jetpack, Room) and feature work on the tawk.to live-chat Android app.',
      'Built complete apps end to end: Darrigo Brothers Check-In (Flutter), Oway Driver (React Native, Redux, Expo→bare), plus TeamWave CRM features (Flutter, BLoC).',
    ],
  },
  {
    title: 'Mobile Developer (Team Lead)',
    subtitle: 'Advanced Apps Bangladesh — Dhaka',
    period: 'Feb 2019 – Apr 2021',
    description: [
      'Led a 10-engineer mobile team: architecture, code standards, and client communication.',
      'Shipped 9+ apps across e-commerce, food delivery, courier, streaming, and healthcare.',
    ],
  },
  {
    title: 'Flutter Developer (Part-time)',
    subtitle: 'Ibix Global Tech — Jeddah, KSA (Remote)',
    period: 'Jun 2020 – Dec 2020',
    description: [
      'Built features for Sunbulah Driver (delivery/maps) and Sunbulah Home (marketplace); refactored the existing codebase.',
    ],
  },
  {
    title: 'Android Developer',
    subtitle: 'Wizdoor Inc. — Dhaka',
    period: 'Jul 2017 – Jan 2019',
    description: [
      'Early engineer at a social-media startup: built Wizchat (messenger) and the Wizdoor social app against a Django backend.',
    ],
  },
  {
    title: 'Android Developer',
    subtitle: 'TheCoffeeCoders — Dhaka',
    period: 'Feb 2016 – Jun 2017',
    description: [
      'Built features and custom UIs from scratch, maintained the CI process, and improved the existing architecture.',
    ],
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
    { skill: 'Python', level: 90 },
    { skill: 'TypeScript', level: 90 },
    { skill: 'Dart', level: 90 },
    { skill: 'Kotlin / Java', level: 85 },
  ],
  'AI & LLM Engineering': [
    { skill: 'Self-hosted LLMs (vLLM, Llama 3)', level: 90 },
    { skill: 'AI Agents (LangGraph, CrewAI)', level: 85 },
    { skill: 'RAG Pipelines (LangChain, LlamaIndex)', level: 90 },
    { skill: 'Voice AI (Whisper, Kokoro TTS)', level: 85 },
    { skill: 'Prompt Engineering', level: 95 },
  ],
  'Web & Backend': [
    { skill: 'React.js / Next.js', level: 90 },
    { skill: 'FastAPI / SQLAlchemy', level: 90 },
    { skill: 'PostgreSQL / Redis', level: 85 },
    { skill: 'Celery / Async Pipelines', level: 85 },
    { skill: 'Tailwind CSS', level: 90 },
  ],
  'Mobile & Infrastructure': [
    { skill: 'Flutter (Riverpod, BLoC, MobX)', level: 95 },
    { skill: 'Android (Kotlin, Jetpack)', level: 90 },
    { skill: 'React Native (Redux, Expo)', level: 85 },
    { skill: 'Docker / CI/CD', level: 85 },
    { skill: 'DigitalOcean / MinIO', level: 80 },
  ],
};

const aiExperienceData = [
  'Built the AI layer of <b>ezyglobal.ai</b>: RAG over private business-setup knowledge with grounded citations, served by <b>self-hosted Llama 3 on vLLM</b> — no third-party AI APIs, privacy-first by design.',
  'Built a <b>real-time voice AI assistant</b> running fully on local models — streaming <b>Whisper</b> STT, a retrieval-grounded LLM brain, and sentence-streamed <b>Kokoro TTS</b> — on a single consumer GPU.',
  'Designed <b>AI agent and tool-calling workflows</b> with LangChain, LlamaIndex, and CrewAI for document intelligence and automation.',
  'Integrated <b>vision AI (DeepFace)</b> for identity verification flows.',
  'Developed <b>FastAPI microservices</b> with Celery/Redis to handle AI inference, document pipelines, and async workloads.',
  'Run a local AI lab (RTX GPU workstation) for evaluating open-weight models, quantization, and serving stacks.',
];

// --- METADATA ---
export const metadata: Metadata = {
  title: 'Resume | Mahbub Hassan - AI, Full-Stack & Mobile Engineer',
  description:
    'Official resume for Mahbub Hassan — 9+ years across mobile, full-stack, and generative AI engineering: self-hosted LLMs, AI agents, RAG, real-time voice AI, Next.js, FastAPI, Flutter.',
  keywords: [
    'AI Engineer',
    'Generative AI',
    'Mahbub Hassan',
    'Senior Full-Stack',
    'Next.js',
    'FastAPI',
    'LangChain',
    'Flutter',
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
          Mahbub Hassan
        </h1>
        <p className="text-primary mb-3 text-xl font-semibold">
          AI Engineer | Senior Full-Stack & Mobile Engineer
        </p>
        <p className="text-muted-foreground max-w-4xl leading-relaxed">
          Engineer with 9+ years shipping production software — mobile apps,
          backends, and full-stack platforms — focused for the last 2+ years on
          generative AI: building AI agents, tool-calling workflows, document
          intelligence, and real-time voice AI. Built the AI layer of
          ezyglobal.ai on self-hosted Llama 3 (vLLM) with extensive production
          RAG experience underneath: chunking strategy, retrieval quality,
          grounded citations, and privacy-first deployment. Currently a
          Technical Lead delivering products for US and UAE clients — with the
          engineering depth to ship AI features users actually touch, across
          web, mobile, and voice.
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
          <a
            href="https://linkedin.com/in/munnacs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            LinkedIn: linkedin.com/in/munnacs
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
