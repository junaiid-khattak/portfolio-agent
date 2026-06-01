import type { Metadata } from "next";
import { CalendarCheck, ClipboardList, Search, Workflow, MessageSquare, Check, ArrowRight, Sparkles } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow, Section, Led, GhostButton, Tag } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { TwinTrigger } from "@/components/TwinTrigger";
import { agentsOffer as a } from "@/lib/content";

export const metadata: Metadata = {
  title: "Custom AI Agents for your business · Junaid Khattak",
  description:
    "I build AI agents that automate real work: answering and booking customers 24/7, support, data and back-office tasks, research and monitoring, and voice. Wired into the tools you already run on (MindBody, Cal.com, your CRM, Slack, your database).",
  alternates: { canonical: "/agents" },
  openGraph: {
    title: "Custom AI Agents for your business",
    description:
      "Give an agent the right tools and it runs the work, customer-facing or behind the scenes. Like the one you can chat with on this site. Built solo, live in 1-2 weeks.",
    url: "https://www.junaidkhattak.com/agents",
    type: "website",
  },
};

const JOB_ICONS = [CalendarCheck, ClipboardList, Search, Workflow];

export default function AgentsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero / offer */}
        <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="animate-float-slow absolute -top-24 left-[10%] size-[32rem] rounded-full bg-violet/25 blur-[120px]" />
            <div className="animate-float-slow absolute top-0 right-[4%] size-[26rem] rounded-full bg-cyan/20 blur-[120px] [animation-delay:-4s]" />
          </div>
          <Container>
            <Reveal>
              <Eyebrow>{a.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                {a.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-muted">{a.sub}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <TwinTrigger className="px-7 py-3.5">
                  <MessageSquare className="size-4" />
                  {a.primaryCta}
                </TwinTrigger>
                <GhostButton href="/#book" className="px-7 py-3.5">
                  {a.secondaryCta}
                </GhostButton>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[12px] text-text-dim">
                <span className="text-gradient font-semibold">{a.priceBuild}</span>
                <span className="text-line-bright">·</span>
                <span className="text-gradient font-semibold">{a.priceManaged}</span>
                <span className="w-full text-text-dim sm:w-auto sm:before:mx-2 sm:before:content-['—']">{a.priceNote}</span>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* What your agent does */}
        <Section className="border-t border-line/60">
          <Container>
            <Reveal>
              <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">What your agent does</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {a.jobs.map((j, i) => {
                const Icon = JOB_ICONS[i] ?? Sparkles;
                return (
                  <StaggerItem key={j.title}>
                    <div className="glass glass-hover flex h-full gap-4 rounded-2xl p-6">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet/15 text-violet-bright">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold">{j.title}</h3>
                        <p className="mt-1.5 text-text-muted">{j.body}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>

            {/* Channels + integrations */}
            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="glass rounded-2xl p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">Runs on the channels you want</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.channels.map((c) => <Tag key={c}>{c}</Tag>)}
                  </div>
                </div>
                <div className="glass rounded-2xl p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">Plugs into your existing tools</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.integrations.map((c) => <Tag key={c}>{c}</Tag>)}
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* How it works */}
        <Section className="border-t border-line/60">
          <Container>
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Grounded in your facts. Wired to your tools.
              </h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
              {a.steps.map((s) => (
                <StaggerItem key={s.n}>
                  <div className="glass flex h-full flex-col rounded-2xl p-6">
                    <span className="font-mono text-sm text-gradient">{s.n}</span>
                    <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-text-muted">{s.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        {/* Live proof */}
        <Section className="border-t border-line/60">
          <Container>
            <Reveal>
              <div className="glass glow-violet relative overflow-hidden rounded-3xl p-8 sm:p-12">
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-cyan/15 blur-[90px]" />
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-cyan-bright">
                  <Led /> You&apos;re already talking to one
                </p>
                <p className="mt-5 max-w-3xl text-xl leading-relaxed text-text-muted">{a.proof}</p>
                <div className="mt-8">
                  <TwinTrigger className="px-7 py-3.5">
                    <MessageSquare className="size-4" />
                    Try the live agent
                  </TwinTrigger>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="border-t border-line/60">
          <Container className="max-w-3xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Questions, answered straight</h2>
            </Reveal>
            <div className="mt-8 flex flex-col divide-y divide-line">
              {a.faqs.map((f) => (
                <Reveal key={f.q}>
                  <div className="py-5">
                    <p className="flex items-start gap-2 font-display text-lg font-semibold">
                      <Check className="mt-1 size-4 shrink-0 text-cyan-bright" /> {f.q}
                    </p>
                    <p className="mt-2 pl-6 text-text-muted">{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-12 glass rounded-2xl p-6 text-center">
                <p className="text-text-muted">Tell me what work eats your team&apos;s day. I&apos;ll tell you exactly what your agent would take off their plate.</p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <TwinTrigger className="px-7 py-3.5">
                    <MessageSquare className="size-4" /> {a.primaryCta}
                  </TwinTrigger>
                  <GhostButton href="/#book" className="px-7 py-3.5">
                    {a.secondaryCta} <ArrowRight className="size-4" />
                  </GhostButton>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
