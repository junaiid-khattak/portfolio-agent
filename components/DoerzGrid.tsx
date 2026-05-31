"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Shot } from "./Shot";
import { cn } from "@/lib/utils";
import { doerzProjects, SECTORS, type DoerzProject } from "@/lib/doerz";

export function DoerzGrid() {
  const [sector, setSector] = useState<string>("All");
  const sectors = ["All", ...SECTORS.filter((s) => doerzProjects.some((p) => p.sector === s))];
  const shown = sector === "All" ? doerzProjects : doerzProjects.filter((p) => p.sector === sector);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {sectors.map((s) => (
          <button
            key={s}
            onClick={() => setSector(s)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
              s === sector
                ? "border-violet bg-violet/15 text-violet-bright"
                : "border-line-bright text-text-dim hover:text-text",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <Card key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}

function Card({ p }: { p: DoerzProject }) {
  return (
    <Link href={`/work/${p.slug}`} className="glass glass-hover group flex flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line/70 bg-void">
        <Shot src={p.images[0]} alt={p.name} label={p.name} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full border border-line-bright bg-void/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-text-muted backdrop-blur">
          {p.sector}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold">{p.name}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-text-dim transition-colors group-hover:text-cyan-bright" />
        </div>
        <p className="text-sm text-text-dim">{p.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{p.summary}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-text-dim">{p.client} · {p.year}</p>
      </div>
    </Link>
  );
}
