import Link from "next/link";
import { Container } from "./ui";
import { nav } from "@/lib/content";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <Container className="mt-4">
        <nav className="flex items-center justify-between rounded-full border border-line-bright bg-void/92 px-4 py-2.5 shadow-lg shadow-black/40 backdrop-blur-xl sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-violet to-cyan font-display text-sm font-bold text-void">
              JK
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">Junaid Khattak</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                {n.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#book"
            className="btn-ghost rounded-full px-4 py-2 text-xs sm:text-sm"
          >
            Book a call
          </Link>
        </nav>
      </Container>
    </header>
  );
}
