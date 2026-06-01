import { Container } from "./ui";
import { site } from "@/lib/content";

const products = [
  { label: "Nayld Prep", href: site.links.nayld },
  { label: "Nayld Hire", href: site.links.nayldHire },
  { label: "ClinicSynch", href: site.links.clinicsynch },
  { label: "PSX Intelligence", href: site.links.psx },
];

const elsewhere = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Medium", href: site.links.medium },
  { label: "Upwork", href: site.links.upwork },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line/60 py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-violet to-cyan font-display text-sm font-bold text-void">
                JK
              </span>
              <span className="font-display font-semibold">Junaid Khattak</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-text-muted">
              Ex-agency founder/CTO, now building production AI solo, in weeks, not months.
            </p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-block text-sm text-cyan-bright hover:text-cyan">
              {site.email}
            </a>
          </div>

          <FooterCol title="Live products" items={products} />
          <FooterCol title="Elsewhere" items={elsewhere} />
        </div>

        <div className="mt-12 hairline" />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-text-dim">
          © {new Date().getFullYear()} Junaid Khattak · Built solo, the new way.
        </p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} target="_blank" rel="noreferrer" className="text-sm text-text-muted transition-colors hover:text-text">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
