// Cal.com API v2 — availability + booking. Cal.com syncs the resulting event to
// Junaid's connected Google Calendar and sends confirmations. Graceful no-ops when
// CAL_API_KEY / CAL_EVENT_TYPE_ID aren't set.

const BASE = "https://api.cal.com/v2";
const apiKey = () => process.env.CAL_API_KEY;
const eventTypeId = () => process.env.CAL_EVENT_TYPE_ID;
const defaultTz = () => process.env.CAL_TIMEZONE || "UTC";

export const bookingConfigured = () => Boolean(apiKey() && eventTypeId());

type Day = { date: string; times: string[] };

// Evenly sample n items across an array (so we get morning→evening coverage, not
// just the earliest slots of the day).
function spread(arr: string[], n: number): string[] {
  if (arr.length <= n) return arr;
  const out: string[] = [];
  const step = (arr.length - 1) / (n - 1);
  for (let i = 0; i < n; i++) out.push(arr[Math.round(i * step)]);
  return [...new Set(out)];
}

export async function getAvailability(fromDate?: string, toDate?: string, timeZone?: string) {
  if (!bookingConfigured()) return { ok: false, error: "Booking isn't configured.", days: [] as Day[] };
  const tz = timeZone || defaultTz();
  const start = fromDate || new Date().toISOString().slice(0, 10);
  let end = toDate || new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10);
  // Cal.com needs end > start; for a single-day query bump end by a day.
  if (end <= start) {
    const d = new Date(`${start}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + 1);
    end = d.toISOString().slice(0, 10);
  }
  const spanDays = Math.max(1, Math.round((Date.parse(end) - Date.parse(start)) / 86_400_000));
  const perDay = spanDays <= 2 ? 12 : 6; // narrow (specific-day) query → more detail; wide → a spread
  const url = `${BASE}/slots?eventTypeId=${eventTypeId()}&start=${start}&end=${end}&timeZone=${encodeURIComponent(tz)}`;
  try {
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey()}`, "cal-api-version": "2024-09-04" },
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: JSON.stringify(data).slice(0, 300), days: [] as Day[] };
    // data.data is keyed by date → array of { start }; sample a spread of times per day.
    const byDate = (data?.data ?? {}) as Record<string, { start: string }[]>;
    const days: Day[] = Object.keys(byDate)
      .sort()
      .map((date) => ({ date, times: spread((byDate[date] ?? []).map((s) => s?.start).filter(Boolean), perDay) }))
      .filter((d) => d.times.length)
      .slice(0, 8);
    return { ok: true, timeZone: tz, days };
  } catch {
    return { ok: false, error: "Couldn't reach the calendar.", days: [] as Day[] };
  }
}

// System fields Cal.com handles itself (don't need responses from us).
const SYSTEM_FIELDS = new Set([
  "name", "email", "attendeePhoneNumber", "location", "guests", "rescheduleReason",
]);

// Fetch the slugs of required booking-form fields we must answer, so booking keeps
// working no matter how the event type's questions are configured.
async function requiredFieldSlugs(): Promise<string[]> {
  try {
    const r = await fetch(`${BASE}/event-types/${eventTypeId()}`, {
      headers: { Authorization: `Bearer ${apiKey()}`, "cal-api-version": "2024-06-14" },
    });
    if (!r.ok) return [];
    const d = await r.json().catch(() => ({}));
    const fields = ((d?.data?.bookingFields ?? []) as { slug: string; required?: boolean }[]) || [];
    return fields.filter((f) => f.required && !SYSTEM_FIELDS.has(f.slug)).map((f) => f.slug);
  } catch {
    return [];
  }
}

export async function createBooking(input: {
  name: string;
  email: string;
  startISO: string;
  timeZone?: string;
  notes?: string;
}) {
  if (!bookingConfigured()) return { ok: false, error: "Booking isn't configured." };

  // A substantive answer that satisfies any min-length the form enforces.
  const base = input.notes?.trim();
  const answer =
    base && base.length >= 60
      ? base.slice(0, 480)
      : `${base ? base + " — " : ""}Discussed live with Junaid's AI assistant on the website; wants help scoping and building this. Junaid to follow up with specifics.`.slice(0, 480);

  // fill every required custom field (incl. title) with the answer
  const responses: Record<string, string> = {};
  const slugs = await requiredFieldSlugs();
  for (const slug of slugs) responses[slug] = slug === "title" ? `AI build call — ${input.name}` : answer;
  // belt-and-suspenders for the common slug even if the lookup misses
  responses[process.env.CAL_BUILDING_FIELD || "What-are-you-trying-to-build"] ??= answer;

  try {
    const r = await fetch(`${BASE}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey()}`,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventTypeId: Number(eventTypeId()),
        start: input.startISO,
        attendee: {
          name: input.name,
          email: input.email,
          timeZone: input.timeZone || defaultTz(),
          language: "en",
        },
        bookingFieldsResponses: responses,
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, error: data?.error?.message || JSON.stringify(data).slice(0, 300) };
    return { ok: true, uid: data?.data?.uid as string | undefined, start: data?.data?.start as string | undefined };
  } catch {
    return { ok: false, error: "Couldn't reach the calendar." };
  }
}
