import { NextRequest, NextResponse } from 'next/server';
import { getSlots, isValidTimeZone } from '@/lib/cal';

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_RANGE_DAYS = 45;

// GET /api/schedule/slots?start=YYYY-MM-DD&end=YYYY-MM-DD&timeZone=Area/City
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const start = p.get('start') ?? '';
  const end = p.get('end') ?? '';
  const timeZone = p.get('timeZone') ?? '';

  if (!DATE.test(start) || !DATE.test(end) || !isValidTimeZone(timeZone)) {
    return NextResponse.json({ error: 'Invalid start, end, or timeZone' }, { status: 400 });
  }
  const days = (Date.parse(end) - Date.parse(start)) / 86_400_000;
  if (!(days >= 0 && days <= MAX_RANGE_DAYS)) {
    return NextResponse.json({ error: 'Range too long' }, { status: 400 });
  }

  try {
    const slots = await getSlots(start, end, timeZone);
    return NextResponse.json({ slots }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('[schedule] slots', e);
    return NextResponse.json({ error: 'Could not load times' }, { status: 502 });
  }
}
