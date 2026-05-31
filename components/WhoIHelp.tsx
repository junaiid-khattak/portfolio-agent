import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { TwinTrigger } from "./TwinTrigger";
import { whoIHelp } from "@/lib/content";

export function WhoIHelp() {
  return (
    <Section id="who-i-help" className="border-t border-line/60">
      <Container>
        <Reveal>
          <Eyebrow>Who I help</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Wherever you're starting from, there's a path.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {whoIHelp.map((w) => (
            <StaggerItem key={w.audience}>
              <div className="glass glass-hover flex h-full flex-col rounded-2xl p-7">
                <h3 className="font-display text-lg font-semibold text-text">{w.audience}</h3>
                <p className="mt-3 flex-1 text-text-muted">{w.line}</p>
                <TwinTrigger variant="ghost" className="mt-6 self-start px-5 py-2.5 text-sm">
                  Start here <ArrowRight className="size-4" />
                </TwinTrigger>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
