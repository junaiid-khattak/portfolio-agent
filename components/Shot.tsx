"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Image with a graceful Dark Luxe gradient fallback if the file is missing.
export function Shot({
  src,
  alt,
  label,
  className,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className={cn("grid place-items-center bg-gradient-to-br from-violet/25 via-void to-cyan/15", className)}>
        <span className="px-4 text-center font-display text-base font-semibold text-text-muted">{label || alt}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" onError={() => setErrored(true)} className={cn("object-cover", className)} />
  );
}
