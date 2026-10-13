// Server-only Cal.com API v2 helpers for the /schedule page.
// The event type is public, so no API key is needed. If CAL_API_KEY is set in the
// server's environment it is sent anyway (never expose it to the browser).

const API = 'https://api.cal.com/v2';
export const CAL_USERNAME = 'mahub.hassan';
export const CAL_EVENT_SLUG = '30min';
export const CAL_EVENT_MINUTES = 30;

function headers(version: string): Record<string, string> {
  const h: Record<string, string> = {
    'cal-api-version': version,
    'Content-Type': 'application/json',
  };
  if (process.env.CAL_API_KEY) h.Authorization = `Bearer ${process.env.CAL_API_KEY}`;
  return h;
}

function errorMessage(json: unknown, fallback: string): string {
  const e = (json as { error?: { message?: unknown } })?.error;
  return typeof e?.message === 'string' ? e.message : fallback;
}

export type Slots = Record<string, { start: string }[]>;

export async function getSlots(start: string, end: string, timeZone: string): Promise<Slots> {
  const qs = new URLSearchParams({
    username: CAL_USERNAME,
    eventTypeSlug: CAL_EVENT_SLUG,
    start,
    end,
    timeZone,
  });
  const res = await fetch(`${API}/slots?${qs}`, {
    headers: headers('2024-09-04'),
    cache: 'no-store',
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(errorMessage(json, `Cal.com slots failed (${res.status})`));
  return (json?.data ?? {}) as Slots;
}

export type BookingInput = {
  start: string; // ISO 8601, UTC
  name: string;
  email: string;
  timeZone: string;
  notes?: string;
};

export type BookingResult =
  | { ok: true; uid: string; start: string; end: string; location: string | null }
  | { ok: false; status: number; message: string };

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const body = {
    start: input.start,
    username: CAL_USERNAME,
    eventTypeSlug: CAL_EVENT_SLUG,
    attendee: { name: input.name, email: input.email, timeZone: input.timeZone, language: 'en' },
    ...(input.notes ? { bookingFieldsResponses: { notes: input.notes } } : {}),
    metadata: { source: 'mahbubhassan.dev/schedule' },
  };
  const res = await fetch(`${API}/bookings`, {
    method: 'POST',
    headers: headers('2026-02-25'),
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    return { ok: false, status: res.status, message: errorMessage(json, 'Booking failed') };
  }
  const d = json?.data ?? {};
  return {
    ok: true,
    uid: String(d.uid ?? ''),
    start: String(d.start ?? input.start),
    end: String(d.end ?? ''),
    location: typeof d.location === 'string' ? d.location : null,
  };
}

export function isValidTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}
