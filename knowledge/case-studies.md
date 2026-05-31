# Case studies — technical deep-dives

Detailed technical breakdowns of Junaid's three live AI products, published as case studies at junaidkhattak.com/case-studies. Use these to answer specific questions about how the products were architected.

Nayld is one product with two separate apps, both built solo in ~6 weeks: **Nayld Prep** (nayld.ai, the candidate side) and **Nayld Hire** (hire.nayld.ai, the employer side). They share a pnpm/Turbo monorepo and the @nayld/auth + @nayld/supabase packages, and both use the same realtime voice stack.

## Nayld Prep — realtime AI voice-interview practice (junaidkhattak.com/case-studies/nayld-prep)
The candidate side (nayld.ai). Candidates run realistic mock interviews against a realtime voice agent they actually talk to, then get structured feedback.

- **Realtime voice agents** over WebRTC from the browser, sub-second latency. Tiered agents (lighter realtime model for quick screening-style sessions, stronger model for deep role-specific mock interviews), each with its own persona, voice, prompt, and duration. Voice-activity-detection-tuned turn-taking so the agent doesn't talk over the candidate and knows when an answer is actually finished. Prompt architecture keeps the agent in character across 20-minute conversations, asks sensible follow-ups, and emits structured JSON scoring at the end. Fallback/retry handling when the realtime API hits limits mid-call.
- **Structured feedback**: every session produces a report — strengths, areas to improve, per-dimension breakdown — persisted to Supabase and shown back to the candidate.
- **Stack**: Next.js 14/16, React 18/19, TypeScript, Supabase/Postgres, OpenAI Realtime API + GPT-4o, AWS Amplify.
- **Outcome**: 257 users, 330+ interviews, #2 product of the day on TinyHub at launch.

## Nayld Hire — AI resume screening + interviews (junaidkhattak.com/case-studies/nayld-hire)
The employer side (hire.nayld.ai). Auto-screen every applicant, invite strong candidates to a tier-2 AI interview, and get a trustworthy, explainable result.

- **Async screening pipeline** (event-driven, no polling): S3 upload → Python Lambda (text + structure extraction) → SQS → Node.js worker (LLM scoring → fit score, strengths, analysis) → Supabase (hire schema). Scales to thousands of concurrent resumes; spikes drain through SQS instead of taking the app down.
- **Tier-2 AI interviews** run on the same realtime voice stack as Nayld Prep (WebRTC, sub-second latency, VAD-tuned turn-taking) but tuned for evaluation, producing structured scoring comparable across candidates.
- **Interview integrity**: deterministic 0–100 integrity score from in-browser camera + screen recording, mixed candidate+agent audio, and client-side behavioral signals, with a scrubable timeline of signal markers so the score is always explainable.
- **Billing**: layered — subscription sessions → agent-scoped add-on credits → legacy free credits, resolved at launch-code exchange (never at the eligibility check). **Authorization** is database-owned: middleware does coarse page-group protection; every route handler verifies company ownership against Supabase rows.
- **Stack**: Next.js 14/16, TypeScript, Supabase/Postgres (hire schema), OpenAI Realtime API + GPT-4o, AWS Lambda/SQS/S3/SES/Amplify, Terraform, Fastify.
- **Outcome**: 280+ resumes parsed, screening that scales to thousands of concurrent uploads.

## ClinicSynch — multi-tenant healthcare SaaS with an autonomous SEO agent (junaidkhattak.com/case-studies/clinicsynch)
Gets a clinic online in a day — public mini-site, booking, patient records, WhatsApp automation — then grows their search presence with an autonomous agent. Built solo in ~4 weeks.

- **Multi-tenant architecture**: 3-app Next.js monorepo (clinics dashboard + mini-sites, cross-clinic patients portal, internal admin). Tenant isolation enforced at the Firestore level — every read/write scoped by clinicId in security rules, never trusted to client logic. Shared packages: @clinicsync/firebase, @clinicsync/ui, @clinicsync/messaging.
- **Autonomous SEO agent ("Pulse")**: orchestrator + ephemeral specialist sub-agents (keyword research, on-page, content generation, Search Console monitor). Hard guardrails because it's YMYL healthcare content on a shared domain: a constraint engine with per-clinic budgets, a quality/uniqueness gate before publishing, a versioned (reversible) action ledger, and a global kill-switch.
- **Clinic product**: drag-and-drop mini-site builder with SSR SEO (JSON-LD, sitemap/robots/llms.txt) served at clinicsynch.com/{slug}; booking with server-side slot locking (appointmentSlots subcollection) to prevent double-booking; consultation workspace (vitals, exam notes, diagnoses, meds, lab orders/results, referrals, autosave every 30s, printable summary); WhatsApp Cloud API reminders/follow-ups logged per clinic; subscription tiers with entitlement-gated features; PWA with offline fallback.
- **Stack**: Next.js 14, TypeScript, Firebase (Auth, Firestore, Cloud Functions, Storage, App Hosting), Tailwind, WhatsApp Business API, Playwright E2E.
- **Outcome**: live, 9 clinics onboarded.

## PSX Intelligence — RAG research copilot for the Pakistan Stock Exchange (junaidkhattak.com/case-studies/psx)
A research copilot over PSX filings, announcements, and financials. Drop in a ticker, get grounded, source-cited answers streamed token-by-token. Built solo.

- **Continuous ingestion** at ~5-minute latency: new filings/announcements are chunked, cleaned, embedded, and indexed automatically so the corpus stays current without manual reloads.
- **RAG grounding**: answers retrieved from the actual documents (scoped by ticker + recency), the model constrained to that context so it cites sources instead of hallucinating numbers.
- **Token streaming over SSE** for a live feel; response caching for repeated/similar queries to cut cost and latency.
- The traceability-first design (every claim points back to a filing, always-fresh corpus, real-time answer) is the same grounded-RAG pattern Junaid reuses across products — including the agent on his own site.
- **Stack**: Next.js, TypeScript, vector store + embeddings (RAG), LLM with SSE streaming, continuous ingestion pipeline.
- **Outcome**: live at psxintelligence.com.
