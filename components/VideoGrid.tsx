"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import type { Video } from "@/lib/videos";

function Card({ v, onPlay }: { v: Video; onPlay: (v: Video) => void }) {
  return (
    <button
      onClick={() => onPlay(v)}
      className="glass glass-hover group flex flex-col overflow-hidden rounded-2xl text-left"
    >
      <div className="relative aspect-video overflow-hidden bg-void">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={v.thumbnail}
          alt={v.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-14 place-items-center rounded-full border border-line-bright bg-void/70 backdrop-blur transition-transform group-hover:scale-110">
            <Play className="size-6 translate-x-0.5 fill-current text-cyan-bright" />
          </span>
        </span>
      </div>
      {v.title && (
        <div className="p-4">
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug">{v.title}</h3>
        </div>
      )}
    </button>
  );
}

export function VideoGrid({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<Video | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <Card key={v.id} v={v} onPlay={setActive} />
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-void/90 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute -top-10 right-0 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
            >
              Close <X className="size-4" />
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl border border-line-bright bg-void">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1`}
                title={active.title || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
