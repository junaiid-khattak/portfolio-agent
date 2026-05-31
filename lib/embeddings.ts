// OpenAI embeddings (text-embedding-3-small, 1536 dims) for the knowledge base.
const MODEL = process.env.EMBEDDING_MODEL || "text-embedding-3-small";

export const embeddingsConfigured = () => Boolean(process.env.OPENAI_API_KEY);

export async function embed(texts: string[]): Promise<number[][]> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY required for embeddings");
  const r = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, input: texts }),
  });
  if (!r.ok) throw new Error(`embedding failed: ${(await r.text()).slice(0, 200)}`);
  const d = await r.json();
  return (d.data as { embedding: number[] }[]).map((x) => x.embedding);
}
