"use client";

import { cn } from "@/lib/utils";

export function openTwin() {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("twin:open"));
}

export function TwinTrigger({
  children,
  variant = "glow",
  className,
}: {
  children: React.ReactNode;
  variant?: "glow" | "ghost";
  className?: string;
}) {
  return (
    <button
      onClick={openTwin}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm cursor-pointer",
        variant === "glow" ? "btn-glow" : "btn-ghost",
        className,
      )}
    >
      {children}
    </button>
  );
}
