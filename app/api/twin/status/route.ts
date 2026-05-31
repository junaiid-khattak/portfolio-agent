import { NextResponse } from "next/server";

// Lets the client know which integrations are live, so the UI degrades gracefully.
// Voice is intentionally OFF for launch (text-only twin). All voice code is kept;
// to re-enable later, set VOICE_ENABLED=true (and have a valid OPENAI_API_KEY).
export function GET() {
  return NextResponse.json({
    live: Boolean(process.env.ANTHROPIC_API_KEY),
    voice: Boolean(process.env.OPENAI_API_KEY) && process.env.VOICE_ENABLED === "true",
  });
}
