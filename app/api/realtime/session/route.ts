import { NextResponse } from "next/server";
import { TWIN_SYSTEM } from "@/lib/twinPrompt";

export const runtime = "nodejs";

// Mints a short-lived OpenAI Realtime client secret (GA API) so the browser can
// open a WebRTC voice connection without ever seeing the server key. The model +
// instructions are bound to the token here; the browser just exchanges SDP.
export async function POST() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "voice not configured" }, { status: 503 });

  const model = process.env.OPENAI_REALTIME_MODEL || "gpt-realtime";
  try {
    const r = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model,
          instructions:
            TWIN_SYSTEM + "\n\nYou are now on a live voice call — keep replies brief and conversational.",
          audio: { output: { voice: "marin" } },
        },
      }),
    });
    if (!r.ok) {
      return NextResponse.json({ error: "session failed", detail: await r.text() }, { status: 502 });
    }
    const data = await r.json();
    return NextResponse.json({ clientSecret: data.value });
  } catch {
    return NextResponse.json({ error: "session error" }, { status: 500 });
  }
}
