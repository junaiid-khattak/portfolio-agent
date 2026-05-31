import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { listDocs } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Writing — Junaid Khattak",
  description: "Essays and engineering notes on AI-native software development, ML, and shipping production software solo. Mirrored from Medium.",
};

function fmtDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPage() {
  const posts = await listDocs("blog");
  return (
    <>
      <Nav />
      <main className="flex-1 pt-32 sm:pt-40">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>Writing</Eyebrow>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Notes on building with AI.
            </h1>
            <p className="mt-5 text-lg text-text-muted">
              Essays and engineering notes — from ML fundamentals to today's AI-native product building.
              Mirrored here from{" "}
              <a href="https://medium.com/@junaid.khattak" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-bright hover:text-cyan">
                Medium <ArrowUpRight className="size-3.5" />
              </a>
              .
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col divide-y divide-line">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <Link href={`/blog/${p.slug}`} className="group flex flex-col gap-2 py-6 transition-colors">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-text-dim">
                    <span>{fmtDate(p.date)}</span>
                    {p.tags?.[0] && <span className="text-cyan-bright">· {p.tags[0]}</span>}
                  </div>
                  <h2 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-gradient sm:text-2xl">
                    {p.title}
                  </h2>
                  {p.summary && <p className="text-text-muted">{p.summary}</p>}
                  <span className="mt-1 inline-flex items-center gap-1 text-sm text-cyan-bright">
                    Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
