import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";
import { honestMath } from "@/lib/content";

export function HonestMath() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <Reveal>
          <Eyebrow>The honest math</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {honestMath.heading}
          </h2>
        </Reveal>
        {honestMath.body.map((p, i) => (
          <Reveal key={i} delay={0.1}>
            <p className="mt-7 text-lg leading-relaxed text-text-muted">{p}</p>
          </Reveal>
        ))}
        <Reveal delay={0.14}>
          <p className="mt-7 border-l-2 border-violet pl-5 text-lg leading-relaxed text-text sm:text-xl">
            {honestMath.punch}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-7 font-display text-xl font-semibold text-cyan-bright">{honestMath.kicker}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
