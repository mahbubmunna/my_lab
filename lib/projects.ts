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
    status: 'In Development',
    oneLiner:
      'An autonomous AI front-desk employee. Natural voice dialogues with sub-400ms latency, dynamic patient intake and symptom triage, live doctor-calendar scheduling, and schema-validated EHR extraction — debuting in healthcare with Hope Medical Clinic.',
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
      { value: '<400ms', label: 'Voice round-trip latency' },
      { value: '24/7', label: 'Always-on digital workforce' },
      { value: '4 agents', label: 'Reception · knowledge · scheduling · EHR' },
      { value: 'FHIR R4', label: 'Schema-validated EHR output' },
    ],
    capabilities: [
      {
        title: 'Real-time voice dialogue',
        body: 'Streaming speech-to-text, a retrieval-grounded LLM brain, and sentence-streamed TTS keep the conversation loop under 400ms — it feels like talking to a person, not a phone tree.',
      },
      {
        title: 'Dynamic intake & symptom triage',
        body: 'Conversational patient intake with live triage classification — urgent cases are flagged and routed to clinical staff while routine requests are handled end to end by the AI.',
      },
      {
        title: 'Live calendar scheduling',
        body: 'A scheduler agent executes real doctor-calendar bookings mid-conversation — availability checks, confirmations, and rescheduling without a human in the loop.',
      },
      {
        title: 'Automatic EHR extraction',
        body: 'Every call is distilled into a schema-validated medical record — chief complaint, vitals mentioned, history — ready to push to Epic / Cerner as FHIR R4.',
      },
    ],
    rows: [
      {
        heading: 'Operations Center',
        layout: 'full',
        screens: [
          {
            src: '/projects/mamadesk-operations-center.png',
            alt: 'Mama Desk operations center dashboard',
            label: 'mama-desk / operations center',
            caption:
              'Operations Center — live agent coordination matrix, triage monitor, and real-time intake stream across all four agents.',
            width: 1600,
            height: 1280,
          },
        ],
      },
      {
        layout: 'two-up',
        screens: [
          {
            src: '/projects/mamadesk-live-call.png',
            alt: 'Live AI front-desk voice call',
            label: 'live AI voice call',
            caption:
              'Live call — the AI receptionist mid-conversation, with intake context extracted in real time.',
            width: 1280,
            height: 1024,
          },
          {
            src: '/projects/mamadesk-ehr-intake.png',
            alt: 'Structured EHR intake records',
            label: 'structured EHR intake',
            caption:
              'Structured intake records — AI triage classification with confidence, extracted vitals, and a FHIR R4 payload preview.',
            width: 1600,
            height: 1280,
          },
        ],
      },
      {
        layout: 'full',
        screens: [
          {
            src: '/projects/mamadesk-schedule-hub.png',
            alt: 'Calendar allocation hub with AI-booked appointments',
            label: 'calendar allocation hub',
            caption:
              'Calendar Allocation Hub — AI-booked, emergency, and walk-in slots managed across doctors and departments.',
            width: 1600,
            height: 1000,
          },
        ],
      },
      {
        heading: 'Clinic-facing experience',
        layout: 'two-up',
        screens: [
          {
            src: '/projects/mamadesk-patient-portal.png',
            alt: 'Hope Medical Clinic patient portal',
            label: 'hope medical clinic',
            caption:
              'Patient portal — the “Talk to Front Desk” voice entry point embedded in the clinic site.',
            width: 1280,
            height: 853,
          },
          {
            src: '/projects/mamadesk-appointment-confirmation.png',
            alt: 'Appointment confirmation page',
            label: 'appointment confirmation',
            caption:
              'Appointment confirmation — the booking the AI scheduled, confirmed back to the patient.',
            width: 1280,
            height: 701,
          },
        ],
      },
    ],
    originNote:
      'Evolved from my local-first voice RAG assistant: streaming Whisper STT, a retrieval-grounded Llama 3.1 brain, and sentence-streamed Kokoro TTS running on a single consumer GPU — no cloud AI APIs.',
  },
  {
    slug: 'causelist-pro',
    title: 'CauseList Pro',
    kicker: 'Legal Tech · Mobile + Admin · Bangladesh',
    status: 'In Development',
    oneLiner:
      'Real-time court case tracking for Bangladeshi legal advocates. Automated daily Supreme Court and High Court cause-list scraping, instant push notifications, a bilingual mobile app with an AI legal assistant — and a full admin portal behind it. Built end to end solo.',
    tags: ['Flutter', 'Riverpod', 'FastAPI', 'BeautifulSoup4', 'Firebase'],
    github: 'https://github.com/mahbubmunna',
    capabilities: [
      {
        title: 'Automated daily scraping',
        body: 'A scraper daemon aggregates Supreme Court and High Court division cause lists every day, normalizing thousands of entries into a searchable live docket.',
      },
      {
        title: 'Instant hearing alerts',
        body: 'Advocates track their cases and get Firebase push notifications the moment a tracked case appears on a cause list — no more manual daily checking.',
      },
      {
        title: 'AI legal assistant',
        body: 'An in-app AI law finder answers questions on Bangladeshi law with section-level citations — anticipatory bail, writ petitions, CrPC provisions — in Bangla and English.',
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
              'Live cause-list board — today’s hearings by division, court, and judge.',
            width: 390,
            height: 729,
          },
          {
            src: '/projects/causelist-ai-law-finder.png',
            alt: 'AI law finder chat',
            caption:
              'AI law finder — cited answers on statutes and procedure.',
            width: 706,
            height: 1600,
          },
          {
            src: '/projects/causelist-tracked-cases.png',
            alt: 'My tracked cases screen',
            caption:
              'Tracked cases — bookmarked matters with hearing status at a glance.',
            width: 390,
            height: 783,
          },
          {
            src: '/projects/causelist-settings.png',
            alt: 'Settings and subscription screen',
            caption:
              'Settings — bilingual interface and Pro subscription management.',
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
              'Master cause-list explorer — real-time aggregation across divisions with per-case dockets, trajectories, and CSV export.',
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
            alt: 'Scraper operations health dashboard',
            label: 'scraper operations',
            caption:
              'Scraper operations health — daemon status, run history, and per-division scrape monitoring.',
            width: 1600,
            height: 1285,
          },
          {
            src: '/projects/causelist-payments.png',
            alt: 'Payment approval center',
            label: 'payment approvals',
            caption:
              'Payment approval center — subscription payments reviewed and approved by admins.',
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
              'Broadcast hub — push announcements to all advocates or targeted segments.',
            width: 1600,
            height: 1280,
          },
          {
            src: '/projects/causelist-ai-knowledge.png',
            alt: 'AI knowledge management',
            label: 'AI knowledge management',
            caption:
              'AI knowledge management — curating the laws-and-acts corpus behind the AI law finder.',
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
