"use client";

import { motion } from "motion/react";
import { ArrowRight, BrainCircuit, Database, Terminal, Palette, CheckCircle2, Loader2, Circle } from "lucide-react";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";
import { howIWork } from "@/lib/content";

const icons: Record<string, React.ReactNode> = {
  plan: <BrainCircuit className="size-5" />,
  brain: <Database className="size-5" />,
  exec: <Terminal className="size-5" />,
  design: <Palette className="size-5" />,
};

const statusMap = {
  done: { label: "done", cls: "text-cyan-bright", icon: <CheckCircle2 className="size-3.5" /> },
  executing: { label: "executing", cls: "text-violet-bright", icon: <Loader2 className="size-3.5 animate-spin" /> },
  queued: { label: "queued", cls: "text-text-dim", icon: <Circle className="size-3.5" /> },
} as const;

export function HowIWork() {
  return (
    <Section id="how-i-work" className="border-t border-line/60">
      {/* this section leans into the "engine room" — a touch darker + glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 size-[40rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
      </div>
      <Container>
        <Reveal>
          <Eyebrow>How I work</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            {howIWork.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-text-muted">{howIWork.body}</p>
        </Reveal>

        {/* orchestration pipeline */}
        <div className="mt-14 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          {howIWork.pipeline.map((node, i) => (
            <div key={node.id} className="flex flex-col items-stretch gap-4 lg:flex-1 lg:flex-row lg:items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="glass glass-hover flex-1 rounded-2xl p-5"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-violet/15 text-violet-bright">
                  {icons[node.id]}
                </div>
                <p className="mt-4 font-display font-semibold">{node.label}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-dim">{node.role}</p>
              </motion.div>
              {i < howIWork.pipeline.length - 1 && (
                <ArrowRight className="mx-auto size-5 shrink-0 rotate-90 text-violet-bright/70 lg:rotate-0 led" />
              )}
            </div>
          ))}
        </div>

        {/* sub-agent task board */}
        <Reveal delay={0.1} className="mt-8">
          <div className="glass rounded-2xl p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">sub-agents · live task board</p>
              <span className="flex items-center gap-2 font-mono text-[11px] text-cyan-bright">
                <span className="led size-1.5 rounded-full bg-cyan-bright text-cyan-bright" /> running
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {howIWork.agents.map((a) => {
                const s = statusMap[a.status as keyof typeof statusMap];
                return (
                  <div key={a.name} className="flex items-center justify-between rounded-xl border border-line/80 bg-void/40 px-4 py-3">
                    <div>
                      <p className="font-mono text-sm text-text">{a.name}</p>
                      <p className="text-xs text-text-dim">{a.task}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider ${s.cls}`}>
                      {s.icon}
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-text-muted">{howIWork.closer}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
