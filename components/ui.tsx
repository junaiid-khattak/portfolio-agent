import Link from "next/link";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32 scroll-mt-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs tracking-[0.18em] text-cyan-bright/90 uppercase", className)}>
      <span className="text-violet-bright">/</span> {children}
    </p>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] tracking-wide rounded-full border border-line-bright px-3 py-1 text-text-muted">
      {children}
    </span>
  );
}

export function Led({ className }: { className?: string }) {
  return <span className={cn("led inline-block size-2 rounded-full bg-cyan-bright text-cyan-bright", className)} />;
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function GlowButton({ href, children, className, external }: BtnProps) {
  const cls = cn("btn-glow inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm", className);
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function GhostButton({ href, children, className, external }: BtnProps) {
  const cls = cn("btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm", className);
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}
