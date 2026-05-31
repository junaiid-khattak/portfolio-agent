-- Knowledge base for the digital twin (RAG). Run once in the Supabase SQL editor.
-- Uses pgvector with OpenAI text-embedding-3-small (1536 dims).

create extension if not exists vector;

create table if not exists public.kb_chunks (
  id uuid primary key default gen_random_uuid(),
  source text not null,          -- e.g. "doerz", "products", "background"
  title text,                    -- section/heading
  content text not null,
  embedding vector(1536),
  created_at timestamptz default now()
);

create index if not exists kb_chunks_embedding_idx
  on public.kb_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- service-role only (the agent searches via the server)
alter table public.kb_chunks enable row level security;

-- cosine-similarity search used by the search_knowledge tool
create or replace function public.match_kb_chunks(
  query_embedding vector(1536),
  match_count int default 6
)
returns table (id uuid, source text, title text, content text, similarity float)
language sql stable
as $$
  select id, source, title, content, 1 - (embedding <=> query_embedding) as similarity
  from public.kb_chunks
  where embedding is not null
  order by embedding <=> query_embedding
  limit match_count;
$$;
