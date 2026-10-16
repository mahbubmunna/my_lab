// lib/projects.ts
// Case-study content for the /projects/[slug] demo pages.

import type { ScreenShot } from '@/app/components/ui/DeviceFrames';

export interface ScreenRow {
  heading?: string;
  layout: 'full' | 'two-up' | 'phones';
  screens: ScreenShot[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  kicker: string;
  status: string;
  oneLiner: string;
  tags: string[];
  github: string;
  demo?: string; // live interactive demo
  stats?: { value: string; label: string }[];
  capabilities: { title: string; body: string }[];
  rows: ScreenRow[];
  originNote?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'mama-desk',
    title: 'Mama Desk',
    kicker: 'Voice AI · Multi-Agent · Healthcare',
    status: 'In development',
    oneLiner:
      'An autonomous AI front-desk employee. Natural voice dialogues answering in about a second on fully local models, dynamic patient intake and symptom triage, live doctor-calendar scheduling, and schema-validated EHR extraction. The first scenario is a clinic, Hope Medical Clinic.',
    tags: [
      'Python',
      'Whisper',
      'Llama 3.1',
      'Kokoro TTS',
      'Multi-Agent',
      'FastAPI',
      'WebSockets',
    ],
    github: 'https://github.com/mahbubmunna',
    stats: [
      { value: '~1s', label: 'Voice response, one local GPU' },
      { value: '24/7', label: 'Always-on digital workforce' },
      { value: '4 agents', label: 'Reception · knowledge · scheduling · EHR' },
      { value: 'FHIR R4', label: 'Schema-validated EHR output' },
    ],
    capabilities: [
      {
        title: 'Real-time voice dialogue',
        body: 'Streaming speech-to-text, a retrieval-grounded LLM brain, and sentence-streamed TTS keep each reply to about a second, with no cloud AI APIs. It feels like a conversation, not a phone tree, and the pipeline is built to go faster.',
      },
      {
        title: 'Dynamic intake & symptom triage',
        body: 'Conversational patient intake with live triage classification. Urgent cases are flagged and routed to clinical staff while routine requests are handled end to end by the AI.',
      },
      {
        title: 'Live calendar scheduling',
        body: 'A scheduler agent executes real doctor-calendar bookings mid-conversation: availability checks, confirmations, and rescheduling, with no human in the loop.',
      },
      {
        title: 'Automatic EHR extraction',
        body: 'Every call becomes a schema-validated medical record (chief complaint, vitals mentioned, history) in FHIR R4 format.',
      },
    ],
    demo: 'https://mamadesk.oaimama.com',
    rows: [
      {
        heading: 'Live call console',
        layout: 'full',
        screens: [
          {
            src: '/projects/mamadesk-live-booking.png',
            alt: 'Mama Desk live call console mid-booking',
            label: 'mamadesk.oaimama.com / live calls',
            caption:
              'A booking call in progress: the agent state, the live transcript with the sources each answer is grounded in, retrieved knowledge with scores, and every action the agent takes.',
            width: 2880,
            height: 1800,
          },
        ],
      },
      {
        heading: 'When the AI should not answer',
        layout: 'two-up',
        screens: [
          {
            src: '/projects/mamadesk-live-handoff.png',
            alt: 'Billing question escalated to a human',
            label: 'live calls / billing escalation',
            caption:
              'A refund request with no policy behind it: retrieval comes back weak, confidence drops below the threshold, and the call goes to a person.',
            width: 2880,
            height: 1800,
          },
          {
            src: '/projects/mamadesk-handoff-desk.png',
            alt: 'Handoff desk with the context the AI gathered',
            label: 'handoff desk',
            caption:
              'Reception picks up with the transcript, what the AI already verified, and the knowledge it checked, so the caller never repeats themselves.',
            width: 2880,
            height: 1800,
          },
        ],
      },
      {
        heading: 'What the caller sees',
        layout: 'phones',
        screens: [
          {
            src: '/projects/mamadesk-phone-caller-start.png',
            alt: 'Talk to Sarah start screen on a phone',
            caption: 'One tap to talk, in English or Bangla.',
            width: 1170,
            height: 2532,
          },
          {
            src: '/projects/mamadesk-phone-caller-incall.png',
            alt: 'Voice call in progress on a phone',
            caption: 'The voice ring follows the agent: listening, thinking, speaking.',
            width: 1170,
            height: 2532,
          },
          {
            src: '/projects/mamadesk-phone-caller-ended.png',
            alt: 'Call ended with the booked appointment',
            caption: 'The call ends with the booking confirmed on screen.',
            width: 1170,
            height: 2532,
          },
        ],
      },
      {
        heading: 'Around the call',
        layout: 'two-up',
        screens: [
          {
            src: '/projects/mamadesk-patient-portal.png',
            alt: 'Patient portal with upcoming appointments',
            label: 'patient portal',
            caption:
              'Patient portal: appointments the agent booked, reports, prescriptions and billing in one place.',
            width: 2880,
            height: 1800,
          },
          {
            src: '/projects/mamadesk-agent-config.png',
            alt: 'Agent configuration: knowledge, tools, handoff rules',
            label: 'agent configuration',
            caption:
              'Agent configuration: what it may look up, which tools it may run, and the rules that send a caller to a person.',
            width: 2880,
            height: 1800,
          },
        ],
      },
    ],
    originNote:
      'Evolved from my local-first voice RAG assistant: streaming Whisper STT, a retrieval-grounded Llama 3.1 brain, and sentence-streamed Kokoro TTS running on a single consumer GPU, with no cloud AI APIs.',
  },
  {
    slug: 'causelist-pro',
    title: 'CauseList Pro',
    kicker: 'Legal Tech · Mobile + Admin · Bangladesh',
    status: 'In development',
    oneLiner:
      'Real-time court case tracking for Bangladeshi legal advocates. Automated daily Supreme Court and High Court cause-list scraping, instant push notifications, a bilingual mobile app with an AI legal assistant, and a full admin portal behind it. Built end to end solo.',
    tags: ['Flutter', 'Riverpod', 'FastAPI', 'BeautifulSoup4', 'Firebase'],
    github: 'https://github.com/mahbubmunna',
    capabilities: [
      {
        title: 'Automated daily scraping',
        body: 'A scraper daemon aggregates Supreme Court and High Court division cause lists every day, normalizing thousands of entries into a searchable live docket.',
      },
      {
        title: 'Instant hearing alerts',
        body: 'Advocates track their cases and get Firebase push notifications the moment a tracked case appears on a cause list. No more checking by hand every day.',
      },
      {
        title: 'AI legal assistant',
        body: 'An in-app AI law finder answers questions on Bangladeshi law with section-level citations, in Bangla and English: anticipatory bail, writ petitions, CrPC provisions.',
      },
      {
        title: 'Full admin portal',
        body: 'Operations dashboard for scraper health, a master cause-list explorer, payment approvals, broadcasts, and AI knowledge management.',
      },
    ],
    rows: [
      {
        heading: 'Advocate mobile app',
        layout: 'phones',
        screens: [
          {
            src: '/projects/causelist-live-board.png',
            alt: 'Live cause-list board',
            caption:
              'Live cause-list board: today’s hearings by division, court, and judge.',
            width: 390,
            height: 729,
          },
          {
            src: '/projects/causelist-ai-law-finder.png',
            alt: 'AI law finder chat',
            caption:
              'AI law finder: cited answers on statutes and procedure.',
            width: 706,
            height: 1600,
          },
          {
            src: '/projects/causelist-tracked-cases.png',
            alt: 'My tracked cases screen',
            caption:
              'Tracked cases: bookmarked matters with hearing status at a glance.',
            width: 390,
            height: 783,
          },
          {
            src: '/projects/causelist-settings.png',
            alt: 'Settings and subscription screen',
            caption:
              'Settings: bilingual interface and Pro subscription management.',
            width: 390,
            height: 1677,
          },
        ],
      },
      {
        heading: 'Admin portal',
        layout: 'full',
        screens: [
          {
            src: '/projects/causelist-admin-explorer.png',
            alt: 'Master cause list explorer',
            label: 'causelist-pro / admin portal',
            caption:
              'Master cause-list explorer: real-time aggregation across divisions with per-case dockets, trajectories, and CSV export.',
            width: 1600,
            height: 1280,
          },
        ],
      },
      {
        layout: 'two-up',
        screens: [
          {
            src: '/projects/causelist-scraper-ops.png',
            alt: 'Scraper operations and system health dashboard',
            label: 'scraper operations',
            caption:
              'Operations dashboard: scraper runs, division-by-division sync progress, and system health.',
            width: 1600,
            height: 1280,
          },
          {
            src: '/projects/causelist-payments.png',
            alt: 'Payment approval center',
            label: 'payment approvals',
            caption:
              'Payment approval center: subscription payments reviewed and approved by admins.',
            width: 1600,
            height: 1280,
          },
        ],
      },
      {
        layout: 'two-up',
        screens: [
          {
            src: '/projects/causelist-broadcast.png',
            alt: 'Broadcast hub',
            label: 'broadcast hub',
            caption:
              'Broadcast hub: push announcements to all advocates or targeted segments.',
            width: 1600,
            height: 1280,
          },
          {
            src: '/projects/causelist-ai-knowledge.png',
            alt: 'AI knowledge management',
            label: 'AI knowledge management',
            caption:
              'AI knowledge management: curating the laws-and-acts corpus behind the AI law finder.',
            width: 1600,
            height: 1458,
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
