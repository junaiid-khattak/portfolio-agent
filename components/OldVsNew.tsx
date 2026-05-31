import { Container, Eyebrow, Section } from "./ui";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { oldVsNew } from "@/lib/content";

export function OldVsNew() {
  return (
    <Section className="border-t border-line/60">
      <Container>
        <Reveal>
          <Eyebrow>The old way vs the new way</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            {oldVsNew.heading} <span className="text-text-muted">{oldVsNew.sub}</span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 flex flex-col gap-3">
          {/* header row */}
          <div className="hidden grid-cols-[1.4fr_1fr_1fr] gap-4 px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim sm:grid">
            <span>Product</span>
            <span className="text-cyan-bright">Built solo</span>
            <span>The old, team-based way</span>
          </div>

          {oldVsNew.rows.map((r) => (
            <StaggerItem key={r.product}>
              <div className="glass glass-hover grid grid-cols-1 gap-4 rounded-2xl p-6 sm:grid-cols-[1.4fr_1fr_1fr] sm:items-center">
                <div>
                  <p className="font-display text-lg font-semibold">{r.product}</p>
                  <p className="text-sm text-text-dim">{r.desc}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-gradient">{r.solo}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-bright sm:hidden">solo</span>
                </div>
                <div className="text-text-dim line-through decoration-line-bright/80">{r.old}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-text-muted">{oldVsNew.note}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-3xl font-display text-xl font-semibold leading-snug sm:text-2xl">
            {oldVsNew.line}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
