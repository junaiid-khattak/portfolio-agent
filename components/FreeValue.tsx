import { MessageSquare, FileSearch } from "lucide-react";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";
import { TwinTrigger } from "./TwinTrigger";
import { freeValue } from "@/lib/content";

export function FreeValue() {
  return (
    <Section className="border-t border-line/60">
      <Container>
        <Reveal>
          <div className="glass glow-violet relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-cyan/15 blur-[90px]" />
            <Eyebrow>No-risk first step</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {freeValue.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-text-muted">{freeValue.body}</p>
            <p className="mt-4 max-w-2xl text-base text-text-muted">{freeValue.secondary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TwinTrigger className="px-7 py-3.5">
                <MessageSquare className="size-4" />
                {freeValue.primaryCta}
              </TwinTrigger>
              <a
                href="mailto:junaid@nayld.ai?subject=Free%20AI%20Build%20Audit"
                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm"
              >
                <FileSearch className="size-4" />
                {freeValue.secondaryCta}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
