import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BOOK_PATH, EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'How Mahbub Hassan went from a house full of newspapers in Jhenaidah to building voice agents and the products around them.',
};

const built = [
  'Nora, a voice guide that answers from our own knowledge base and walks people through each step',
  'a self-hosted Llama 3 model, so no document ever left our servers',
  'an AI data room built to cut manual document review',
  'the web app, sign-in, and Stripe payments around it',
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 md:py-20">
      <header className="mb-12 flex items-center gap-5">
        <div className="border-border relative h-20 w-20 shrink-0 overflow-hidden rounded-full border">
          <Image
            src="/mahbub-hassan-square.jpg"
            alt="Mahbub Hassan"
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div>
          <h1 className="text-foreground mb-1 text-4xl">About</h1>
          <p className="text-muted-foreground">
            AI product engineer. I build voice agents, and the products around them.
          </p>
        </div>
      </header>

      <div className="bg-muted text-foreground mb-12 rounded-xl p-5 leading-relaxed">
        <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide uppercase">
          The short version
        </p>
        <p>
          I&apos;m an AI product engineer. For the past 2+ years I&apos;ve worked
          in AI and the backend behind it: voice agents, private document
          search, and the systems that keep them running. That sits on 7+ years
          of shipping mobile and web apps. The longer story is below, if you
          have five minutes.
        </p>
      </div>

      <div className="article">
        <h2 style={{ marginTop: 0 }}>Twenty cents of internet</h2>
        <p>
          I grew up in Jhenaidah, a town in western Bangladesh, in a house full
          of newspapers. My father is a journalist, so reading was simply what
          we did at home.
        </p>
        <p>
          The internet reached me through a basic multimedia phone on 2G, pay
          as you go. My daily allowance was about twenty cents, and most of it
          went into recharging my SIM. When the balance ran out, so did the
          internet. So I learned to plan ahead: I went to free public Wi-Fi,
          downloaded tutorials, and watched them later, offline.
        </p>
        <p>
          Tech blogs became my school. I read everything I could find about
          programming and hacking, and somewhere in there I started to dream
          about writing my own software.
        </p>
        <p>
          Then my mother bought me a computer with money borrowed from a bank.
          Later she borrowed again so I could upgrade it. With a machine of my
          own, I took everything apart to see how it worked. I rooted Android
          phones more times than I can count, and I installed Windows on
          people&apos;s computers around town for some pocket money.
        </p>
        <p>
          By Class 11 I knew I wanted to build software, so I studied Computer Science and Engineering, and spent most of
          university building apps the coursework never asked for.
        </p>

        <h2>From hobby to job</h2>
        <p>
          I started in 2016 as an Android developer. I was drawn to Android by
          its developer community, and later by clean-code ideas from Uncle Bob.
          Over the next years I shipped 20+ mobile and web apps in Flutter,
          native Android, and React Native, for couriers, restaurants, clinics,
          and the tawk.to live-chat app. I worked on Ratio Launcher, which
          passed a million downloads, and I led a team of ten mobile engineers.
        </p>
        <p>
          Then, in August 2024, my day job turned to AI and the backend. We
          were building a document management system, and I set up RAG and
          intelligent indexing so people could find and ask about any file
          without opening it.
        </p>

        <h2>The documents that couldn&apos;t leave the building</h2>
        <p>
          My CEO asked me for something simple to say and hard to build: a
          platform where nobody has to read every document by hand.
        </p>
        <p>
          It was for corporate service providers in the UAE, the firms that set
          up companies for other people. Their work runs on paperwork.
          Licenses, passports, company papers. Each file needed a manual
          review, and each customer needed someone to explain the next step. He
          wanted a product that did both jobs: read the documents, and guide
          people through the setup the way a patient person would. The
          documents were sensitive, so they couldn&apos;t go to an outside AI
          service.
        </p>
        <p>
          So I built it. Mostly alone for the first three months, then with one
          backend engineer I guided. In about six months,{' '}
          <a href="https://ezyglobal.ai" target="_blank" rel="noopener noreferrer">
            ezyglobal.ai
          </a>{' '}
          had:
        </p>
        <ul>
          {built.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          Three parts fought back. Getting the voice model onto the GPU so Nora
          replied without an awkward pause. Teaching it when a person had
          really stopped talking. Moving heavy document work into background
          queues so the app never froze. None of them worked well the first
          time. I kept at each one until it did.
        </p>
        <p>
          What I took from it: writing code is the easy part. The hard part is
          connecting every piece so the whole thing feels close to human, and
          people get guided through without ever noticing the system
          underneath.
        </p>

        <h2>Now</h2>
        <p>
          The screen at the end of every AI pipeline still matters to me,
          because of all those years in mobile. Today I&apos;m building{' '}
          <a href="/projects/mama-desk">Mama Desk</a>, a clinic front desk that
          talks on fully local models and answers in about a second. I also
          evaluate code written by frontier AI models for xAI and Google. Both
          keep teaching me the same thing: time every step, and don&apos;t
          trust output you haven&apos;t checked.
        </p>
        <p>
          I enjoy small product teams where one engineer can own an AI feature
          from the first customer conversation to production.
        </p>

        <h2>Elsewhere</h2>
        <p>
          My full work history is on{' '}
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          , and my code is on{' '}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          . You can email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </div>

      <Link
        href={BOOK_PATH}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-10 inline-flex h-11 items-center gap-1.5 rounded-full px-6 font-medium transition-colors"
      >
        Book a 30-min call
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
