"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

// Google's appointment-scheduling embed shows a confirmation in-place after booking
// and can't be reset cross-origin. Re-mounting the iframe (via key) reloads it back
// to a fresh scheduling view.
export function BookingEmbed({ src }: { src: string }) {
  const [reloadKey, setReloadKey] = useState(0);
  return (
    <div className="relative">
      <iframe
        key={reloadKey}
        src={src}
        title="Book a call"
        className="h-[560px] w-full rounded-2xl border-0"
        loading="lazy"
      />
      <button
        onClick={() => setReloadKey((k) => k + 1)}
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line-bright bg-void/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted backdrop-blur-md transition-colors hover:text-text"
        title="Reset the calendar to book another time"
      >
        <RotateCcw className="size-3" /> Book another
      </button>
    </div>
  );
}
