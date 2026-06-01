import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { VideoGrid } from "@/components/VideoGrid";
import { CHANNEL_URL, featuredVideos, getLatestVideos } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Videos · Junaid Khattak",
  description: "Talks, build logs, and walkthroughs on AI-native development and shipping products solo.",
};

export const revalidate = 3600;

export default async function VideosPage() {
  const featured = featuredVideos();
  const latest = await getLatestVideos(9);
  // Don't repeat featured videos in the latest row.
  const featuredIds = new Set(featured.map((v) => v.id));
  const latestFiltered = latest.filter((v) => !featuredIds.has(v.id));
  const hasContent = featured.length > 0 || latestFiltered.length > 0;

  return (
    <>
      <Nav />
      <main className="flex-1 pt-32 sm:pt-40">
        <Container>
          <Reveal>
            <Eyebrow>Videos</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Build logs, talks & walkthroughs.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text-muted">
              How I think about AI-native development and shipping products solo, on video.
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-cyan-bright hover:text-cyan"
            >
              Subscribe on YouTube <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </Container>

        {featured.length > 0 && (
          <Container className="mt-14">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight">Featured</h2>
            </Reveal>
            <div className="mt-6">
              <VideoGrid videos={featured} />
            </div>
          </Container>
        )}

        {latestFiltered.length > 0 && (
          <Container className="mt-16 mb-24">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight">Latest uploads</h2>
              <p className="mt-2 text-text-muted">Pulled live from the channel.</p>
            </Reveal>
            <div className="mt-6">
              <VideoGrid videos={latestFiltered} />
            </div>
          </Container>
        )}

        {!hasContent && (
          <Container className="mt-14 mb-24">
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-text-muted">
                Videos are coming soon. In the meantime, catch the channel on{" "}
                <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="text-cyan-bright hover:text-cyan">
                  YouTube
                </a>
                .
              </p>
            </div>
          </Container>
        )}
      </main>
      <Footer />
    </>
  );
}
