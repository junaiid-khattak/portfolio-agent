// Ingest knowledge/*.md into Supabase kb_chunks (chunk → embed → upsert).
// Run: pnpm ingest   (which is: node --env-file=.env.local scripts/ingest.mjs)
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: SERVICE_KEY, OPENAI_API_KEY: OPENAI_KEY } = process.env;
const MODEL = process.env.EMBEDDING_MODEL || "text-embedding-3-small";
const KB_DIR = path.join(process.cwd(), "knowledge");

if (!SUPABASE_URL || !SERVICE_KEY || !OPENAI_KEY) {
  console.error("Missing env. Need SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY.");
  console.error("Run: node --env-file=.env.local scripts/ingest.mjs  (or: pnpm ingest)");
  process.exit(1);
}

// Split a markdown doc into chunks by H2 (## ...), size-capped ~1200 chars.
function chunkMarkdown(text, source) {
  const out = [];
  for (const sec of text.split(/\n(?=## )/g)) {
    const body = sec.trim();
    if (!body) continue;
    const title = (body.match(/^##\s+(.+)/m)?.[1] || source).trim();
    if (body.length <= 1500) { out.push({ title, content: body }); continue; }
    let buf = "";
    for (const para of body.split(/\n\n+/)) {
      if (buf && (buf + "\n\n" + para).length > 1200) { out.push({ title, content: buf.trim() }); buf = para; }
      else buf = buf ? buf + "\n\n" + para : para;
    }
    if (buf.trim()) out.push({ title, content: buf.trim() });
  }
  return out;
}

async function embedBatch(texts) {
  const r = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, input: texts }),
  });
  if (!r.ok) throw new Error("embed failed: " + (await r.text()).slice(0, 300));
  return (await r.json()).data.map((x) => x.embedding);
}

async function rest(method, q, body) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${q}`, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok && r.status !== 204) throw new Error(`${method} ${q} -> ${r.status} ${(await r.text()).slice(0, 200)}`);
}

const files = (await readdir(KB_DIR)).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
const all = [];
for (const f of files) {
  const source = f.replace(/\.md$/, "");
  const chunks = chunkMarkdown(await readFile(path.join(KB_DIR, f), "utf8"), source).map((c) => ({ ...c, source }));
  all.push(...chunks);
  console.log(`  ${f}: ${chunks.length} chunks`);
}
console.log(`Total ${all.length} chunks from ${files.length} files. Clearing + embedding…`);

await rest("DELETE", "kb_chunks?id=neq.00000000-0000-0000-0000-000000000000");

const BATCH = 64;
for (let i = 0; i < all.length; i += BATCH) {
  const batch = all.slice(i, i + BATCH);
  const embs = await embedBatch(batch.map((c) => `${c.title}\n\n${c.content}`));
  const rows = batch.map((c, j) => ({ source: c.source, title: c.title, content: c.content, embedding: `[${embs[j].join(",")}]` }));
  await rest("POST", "kb_chunks", rows);
  console.log(`  inserted ${Math.min(i + BATCH, all.length)}/${all.length}`);
}
console.log("✓ Knowledge base ingested.");
