import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";
import { background, oldVsNew } from "@/lib/content";

export function Background() {
  return (
    <Section id="background" className="border-t border-line/60">
      <Container>
        <Reveal>
          <Eyebrow>{background.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {background.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-text-muted">
            <p>{background.lead}</p>
            <p>{background.shift}</p>
          </div>
        </Reveal>

        {/* compact proof: built-solo vs old-team timelines */}
        <Reveal delay={0.12}>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">{background.rowsCaption}</p>
          <div className="glass mt-3 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3">
            {oldVsNew.rows.map((r) => (
              <div key={r.product} className="bg-void/30 p-5">
                <p className="font-display text-base font-semibold">{r.product}</p>
                <p className="text-sm text-text-dim">{r.desc}</p>
                <p className="mt-3 font-display text-lg font-bold text-gradient">{r.solo}</p>
                <p className="font-mono text-[11px] text-text-dim">vs {r.old}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-8 max-w-2xl text-text-muted">{background.thesis}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
