import { NextRequest, NextResponse } from 'next/server';
import { createBooking, isValidTimeZone } from '@/lib/cal';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple per-IP limit. One pm2 process serves the site, so memory is enough.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

// POST /api/schedule/book  { start, name, email, notes?, timeZone, company? }
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown';
  if (limited(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please wait a few minutes and try again.' },
      { status: 429 },
    );
  }

  const b = await req.json().catch(() => null);
  if (!b || typeof b !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field.
  if (typeof b.company === 'string' && b.company.trim() !== '') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const email = typeof b.email === 'string' ? b.email.trim() : '';
  const notes = typeof b.notes === 'string' ? b.notes.trim() : '';
  const timeZone = typeof b.timeZone === 'string' ? b.timeZone : '';
  const startMs = typeof b.start === 'string' ? Date.parse(b.start) : NaN;

  if (!name || name.length > 100) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }
  if (notes.length > 1000) {
    return NextResponse.json({ error: 'Notes are too long (1,000 characters max).' }, { status: 400 });
  }
  if (!isValidTimeZone(timeZone) || Number.isNaN(startMs) || startMs < Date.now()) {
    return NextResponse.json({ error: 'Please pick a time again.' }, { status: 400 });
  }

  const result = await createBooking({
    start: new Date(startMs).toISOString(),
    name,
    email,
    timeZone,
    notes: notes || undefined,
  });

  if (!result.ok) {
    console.error('[schedule] booking failed', result.status, result.message);
    const taken = /not available|already has booking|no available/i.test(result.message);
    return NextResponse.json(
      {
        error: taken
          ? 'That time was just taken. Please pick another one.'
          : 'Something went wrong while booking. Please try again, or book on Cal.com.',
        taken,
      },
      { status: taken ? 409 : 502 },
    );
  }

  return NextResponse.json(result);
}
