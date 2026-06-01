import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow, Led } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Shot } from "@/components/Shot";
import { DoerzGrid } from "@/components/DoerzGrid";
import { products } from "@/lib/products";
import { doerzProjects } from "@/lib/doerz";

export const metadata: Metadata = {
  title: "Work · Junaid Khattak",
  description: "Live AI products built solo, plus 40+ platforms delivered at Doerz across fitness, healthcare, legal, e-commerce and more.",
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-32 sm:pt-40">
        <Container>
          <Reveal>
            <Eyebrow>Work</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              What I&apos;ve built, and shipped.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text-muted">
              Live AI products built solo, each with a full technical case study. Plus {doerzProjects.length}+ platforms
              delivered at my agency, Doerz, across nine sectors.
            </p>
          </Reveal>
        </Container>

        {/* Live products → case studies */}
        <Container className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight">Live AI products</h2>
            <p className="mt-2 text-text-muted">Each built solo. Read the deep technical case study.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link key={p.slug} href={`/case-studies/${p.slug}`} className="glass glass-hover group flex flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line/70 bg-void">
                  <Shot src={p.image} alt={p.name} label={p.name} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-line-bright bg-void/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-bright backdrop-blur">
                    <Led /> Live
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-text-dim">{p.tagline}</p>
                  <p className="mt-3 text-sm text-gradient font-semibold">{p.built}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-bright">
                    Read case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>

        {/* Doerz portfolio */}
        <Container className="mt-20 mb-24">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight">Agency portfolio · Doerz</h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              A selection of the platforms I delivered as founder & CTO of Doerz: research, UI/UX, and full-stack mobile + web. Filter by sector.
            </p>
          </Reveal>
          <div className="mt-8">
            <DoerzGrid />
          </div>
          <p className="mt-8 text-sm text-text-dim">
            More at{" "}
            <a href="https://doerz.tech/case-studies/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-bright hover:text-cyan">
              doerz.tech/case-studies <ArrowUpRight className="size-3.5" />
            </a>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
