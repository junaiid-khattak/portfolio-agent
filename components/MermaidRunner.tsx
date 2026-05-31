"use client";

import { useEffect } from "react";

/**
 * Renders any <pre class="mermaid"> blocks on the page into SVG, client-side.
 * The diagram source lives as raw text in the prerendered HTML (see the
 * rehype plugin in components/mdx.tsx), so nothing crosses the RSC boundary
 * as a prop — which is what was breaking under Turbopack.
 */
export function MermaidRunner() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const nodes = document.querySelectorAll<HTMLElement>("pre.mermaid:not([data-processed])");
      if (nodes.length === 0) return;

      // Wait for web fonts before Mermaid measures label widths — otherwise it
      // sizes boxes to the fallback font and text overflows once the real font swaps in.
      try {
        await document.fonts.ready;
      } catch {
        /* fonts API unavailable — proceed anyway */
      }
      if (cancelled) return;

      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "loose",
        flowchart: { htmlLabels: true, useMaxWidth: true, padding: 12, nodeSpacing: 50, rankSpacing: 55 },
        sequence: { useMaxWidth: true, wrap: true, width: 160 },
        themeVariables: {
          background: "#0c0a13",
          primaryColor: "#1b1726",
          primaryBorderColor: "#8b5cff",
          primaryTextColor: "#f4f2fb",
          secondaryColor: "#110e1b",
          tertiaryColor: "#0c0a13",
          lineColor: "#6f64a0",
          fontSize: "13px",
          // Concrete family (no CSS var) so measurement and render use the same metrics.
          fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        },
      });
      if (cancelled) return;
      try {
        await mermaid.run({ nodes: Array.from(nodes) });
      } catch {
        /* leave the raw source visible if a diagram fails to parse */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
