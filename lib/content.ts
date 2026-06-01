// Single source of truth for site copy. Mirrors profile/portfolio/COPY_DARK_LUXE.md.

export const site = {
  name: "Junaid Khattak",
  email: "junaid@nayld.ai",
  links: {
    nayld: "https://nayld.ai",
    nayldHire: "https://hire.nayld.ai",
    clinicsynch: "https://clinicsynch.com",
    psx: "https://psxintelligence.com",
    linkedin: "https://www.linkedin.com/in/junaid-khtattak/",
    github: "https://github.com/junaiid-khattak",
    medium: "https://medium.com/@junaid.khattak",
    upwork: "https://www.upwork.com/freelancers/junaidkhattak",
  },
};

export const nav = [
  { label: "AI Agents", href: "/agents" },
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/blog" },
  { label: "Videos", href: "/videos" },
  { label: "How I work", href: "/#how-i-work" },
];

export const hero = {
  eyebrow: "AGENTS · VOICE AI · AUTONOMOUS SYSTEMS",
  headlineLead: "Give an AI agent the right tools and it'll automate almost any job in your business.",
  headlinePunch: "I build those agents, and one's working on this page right now.",
  subhead:
    "Booking, support, lead capture, research, back-office ops, voice calls. If it runs on software, an agent can run it. The one in the corner is mine. Talk to it, then let's build yours.",
  primaryCta: "Talk to my agent",
  secondaryCta: "See the agent offer",
  trust: ["LIVE AI AGENTS & PRODUCTS", "EX-AGENCY FOUNDER/CTO · 40+ PLATFORMS", "100% JOB SUCCESS", "9+ YRS SHIPPING"],
};

export const honestMath = {
  heading: "I ran an agency. Let me tell you where the months actually go.",
  body: [
    "A team-based build isn't slow because anyone's cutting corners. It's slow because of how teams work: discovery, specs, coordination across roles, handoffs, QA cycles, review loops. That structure is real, it's expensive, and it's why a product can take the better part of a year and a serious budget. I'm not knocking it. I built my career on it.",
  ],
  punch:
    "But here's the honest part: AI has made most of that overhead optional. And in a market moving this fast, the months you spend waiting are months a competitor spends shipping.",
  kicker: "There's now a faster way to the same result, often a better one.",
};

export const oldVsNew = {
  heading: "It's not a one-off.",
  sub: "Three live products, each built solo in a fraction of the old timeline.",
  rows: [
    { product: "Nayld", desc: "realtime voice-interview platform", solo: "~6 weeks", old: "8-10 months + a full team" },
    { product: "ClinicSynch", desc: "multi-tenant healthcare SaaS", solo: "~4 weeks", old: "4-6 months" },
    { product: "PSX Intelligence", desc: "AI financial analytics", solo: "~40-50 days", old: "6-8 months" },
  ],
  note: "What changes per build is the team-based overhead: discovery, specs, coordination, handoffs, QA loops. What stays is production quality, live in weeks.",
  line: "Same caliber of product, built a fundamentally faster, leaner way. And you get the upside: the speed and the savings, instead of an agency's margin.",
};

// "Why I can pull this off" — fuses the old origin + honestMath + oldVsNew into
// one credibility section (the agency story, repurposed as support not the lead).
export const background = {
  eyebrow: "The background",
  heading: "Agency-grade engineering. Solo-AI speed.",
  lead: "I'm not a prompt-wrapper hobbyist. I founded and was CTO of a software agency, scaled it from 2 to 30 engineers, and delivered 40+ production platforms for mostly-US clients. I know exactly what serious software takes, and what it costs.",
  shift: "Then AI changed what one person can ship, and I rebuilt my entire process around it. A build my old agency would've needed 8-10 months and a full team for, I shipped solo, end to end, in six weeks. Same engineering bar, a fraction of the time and cost.",
  rowsCaption: "Not a one-off:",
  thesis: "Team builds aren't slow because anyone's lazy; they carry real structural overhead like specs, handoffs, and QA loops. AI makes most of that optional, and you get the speed and the savings.",
};

export const origin = {
  heading: "I've been on both sides of this.",
  body: "I founded and was CTO of a software agency. I scaled it from 2 to 30 engineers and delivered 40+ production platforms, mostly for US clients. I know exactly what great delivery takes, and what it costs. When AI started changing what was possible, I didn't bolt it on. I rebuilt my entire development process around it. The result: three live products, built solo, at the quality bar I held my team to, in a fraction of the time.",
  punch: "Software development has fundamentally changed. I rebuilt around that change, and I bring it to you.",
};

export const howIWork = {
  heading: "The system behind the speed.",
  body: "Not magic. A real, tracked workflow that does the work a whole team used to.",
  pipeline: [
    { id: "plan", label: "Claude & ChatGPT", role: "Planning & research" },
    { id: "brain", label: "Notion", role: "Brain & database" },
    { id: "exec", label: "Claude Code & Codex", role: "Executors · skills per platform" },
    { id: "design", label: "Stitch", role: "UI / UX design" },
  ],
  agents: [
    { name: "frontend-agent", task: "Build hero + nav", status: "done" },
    { name: "api-agent", task: "Wire lead capture", status: "executing" },
    { name: "voice-agent", task: "Realtime session", status: "executing" },
    { name: "qa-agent", task: "E2E + a11y pass", status: "queued" },
  ],
  closer:
    "A fleet of sub-agents picks up assigned tasks, executes them, and updates their status, so nothing slips and I see the whole pipeline end to end. The discipline of a senior team, run by one person.",
};

export const proof = {
  heading: "I don't pitch. I point at what's already live.",
  lead: "Three live products, an autonomous agent running real clinics, realtime voice agents, and the one you're talking to right now. All built solo, all in production.",
  products: [
    {
      name: "Nayld Prep",
      tag: "Realtime AI voice-interview practice",
      built: "Built solo in ~6 weeks",
      old: "vs ~8-10 months",
      metrics: ["257 users", "330+ interviews"],
      detail: "Mock interviews against a realtime voice agent on OpenAI Realtime + WebRTC, with structured feedback.",
      links: [{ label: "nayld.ai", href: "https://nayld.ai" }],
    },
    {
      name: "Nayld Hire",
      tag: "AI resume screening + interviews",
      built: "Built solo in ~6 weeks",
      old: "vs ~8-10 months",
      metrics: ["280+ resumes parsed", "Integrity scoring"],
      detail: "Event-driven screening pipeline (S3 → Lambda → SQS → worker) plus tier-2 AI interviews with anti-cheat integrity scores.",
      links: [{ label: "hire.nayld.ai", href: "https://hire.nayld.ai" }],
    },
    {
      name: "ClinicSynch",
      tag: "Multi-tenant healthcare SaaS",
      built: "Built solo in ~4 weeks",
      old: "vs ~4-6 months",
      metrics: ["9 clinics", "WhatsApp automation"],
      detail: "Autonomous agent + booking + WhatsApp Cloud API, tenant-isolated at the data layer.",
      links: [{ label: "clinicsynch.com", href: "https://clinicsynch.com" }],
    },
    {
      name: "PSX Intelligence",
      tag: "AI financial analytics",
      built: "Built solo in ~40-50 days",
      old: "vs ~6-8 months",
      metrics: ["127 users", "520 tickers / 5-min cycle"],
      detail: "pgvector RAG over filings, materialized views, SSE cache invalidation, Lambda ingestion.",
      links: [{ label: "psxintelligence.com", href: "https://psxintelligence.com" }],
    },
  ],
  track: [
    { value: "100%", label: "Job Success" },
    { value: "$100K+", label: "Earned on Upwork" },
    { value: "18", label: "Jobs completed" },
    { value: "9+ yrs", label: "Building software" },
  ],
  insights: ["Committed to Quality", "Clear Communicator", "Reliable", "Accountable for Outcomes", "Solution-Oriented", "Professional"],
  // Lightly edited from verbatim Upwork reviews to remove team/agency references
  // (per Junaid). `name` is intentionally empty — Upwork anonymizes clients; fill
  // with real names only if Junaid provides them from his contracts.
  reviews: [
    {
      quote:
        "Did an excellent job with the delivery and implementation of milestones, taking the extra time to understand the product design and what's best for the longer course of the project.",
      name: "",
      role: "Security web & mobile app",
      meta: "$16,103 · ★5.0 · Verified Upwork client",
    },
    {
      quote:
        "Extremely pleased with the outstanding performance. Professional, dedicated, and consistently went above and beyond to resolve issues fast. Real business acumen too, with valuable suggestions for our strategy. Thoroughly impressed with the commitment to exceptional results.",
      name: "",
      role: "Mobile app · Android & iOS",
      meta: "$17,005 · ★5.0 · Verified Upwork client",
    },
    {
      quote:
        "Did a great job. Highly recommended for anyone serious about getting their work done the best way. Cheers.",
      name: "",
      role: "Mobile app + Stripe",
      meta: "★5.0 · Verified Upwork client",
    },
    {
      quote:
        "A true professional. Always delivers on time, honest, and great to work with. We'll definitely collaborate again.",
      name: "",
      role: "Cross-platform app",
      meta: "$1,820 · ★5.0 · Verified Upwork client",
    },
    {
      quote: "The implementation was done exactly according to the wireframe and mockup designs.",
      name: "",
      role: "ML / full-stack build",
      meta: "$8,114 · ★5.0 · Verified Upwork client",
    },
  ],
};

export const freeValue = {
  heading: "Before you spend a dollar, let's figure out what you actually need.",
  body: "Talk to my digital twin. It'll scope your idea in plain language and tell you honestly how I'd build it (and whether you even need me). No forms, no pitch, no obligation.",
  secondary:
    "Prefer it in writing? Grab a free AI Build Audit and I'll send back the 3 highest-leverage moves for your product.",
  primaryCta: "Start the free chat",
  secondaryCta: "Get the free audit",
};

export const whoIHelp = [
  {
    audience: "Building something?",
    line: "You've got the idea. I'll architect and ship the real thing, fast.",
  },
  {
    audience: "Run a business wondering where AI fits?",
    line: "I'll find the one or two places AI actually moves your numbers, and build them.",
  },
  {
    audience: "Hiring agentic talent?",
    line: "I architect and ship production agent systems end to end. Here's the proof. Let's talk.",
  },
];

export const availability = {
  heading: "I keep my calendar deliberately small, so the work that gets in ships fast.",
  body: "I take up to 10 consultations a week (two a day), and I never run more than 3 builds at the same time. That focus is exactly what keeps each project on a weeks-not-months timeline. When the build slots are full, they're full.",
  // wire to real availability later
  consultSlotsLeft: 6,
  buildSlotsOpen: 1,
  buildSlotsTotal: 3,
};

// Productized offer: custom public-facing AI agents for businesses.
// NOTE: priceBuild/priceManaged are placeholders — confirm before publishing.
export const agentsOffer = {
  eyebrow: "Custom Intelligent Agents",
  headline: "An AI agent that runs the work, not just the chat.",
  sub: "Give an agent the right tools and it automates real work in your business: answering customers and booking 24/7, handling support, moving data between your systems, researching and monitoring, even taking phone calls. Customer-facing or behind the scenes.",
  jobs: [
    {
      title: "Talks to customers & books, 24/7",
      body: "Answers questions, qualifies and captures leads, and books or reschedules straight in your system. The after-hours visitor becomes a booking instead of a bounce.",
    },
    {
      title: "Handles the repetitive busywork",
      body: "Updates records, moves data between your tools, fills forms, drafts replies, clears the routine tickets, the clerical work that quietly eats your team's day.",
    },
    {
      title: "Researches & monitors",
      body: "Pulls and summarizes information on demand, watches for changes or new data, and sends the report or the alert, so no one has to babysit a dashboard.",
    },
    {
      title: "Acts through your tools, escalates the rest",
      body: "It doesn't just answer; it takes real actions via your tools' APIs, and routes anything it shouldn't handle to a human, cleanly.",
    },
  ],
  channels: ["Website chat", "SMS / WhatsApp", "Voice", "Slack & email", "Behind the scenes"],
  integrations: ["Cal.com / MindBody", "Your CRM", "Slack & email", "Sheets / databases", "Any REST API"],
  steps: [
    {
      n: "01",
      title: "Your knowledge + your tools",
      body: "Your docs, data, and the systems you already run on become the agent's grounding and its hands.",
    },
    {
      n: "02",
      title: "A grounded, tool-using agent",
      body: "RAG keeps it accurate to your real info; tools let it actually do the work, not just talk about it.",
    },
    {
      n: "03",
      title: "Live wherever the work happens",
      body: "On your site, on the phone, in Slack, or quietly in your backend, monitored, with guardrails and a kill-switch.",
    },
  ],
  proof:
    "This isn't theory. The agent you can chat with on this very site is one of mine. I've also shipped realtime voice agents (Nayld) and an autonomous agent that runs SEO across live clinics end to end (ClinicSynch), the same agentic engine pointed at very different jobs.",
  priceBuild: "from $2k build",
  priceManaged: "from $500/mo managed",
  priceNote: "Most focused agents go live in 1-2 weeks. One scoping call tells us exactly what yours should do.",
  primaryCta: "Scope my agent (free)",
  secondaryCta: "Book a call",
  faqs: [
    {
      q: "What can it actually automate?",
      a: "If a task runs on software, customer chat, scheduling, data entry, research, reporting, internal ops, an agent can usually do it. If a tool has an API or a usable interface, the agent can use it.",
    },
    {
      q: "Does it actually take actions, or just chat?",
      a: "It takes actions. Bookings, lookups, updates, and multi-step tasks run through your real systems via their APIs (MindBody, Cal.com, your CRM, Slack, your database, and more).",
    },
    {
      q: "Will it make things up?",
      a: "No. It's grounded in your real content (RAG) and constrained to it, with guardrails, so it works from your facts or hands off. It doesn't invent.",
    },
    {
      q: "What do you need from me?",
      a: "Access to the tools and info the agent will use, plus a clear picture of the job it should own. I handle the build, hosting, and monitoring.",
    },
    {
      q: "How fast can it go live?",
      a: "Typically 1-2 weeks for a focused agent, depending on how many tools it needs to touch.",
    },
  ],
};
