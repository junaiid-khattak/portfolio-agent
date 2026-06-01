import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Led } from "@/components/ui";
import { MDXContent } from "@/components/mdx";
import { MermaidRunner } from "@/components/MermaidRunner";
import { listDocs, getDocSource } from "@/lib/docs";
import { getProduct } from "@/lib/products";

export async function generateStaticParams() {
  const docs = await listDocs("case-studies");
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const docs = await listDocs("case-studies");
  const m = docs.find((d) => d.slug === slug);
  return { title: m ? `${m.title} · Case study · Junaid Khattak` : "Case study", description: m?.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = await getDocSource("case-studies", slug);
  if (!source) notFound();
  const docs = await listDocs("case-studies");
  const meta = docs.find((d) => d.slug === slug);
  const product = getProduct(slug);

  return (
    <>
      <Nav />
      <main className="flex-1 pt-32 sm:pt-40">
        <Container className="max-w-3xl pb-24">
          <Link href="/work" className="inline-flex items-center gap-1.5 text-sm text-text-dim transition-colors hover:text-text">
            <ArrowLeft className="size-4" /> All work
          </Link>

          <p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-cyan-bright">
            <Led /> Live case study
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{meta?.title}</h1>
          {meta?.summary && <p className="mt-4 text-xl text-text-muted">{meta.summary}</p>}

          {meta?.metrics && (
            <div className="mt-6 flex flex-wrap gap-2">
              {meta.metrics.map((m) => (
                <span key={m} className="rounded-full border border-line-bright px-3 py-1 font-mono text-[11px] text-text-muted">{m}</span>
              ))}
            </div>
          )}

          {product && (
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
              {product.liveLinks.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-cyan-bright hover:text-cyan">
                  {l.label} <ArrowUpRight className="size-3.5" />
                </a>
              ))}
            </div>
          )}

          <div className="mt-10 hairline" />

          <article className="mt-8">
            <MDXContent source={source} />
          </article>
          <MermaidRunner />

          <div className="mt-14 glass rounded-2xl p-6">
            <p className="text-text-muted">Want something like this built, fast?</p>
            <Link href="/#book" className="btn-glow mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm">Book a call →</Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
