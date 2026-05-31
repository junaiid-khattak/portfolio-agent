import { getSupabaseAdmin } from "./supabase";
import { embed, embeddingsConfigured } from "./embeddings";

export type KbChunk = { title?: string; content: string; source: string; similarity?: number };

/**
 * Semantic search over the knowledge base. Embeds the query, runs cosine
 * similarity via the match_kb_chunks RPC. Degrades gracefully when the DB or
 * embeddings key isn't configured.
 */
export async function searchKnowledge(query: string, k = 6): Promise<{ ok: boolean; chunks: KbChunk[]; error?: string }> {
  const db = getSupabaseAdmin();
  if (!db || !embeddingsConfigured()) return { ok: false, chunks: [], error: "knowledge base not configured" };
  try {
    const [queryEmbedding] = await embed([query]);
    const { data, error } = await db.rpc("match_kb_chunks", { query_embedding: queryEmbedding, match_count: k });
    if (error) return { ok: false, chunks: [], error: error.message };
    const chunks = ((data ?? []) as KbChunk[]).map((c) => ({ title: c.title, content: c.content, source: c.source }));
    return { ok: true, chunks };
  } catch (e) {
    return { ok: false, chunks: [], error: e instanceof Error ? e.message : String(e) };
  }
}
