import { ArrowUpRight, MessageSquare } from "lucide-react";
import { Container, Eyebrow, GhostButton } from "./ui";
import { TwinTrigger } from "./TwinTrigger";
import { Reveal } from "./Reveal";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      {/* aurora blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float-slow absolute -top-24 left-[8%] size-[34rem] rounded-full bg-violet/25 blur-[120px]" />
        <div className="animate-float-slow absolute top-10 right-[2%] size-[28rem] rounded-full bg-cyan/20 blur-[120px] [animation-delay:-4s]" />
      </div>

      <Container>
        <Reveal>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="text-text-muted">{hero.headlineLead}</span>{" "}
            <span className="text-gradient">{hero.headlinePunch}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-muted">{hero.subhead}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <TwinTrigger className="px-7 py-3.5">
              <MessageSquare className="size-4" />
              {hero.primaryCta}
            </TwinTrigger>
            <GhostButton href="#book" className="px-7 py-3.5">
              {hero.secondaryCta}
              <ArrowUpRight className="size-4" />
            </GhostButton>
          </div>
        </Reveal>
      </Container>

      {/* trust marquee */}
      <Reveal delay={0.28} className="mt-16">
        <div className="relative overflow-hidden border-y border-line/70 py-4">
          <div className="flex w-max animate-marquee gap-10">
            {[...hero.trust, ...hero.trust, ...hero.trust, ...hero.trust].map((t, i) => (
              <span key={i} className="flex items-center gap-10 font-mono text-xs tracking-[0.15em] text-text-dim">
                {t}
                <span className="text-violet-bright">◆</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
