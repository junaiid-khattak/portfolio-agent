import { CalendarClock, ArrowUpRight } from "lucide-react";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";
import { BookingEmbed } from "./BookingEmbed";
import { CalEmbed } from "./CalEmbed";
import { availability } from "@/lib/content";

export function Availability() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK?.trim();
  const raw = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  // Only Google's appointment-schedule URL (…/appointments/schedules/…?gv=true) is
  // iframe-embeddable. Short share links (calendar.app.google/…) refuse to frame,
  // so we open those in a new tab instead of showing a broken embed.
  const isEmbeddable = !!raw && /\/appointments\/schedules\//.test(raw);
  const embedUrl =
    isEmbeddable && !/[?&]gv=true/.test(raw!) ? `${raw}${raw!.includes("?") ? "&" : "?"}gv=true` : raw;

  return (
    <Section id="book" className="border-t border-line/60">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <Eyebrow>Availability</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {availability.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-muted">{availability.body}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="glass rounded-2xl px-5 py-4">
                  <p className="font-display text-2xl font-bold text-gradient">{availability.consultSlotsLeft}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-dim">consult slots left this week</p>
                </div>
                <div className="glass rounded-2xl px-5 py-4">
                  <p className="font-display text-2xl font-bold text-gradient">
                    {availability.buildSlotsOpen} / {availability.buildSlotsTotal}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-dim">build slots open</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass glow-cyan rounded-3xl p-3">
              {calLink ? (
                <div className="h-[620px] overflow-hidden rounded-2xl">
                  <CalEmbed calLink={calLink} />
                </div>
              ) : isEmbeddable ? (
                <BookingEmbed src={embedUrl!} />
              ) : raw ? (
                <div className="flex h-[420px] flex-col items-center justify-center gap-5 rounded-2xl border border-line-bright/70 bg-void/40 px-6 text-center">
                  <span className="grid size-14 place-items-center rounded-2xl bg-violet/15 text-violet-bright">
                    <CalendarClock className="size-7" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold">Grab a time on my calendar</p>
                    <p className="mt-1 text-sm text-text-muted">Opens my live Google Calendar availability.</p>
                  </div>
                  <a href={raw} target="_blank" rel="noreferrer" className="btn-glow inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm">
                    Book a call <ArrowUpRight className="size-4" />
                  </a>
                </div>
              ) : (
                <div className="flex h-[420px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line-bright text-center">
                  <CalendarClock className="size-8 text-violet-bright" />
                  <p className="max-w-xs text-sm text-text-muted">Google Calendar scheduling embeds here.</p>
                  <p className="font-mono text-[11px] text-text-dim">
                    set <span className="text-cyan-bright">NEXT_PUBLIC_BOOKING_URL</span> to your appointment-schedule embed link
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
