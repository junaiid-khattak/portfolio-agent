import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Container, Eyebrow, Section, Led } from "./ui";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { proof, site } from "@/lib/content";

const CASE_STUDY_SLUG: Record<string, string> = {
  "Nayld Prep": "nayld-prep",
  "Nayld Hire": "nayld-hire",
  ClinicSynch: "clinicsynch",
  "PSX Intelligence": "psx",
};

export function Proof() {
  return (
    <Section id="proof" className="border-t border-line/60">
      <Container>
        <Reveal>
          <Eyebrow>Proof</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            {proof.heading}
          </h2>
        </Reveal>

        {/* live products */}
        <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {proof.products.map((p) => (
            <StaggerItem key={p.name}>
              <div className="glass glass-hover flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-cyan-bright">
                    <Led /> Live
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{p.name}</h3>
                <p className="text-sm text-text-dim">{p.tag}</p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-lg font-bold text-gradient">{p.built}</span>
                  <span className="font-mono text-[11px] text-text-dim">{p.old}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.metrics.map((m) => (
                    <span key={m} className="rounded-full border border-line-bright px-2.5 py-1 font-mono text-[11px] text-text-muted">
                      {m}
                    </span>
                  ))}
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">{p.detail}</p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-cyan-bright transition-colors hover:text-cyan"
                    >
                      {l.label} <ArrowUpRight className="size-3.5" />
                    </a>
                  ))}
                </div>

                {CASE_STUDY_SLUG[p.name] && (
                  <Link
                    href={`/case-studies/${CASE_STUDY_SLUG[p.name]}`}
                    className="mt-4 inline-flex items-center gap-1 border-t border-line/60 pt-4 text-sm font-medium text-text transition-colors hover:text-gradient"
                  >
                    Read the technical case study <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* track record band */}
        <Reveal delay={0.08} className="mt-6">
          <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
            {proof.track.map((t) => (
              <div key={t.label} className="bg-void/30 px-6 py-7 text-center">
                <p className="font-display text-3xl font-bold text-gradient">{t.value}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-dim">{t.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* upwork insight chips */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-dim">
              Upwork insights from completed jobs:
            </span>
            {proof.insights.map((c) => (
              <span key={c} className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs text-violet-bright">
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        {/* reviews */}
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {proof.reviews.map((r, i) => (
            <StaggerItem key={i}>
              <figure className="glass flex h-full flex-col rounded-2xl p-6">
                <blockquote className="flex-1 text-sm leading-relaxed text-text-muted">“{r.quote}”</blockquote>
                <figcaption className="mt-4">
                  <span className="block font-display text-sm font-semibold text-text">
                    {r.name ? r.name : r.role}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-wider text-cyan-bright">
                    {r.name ? `${r.role} · ${r.meta}` : r.meta}
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.05}>
          <a
            href={site.links.upwork}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
          >
            See all 18 reviews on Upwork <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
