import Link from "next/link";
import { ArrowRight, PenLine, Play, FolderGit2 } from "lucide-react";
import { Container, Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";
import { listDocs } from "@/lib/docs";

function fmtDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export async function LatestWriting() {
  const posts = (await listDocs("blog")).slice(0, 3);

  return (
    <Section id="latest" className="border-t border-line/60">
      <Container>
        <Reveal>
          <Eyebrow>Go deeper</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Case studies, writing & video.
          </h2>
          <p className="mt-4 max-w-2xl text-text-muted">
            The full technical breakdowns, essays on building with AI, and walkthroughs on video.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {/* Work */}
          <Reveal>
            <Link href="/work" className="glass glass-hover flex h-full flex-col rounded-2xl p-6">
              <FolderGit2 className="size-5 text-cyan-bright" />
              <h3 className="mt-4 font-display text-lg font-semibold">Work & case studies</h3>
              <p className="mt-2 flex-1 text-sm text-text-muted">
                Three live AI products with deep technical write-ups, plus 20+ platforms shipped at my agency.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-bright">
                Explore work <ArrowRight className="size-4" />
              </span>
            </Link>
          </Reveal>

          {/* Writing list */}
          <Reveal delay={0.05}>
            <div className="glass flex h-full flex-col rounded-2xl p-6">
              <PenLine className="size-5 text-cyan-bright" />
              <h3 className="mt-4 font-display text-lg font-semibold">Latest writing</h3>
              <ul className="mt-3 flex-1 space-y-3">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="group block">
                      <span className="block text-sm font-medium text-text transition-colors group-hover:text-cyan-bright">
                        {p.title}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-dim">{fmtDate(p.date)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/blog" className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-bright">
                All writing <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          {/* Videos */}
          <Reveal delay={0.1}>
            <Link href="/videos" className="glass glass-hover flex h-full flex-col rounded-2xl p-6">
              <Play className="size-5 text-cyan-bright" />
              <h3 className="mt-4 font-display text-lg font-semibold">Videos</h3>
              <p className="mt-2 flex-1 text-sm text-text-muted">
                Build logs, talks, and walkthroughs on AI-native development and shipping solo.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-bright">
                Watch <ArrowRight className="size-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
