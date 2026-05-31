import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui";
import { MDXContent } from "@/components/mdx";
import { listDocs, getDocSource } from "@/lib/docs";

export async function generateStaticParams() {
  const docs = await listDocs("blog");
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const docs = await listDocs("blog");
  const m = docs.find((d) => d.slug === slug);
  return {
    title: m ? `${m.title} — Junaid Khattak` : "Writing",
    description: m?.summary,
    alternates: m?.canonical ? { canonical: m.canonical } : undefined,
  };
}

function fmtDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = await getDocSource("blog", slug);
  if (!source) notFound();
  const docs = await listDocs("blog");
  const meta = docs.find((d) => d.slug === slug);

  return (
    <>
      <Nav />
      <main className="flex-1 pt-32 sm:pt-40">
        <Container className="max-w-3xl pb-24">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-text-dim transition-colors hover:text-text">
            <ArrowLeft className="size-4" /> All writing
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-text-dim">
            <span>{fmtDate(meta?.date)}</span>
            {meta?.tags?.map((t) => (
              <span key={t} className="rounded-full border border-line px-2 py-0.5 text-text-muted">{t}</span>
            ))}
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{meta?.title}</h1>
          {meta?.summary && <p className="mt-4 text-xl text-text-muted">{meta.summary}</p>}

          {meta?.canonical && (
            <a href={meta.canonical} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm text-cyan-bright hover:text-cyan">
              Read the original on Medium <ArrowUpRight className="size-3.5" />
            </a>
          )}

          <div className="mt-8 hairline" />

          <article className="mt-8">
            <MDXContent source={source} />
          </article>

          {meta?.canonical && (
            <p className="mt-12 text-sm text-text-dim">
              Originally published on{" "}
              <a href={meta.canonical} target="_blank" rel="noreferrer" className="text-cyan-bright hover:text-cyan">Medium</a>.
            </p>
          )}

          <div className="mt-10 glass rounded-2xl p-6">
            <p className="text-text-muted">Building something and want a second pair of hands?</p>
            <Link href="/#book" className="btn-glow mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm">Book a call →</Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
