// Junaid's live products — shown on /work and linked from the homepage Proof
// section to their deep case studies.

export type Product = {
  slug: string; // matches content/case-studies/<slug>.mdx
  name: string;
  tagline: string;
  built: string;
  old: string;
  metrics: string[];
  image: string; // /public path (may not exist yet → UI falls back to a gradient)
  liveLinks: { label: string; href: string }[];
};

export const products: Product[] = [
  {
    slug: "nayld-prep",
    name: "Nayld Prep",
    tagline: "Realtime AI voice-interview practice",
    built: "Built solo in ~6 weeks",
    old: "vs ~8–10 months + a team",
    metrics: ["257 users", "330+ interviews", "#2 on TinyHub"],
    image: "/work/products/nayld.webp",
    liveLinks: [{ label: "nayld.ai", href: "https://nayld.ai" }],
  },
  {
    slug: "nayld-hire",
    name: "Nayld Hire",
    tagline: "AI resume screening + interviews",
    built: "Built solo in ~6 weeks",
    old: "vs ~8–10 months + a team",
    metrics: ["280+ resumes parsed", "Scales to thousands", "Integrity scoring"],
    image: "/work/products/nayld-hire.webp",
    liveLinks: [{ label: "hire.nayld.ai", href: "https://hire.nayld.ai" }],
  },
  {
    slug: "clinicsynch",
    name: "ClinicSynch",
    tagline: "Multi-tenant healthcare SaaS",
    built: "Built solo in ~4 weeks",
    old: "vs ~4–6 months",
    metrics: ["9 clinics", "Autonomous SEO agent", "WhatsApp automation"],
    image: "/work/products/clinicsynch.webp",
    liveLinks: [{ label: "clinicsynch.com", href: "https://clinicsynch.com" }],
  },
  {
    slug: "psx",
    name: "PSX Intelligence",
    tagline: "AI financial analytics platform",
    built: "Built solo in ~40–50 days",
    old: "vs ~6–8 months",
    metrics: ["127 users", "520 tickers / 5-min cycle", "pgvector RAG"],
    image: "/work/products/psx.webp",
    liveLinks: [{ label: "psxintelligence.com", href: "https://psxintelligence.com" }],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
