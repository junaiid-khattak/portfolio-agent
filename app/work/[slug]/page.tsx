import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Shot } from "@/components/Shot";
import { doerzProjects, getDoerzProject } from "@/lib/doerz";

export function generateStaticParams() {
  return doerzProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getDoerzProject(slug);
  if (!p) return { title: "Project · Junaid Khattak" };
  return { title: `${p.name} · Doerz project · Junaid Khattak`, description: p.summary };
}

export default async function DoerzProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getDoerzProject(slug);
  if (!p) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1 pt-32 sm:pt-40">
        <Container className="max-w-4xl pb-24">
          <Reveal>
            <Link href="/work" className="inline-flex items-center gap-1.5 text-sm text-text-dim transition-colors hover:text-text">
              <ArrowLeft className="size-4" /> All work
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-cyan-bright">{p.sector}</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{p.name}</h1>
            <p className="mt-3 text-xl text-text-muted">{p.tagline}</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-text-dim">{p.client} · {p.year} · Doerz</p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 text-lg leading-relaxed text-text-muted">{p.summary}</p>
          </Reveal>

          {/* gallery */}
          <Reveal delay={0.08}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {p.images.map((src, i) => (
                <div key={src} className={`overflow-hidden rounded-2xl border border-line bg-void ${p.images.length === 1 ? "sm:col-span-2" : ""}`}>
                  <Shot src={src} alt={`${p.name} screen ${i + 1}`} label={p.name} className="w-full" />
                </div>
              ))}
            </div>
          </Reveal>

          {/* features */}
          <Reveal delay={0.1}>
            <h2 className="mt-12 font-display text-xl font-bold">Key features</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-cyan-bright" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12 glass rounded-2xl p-6">
              <p className="text-text-muted">
                Delivered at <span className="text-text">Doerz</span>, the software agency Junaid founded and led as CTO (2→30 engineers, 40+ platforms).
              </p>
              <Link href="/#book" className="btn-glow mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm">
                Build something like this →
              </Link>
            </div>
          </Reveal>
        </Container>
      </main>
      <Footer />
    </>
  );
}
