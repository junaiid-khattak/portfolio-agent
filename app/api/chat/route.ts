import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { NextResponse, after } from "next/server";
import { TWIN_MODEL, TWIN_SYSTEM } from "@/lib/twinPrompt";
import { saveConversation, saveLead, type ChatMsg } from "@/lib/leads";

export const runtime = "nodejs";
export const maxDuration = 60;

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;

export async function POST(req: Request) {
  // No key → tell the client to fall back to scripted mode.
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ fallback: true }, { status: 503 });
  }

  const { messages, sessionId } = (await req.json()) as {
    messages: ChatMsg[];
    sessionId?: string;
  };

  // Drop any empty-content turns and ensure we start user-first (Anthropic rejects
  // empty content / leading-assistant turns — this prevents a single blank reply
  // from cascading into repeated failures).
  const clean = (messages ?? []).filter((m) => m?.content?.trim());
  while (clean[0]?.role === "assistant") clean.shift();
  if (clean.length === 0) {
    return NextResponse.json({ fallback: true }, { status: 400 });
  }

  const result = streamText({
    model: anthropic(TWIN_MODEL),
    system: TWIN_SYSTEM,
    messages: clean.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    onFinish: ({ text }) => {
      if (!sessionId) return;
      const transcript: ChatMsg[] = [...clean, { role: "assistant", content: text }];
      const userText = clean.filter((m) => m.role === "user").map((m) => m.content).join("\n");
      const email = userText.match(EMAIL_RE)?.[0];
      const whatBuilding = clean.find((m) => m.role === "user")?.content?.slice(0, 400);
      // run persistence AFTER the response so it can never hold the stream open
      after(() =>
        Promise.all([
          saveConversation(sessionId, transcript),
          saveLead({ sessionId, email, whatBuilding, source: "digital-twin", ua: req.headers.get("user-agent") }),
        ]).catch(() => {}),
      );
    },
  });

  return result.toTextStreamResponse();
}
