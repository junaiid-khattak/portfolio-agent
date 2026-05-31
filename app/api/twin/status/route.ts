import { NextResponse } from "next/server";

// Lets the client know which integrations are live, so the UI degrades gracefully.
export async function GET() {
  return NextResponse.json({
    live: Boolean(process.env.ANTHROPIC_API_KEY),
    voice: Boolean(process.env.OPENAI_API_KEY),
  });
}
