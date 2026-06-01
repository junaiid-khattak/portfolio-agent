"use client";

import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

// A stable namespace so the `ui` command targets THIS inline embed.
const NS = "inline-booking";

// Inline Cal.com booking embed, themed to match Dark Luxe.
export function CalEmbed({ calLink }: { calLink: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let tries = 0;
    (async () => {
      const cal = await getCalApi({ namespace: NS });
      if (cancelled) return;

      // The <Cal> component renders null on its first commit and only creates
      // its inline iframe on a later render. Sending `ui` before that iframe
      // exists makes embed.js run doInIframe before createIframe and throw
      // ("iframe doesn't exist"). So we wait until the iframe is actually in
      // the DOM, then apply the brand-color customization. Theme + layout are
      // passed via the `config` prop below, so they're never part of this race.
      const applyUi = () => {
        if (cancelled) return;
        const hasIframe = wrapRef.current?.querySelector("iframe");
        if (!hasIframe && tries++ < 100) {
          setTimeout(applyUi, 50);
          return;
        }
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: { light: { "cal-brand": "#8b5cff" }, dark: { "cal-brand": "#8b5cff" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      };
      applyUi();
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      <Cal
        namespace={NS}
        calLink={calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ theme: "dark", layout: "month_view" }}
      />
    </div>
  );
}
