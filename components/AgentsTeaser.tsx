import Link from "next/link";
import { CalendarCheck, ClipboardList, Search, ArrowRight, MessageSquare } from "lucide-react";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { TwinTrigger } from "./TwinTrigger";
import { agentsOffer as a } from "@/lib/content";

const ICONS = [CalendarCheck, ClipboardList, Search];

export function AgentsTeaser() {
  return (
    <Section id="agents" className="border-t border-line/60">
      <Container>
        <Reveal>
          <Eyebrow>{a.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Whatever repetitive work eats your team&apos;s hours, <span className="text-gradient">I&apos;ll build an agent to run it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg text-text-muted">{a.sub}</p>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {a.jobs.slice(0, 3).map((j, i) => {
            const Icon = ICONS[i] ?? CalendarCheck;
            return (
              <StaggerItem key={j.title}>
                <div className="glass glass-hover flex h-full flex-col rounded-2xl p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-violet/15 text-violet-bright">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{j.title}</h3>
                  <p className="mt-1.5 flex-1 text-text-muted">{j.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
            <TwinTrigger className="px-7 py-3.5">
              <MessageSquare className="size-4" />
              {a.primaryCta}
            </TwinTrigger>
            <Link href="/agents" className="inline-flex items-center gap-1.5 text-sm text-cyan-bright transition-colors hover:text-cyan">
              See how it works <ArrowRight className="size-4" />
            </Link>
            <span className="font-mono text-[12px] text-text-dim">
              <span className="text-gradient font-semibold">{a.priceBuild}</span> · live in 1-2 weeks
            </span>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
