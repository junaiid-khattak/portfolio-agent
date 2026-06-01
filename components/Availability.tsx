import { CalendarClock } from "lucide-react";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";
import { CalEmbed } from "./CalEmbed";
import { availability } from "@/lib/content";

export function Availability() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK?.trim();

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
              ) : (
                <div className="flex h-[420px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line-bright text-center">
                  <CalendarClock className="size-8 text-violet-bright" />
                  <p className="max-w-xs text-sm text-text-muted">Cal.com booking embeds here.</p>
                  <p className="font-mono text-[11px] text-text-dim">
                    set <span className="text-cyan-bright">NEXT_PUBLIC_CAL_LINK</span> to your cal.com event link
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
