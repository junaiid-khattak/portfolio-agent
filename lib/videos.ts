import "server-only";

/**
 * YouTube configuration.
 *
 * To finish wiring this up, Junaid needs to provide:
 *   1. CHANNEL_ID — the channel's UC… id (NOT the @handle). Find it at
 *      youtube.com/account_advanced, or view-source on the channel page and
 *      search for "channelId". Can also be set via env: YOUTUBE_CHANNEL_ID.
 *   2. FEATURED — hand-picked video IDs (the v= part of a watch URL) to pin
 *      at the top, in order. Optional title override per video.
 *
 * "Latest" auto-populates from the channel RSS feed (no API key needed).
 */
export const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "UCwgGAtdtyttNSnRqScqEHoA";
export const CHANNEL_URL = "https://www.youtube.com/@junaidbuilds";

export const FEATURED: { id: string; title?: string }[] = [
  { id: "oYP_jpznm78", title: "I Built 3 SaaS Products in 6 Months. Then I…" },
];

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published?: string;
};

const RSS = (channelId: string) =>
  `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

/** Fetch latest uploads from the channel RSS feed. Returns [] on any failure. */
export async function getLatestVideos(limit = 9): Promise<Video[]> {
  if (!CHANNEL_ID) return [];
  try {
    const res = await fetch(RSS(CHANNEL_ID), { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    const videos: Video[] = [];
    for (const entry of entries) {
      const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1];
      if (!id || !title) continue;
      videos.push({
        id,
        title: decode(title.trim()),
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        published,
      });
    }
    return videos.slice(0, limit);
  } catch {
    return [];
  }
}

export function featuredVideos(): Video[] {
  return FEATURED.map((f) => ({
    id: f.id,
    title: f.title ?? "",
    url: `https://www.youtube.com/watch?v=${f.id}`,
    thumbnail: `https://i.ytimg.com/vi/${f.id}/hqdefault.jpg`,
  }));
}
