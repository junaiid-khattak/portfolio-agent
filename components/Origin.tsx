import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";
import { origin } from "@/lib/content";

export function Origin() {
  return (
    <Section className="border-t border-line/60">
      <Container className="max-w-4xl">
        <Reveal>
          <Eyebrow>Why me</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">{origin.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 text-lg leading-relaxed text-text-muted">{origin.body}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-8 font-display text-2xl font-bold leading-snug sm:text-3xl">
            <span className="text-gradient">{origin.punch}</span>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
