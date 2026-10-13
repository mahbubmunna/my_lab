'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Globe, Loader2 } from 'lucide-react';

type Slots = Record<string, { start: string }[]>;
type Booked = { start: string; end: string; location: string | null; email: string };

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Wall-clock dates are handled as 'YYYY-MM-DD' strings in the visitor's time zone.
const pad = (n: number) => String(n).padStart(2, '0');
const ymd = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const todayIn = (tz: string) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(
    new Date(),
  );

function formatTime(iso: string, tz: string, hour12: boolean) {
  return new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12 }).format(
    new Date(iso),
  );
}

function formatDay(day: string) {
  const [y, m, d] = day.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

function formatFull(iso: string, tz: string, hour12: boolean) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12,
  }).format(new Date(iso));
}

function allTimeZones(current: string): string[] {
  try {
    const list = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.('timeZone');
    if (list?.length) return list.includes(current) ? list : [current, ...list];
  } catch {}
  return [current];
}

export default function Scheduler() {
  const [tz, setTz] = useState('');
  const [hour12, setHour12] = useState(true);
  const [month, setMonth] = useState<{ y: number; m: number } | null>(null);
  const [slots, setSlots] = useState<Slots>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [day, setDay] = useState('');
  const [slot, setSlot] = useState('');
  const [step, setStep] = useState<'pick' | 'form' | 'done'>('pick');
  const [form, setForm] = useState({ name: '', email: '', notes: '', company: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [booked, setBooked] = useState<Booked | null>(null);
  const [autoAdvanced, setAutoAdvanced] = useState(false);

  // Detect the visitor's time zone and clock style on the client.
  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    setTz(zone);
    setHour12(new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions().hour12 ?? true);
    const [y, m] = todayIn(zone).split('-').map(Number);
    setMonth({ y, m: m - 1 });
  }, []);

  const today = tz ? todayIn(tz) : '';

  const load = useCallback(async () => {
    if (!tz || !month) return;
    const first = ymd(month.y, month.m, 1);
    const lastDay = new Date(Date.UTC(month.y, month.m + 1, 0)).getUTCDate();
    const start = first < today ? today : first;
    const end = ymd(month.y, month.m, lastDay);
    if (start > end) {
      setSlots({});
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError('');
    try {
      const qs = new URLSearchParams({ start, end, timeZone: tz });
      const res = await fetch(`/api/schedule/slots?${qs}`, { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Could not load times');
      setSlots(json.slots ?? {});
    } catch {
      setSlots({});
      setLoadError('Could not load available times. Please refresh, or use the Cal.com link below.');
    } finally {
      setLoading(false);
    }
  }, [tz, month, today]);

  useEffect(() => {
    load();
  }, [load]);

  const monthPrefix = month ? `${month.y}-${pad(month.m + 1)}-` : '';
  const availableDays = useMemo(
    () =>
      Object.keys(slots)
        .filter((d) => d.startsWith(monthPrefix) && slots[d].length > 0)
        .sort(),
    [slots, monthPrefix],
  );

  // Keep a valid day selected; if this month is fully booked on first load, show the next one.
  useEffect(() => {
    if (loading) return;
    if (availableDays.length === 0) {
      setDay('');
      if (!autoAdvanced && !loadError && month) {
        setAutoAdvanced(true);
        setMonth(month.m === 11 ? { y: month.y + 1, m: 0 } : { y: month.y, m: month.m + 1 });
      }
      return;
    }
    if (!availableDays.includes(day)) setDay(availableDays[0]);
  }, [loading, availableDays, day, autoAdvanced, loadError, month]);

  const zones = useMemo(() => (tz ? allTimeZones(tz) : []), [tz]);

  if (!tz || !month) {
    return (
      <div className="border-border flex h-96 items-center justify-center rounded-2xl border">
        <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
      </div>
    );
  }

  const firstWeekday = new Date(Date.UTC(month.y, month.m, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(month.y, month.m + 1, 0)).getUTCDate();
  const [ty, tm] = today.split('-').map(Number);
  const isCurrentMonth = month.y === ty && month.m === tm - 1;
  const monthLabel = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(
    new Date(Date.UTC(month.y, month.m, 1)),
  );

  const shiftMonth = (delta: number) => {
    const d = new Date(Date.UTC(month.y, month.m + delta, 1));
    setAutoAdvanced(true); // the visitor is navigating now; never jump months for them
    setLoading(true);
    setMonth({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
    setSlot('');
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      const res = await fetch('/api/schedule/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, start: slot, timeZone: tz }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error || 'Something went wrong. Please try again.');
        if (json.taken) {
          setSlot('');
          setStep('pick');
          load();
        }
        return;
      }
      setBooked({ start: json.start, end: json.end, location: json.location, email: form.email.trim() });
      setStep('done');
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    'border-input bg-background focus:ring-ring/40 focus:border-ring w-full rounded-lg border px-3 py-2 text-base outline-none focus:ring-2';

  if (step === 'done' && booked) {
    const isLink = booked.location?.startsWith('http');
    return (
      <div className="border-border bg-card rounded-2xl border p-8 text-center md:p-12">
        <div className="bg-brand/10 text-brand mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="text-foreground text-2xl md:text-3xl">You&apos;re booked</h2>
        <p className="text-foreground mt-3 text-lg">{formatFull(booked.start, tz, hour12)}</p>
        <p className="text-muted-foreground text-sm">{tz.replace(/_/g, ' ')}</p>
        <p className="text-muted-foreground mx-auto mt-5 max-w-md">
          A calendar invite is on its way to <span className="text-foreground">{booked.email}</span>. To
          reschedule or cancel, use the links in that email.
        </p>
        {isLink && (
          <a
            href={booked.location!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand mt-4 inline-block text-sm font-medium hover:underline"
          >
            Video call link
          </a>
        )}
        <p className="text-muted-foreground mt-6 text-sm">Talk soon. Mahbub</p>
      </div>
    );
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      {step === 'form' ? (
        <form onSubmit={submit} className="grid gap-8 p-6 md:grid-cols-[1fr_1.4fr] md:p-8">
          <div>
            <button
              type="button"
              onClick={() => {
                setStep('pick');
                setFormError('');
              }}
              className="text-muted-foreground hover:text-foreground mb-5 inline-flex items-center gap-1.5 text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Change time
            </button>
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Your call</p>
            <p className="text-foreground mt-1 font-serif text-xl">{formatFull(slot, tz, hour12)}</p>
            <p className="text-muted-foreground mt-1 text-sm">30 minutes · {tz.replace(/_/g, ' ')}</p>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-foreground mb-1 block text-sm font-medium">Name</span>
              <input
                required
                maxLength={100}
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="text-foreground mb-1 block text-sm font-medium">Email</span>
              <input
                required
                type="email"
                maxLength={200}
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="text-foreground mb-1 block text-sm font-medium">
                What would you like to talk about? <span className="text-muted-foreground font-normal">(optional)</span>
              </span>
              <textarea
                rows={4}
                maxLength={1000}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="A line or two about your product or the problem helps me prepare."
                className={inputClass}
              />
            </label>
            {/* Honeypot for bots: hidden from people and screen readers */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            {formError && <p className="text-destructive text-sm">{formError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-6 font-medium transition-colors disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? 'Booking…' : 'Confirm booking'}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          {/* Calendar */}
          <div className="border-border p-6 md:border-r md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-foreground font-serif text-lg font-semibold">{monthLabel}</p>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label="Previous month"
                  disabled={isCurrentMonth}
                  onClick={() => shiftMonth(-1)}
                  className="hover:bg-secondary rounded-md p-1.5 disabled:opacity-30"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => shiftMonth(1)}
                  className="hover:bg-secondary rounded-md p-1.5"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="text-muted-foreground mb-2 grid grid-cols-7 text-center text-xs font-medium">
              {WEEKDAYS.map((w) => (
                <div key={w}>{w}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstWeekday }).map((_, i) => (
                <div key={`pad-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = ymd(month.y, month.m, i + 1);
                const open = availableDays.includes(d);
                const selected = d === day;
                return (
                  <button
                    key={d}
                    type="button"
                    disabled={!open || loading}
                    aria-pressed={selected}
                    aria-label={`${formatDay(d)}${open ? '' : ', no times'}`}
                    onClick={() => {
                      setDay(d);
                      setSlot('');
                    }}
                    className={[
                      'relative aspect-square rounded-lg text-sm transition-colors',
                      selected
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : open
                          ? 'bg-brand/10 text-foreground hover:bg-brand/20 font-medium'
                          : 'text-muted-foreground/50',
                      d === today && !selected ? 'ring-brand/50 ring-1' : '',
                    ].join(' ')}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <label className="text-muted-foreground mt-6 flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 shrink-0" />
              <span className="sr-only">Time zone</span>
              <select
                value={tz}
                onChange={(e) => {
                  setTz(e.target.value);
                  setSlot('');
                }}
                className="bg-background border-input min-w-0 flex-1 rounded-md border px-2 py-1.5"
              >
                {zones.map((z) => (
                  <option key={z} value={z}>
                    {z.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Times */}
          <div className="p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-foreground font-medium">{day ? formatDay(day) : 'Pick a day'}</p>
              <div className="border-border flex rounded-md border p-0.5 text-xs">
                {[true, false].map((h) => (
                  <button
                    key={String(h)}
                    type="button"
                    aria-pressed={hour12 === h}
                    onClick={() => setHour12(h)}
                    className={`rounded px-2 py-1 ${hour12 === h ? 'bg-secondary text-foreground' : 'text-muted-foreground'}`}
                  >
                    {h ? '12h' : '24h'}
                  </button>
                ))}
              </div>
            </div>

            {formError && step === 'pick' && <p className="text-destructive mb-3 text-sm">{formError}</p>}

            {loading ? (
              <div className="flex h-48 items-center justify-center">
                <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
              </div>
            ) : loadError ? (
              <p className="text-muted-foreground text-sm">{loadError}</p>
            ) : !day || !slots[day]?.length ? (
              <p className="text-muted-foreground text-sm">No open times this month. Try the next one.</p>
            ) : (
              <div className="grid max-h-[22rem] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 md:grid-cols-2">
                {(slots[day] ?? []).map((s) => (
                  <button
                    key={s.start}
                    type="button"
                    onClick={() => {
                      setSlot(s.start);
                      setFormError('');
                      setStep('form');
                    }}
                    className="border-border hover:border-brand hover:text-brand rounded-lg border py-2.5 text-sm font-medium transition-colors"
                  >
                    {formatTime(s.start, tz, hour12)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
