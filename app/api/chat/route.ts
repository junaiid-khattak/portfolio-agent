import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod";
import { NextResponse, after } from "next/server";
import { TWIN_MODEL, TWIN_SYSTEM } from "@/lib/twinPrompt";
import { saveConversation, saveLead, type ChatMsg } from "@/lib/leads";
import { getAvailability, createBooking } from "@/lib/booking";
import { searchKnowledge } from "@/lib/kb";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ fallback: true }, { status: 503 });
  }

  const { messages, sessionId } = (await req.json()) as {
    messages: ChatMsg[];
    sessionId?: string;
  };

  const clean = (messages ?? []).filter((m) => m?.content?.trim());
  while (clean[0]?.role === "assistant") clean.shift();
  if (clean.length === 0) return NextResponse.json({ fallback: true }, { status: 400 });

  const now = new Date();
  const dateContext = `\n\n# Current date, use this as "today" for ALL scheduling; never guess the date or year\nRight now it is ${now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })} (${now.toISOString().slice(0, 10)} UTC). Compute "today", "tomorrow", "this week", and "next week" relative to this date.`;

  const result = streamText({
    model: anthropic(TWIN_MODEL),
    system: TWIN_SYSTEM + dateContext,
    messages: clean.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    stopWhen: stepCountIs(6), // allow tool call(s) + a final spoken reply
    tools: {
      search_knowledge: tool({
        description:
          "Search Junaid's knowledge base for specific facts about his background, his Doerz/agency projects (40+ platforms across fitness, healthcare, legal, e-commerce, property, edtech, safety, etc.), work history, education, his live products, his writing/articles, and how he works. Call this whenever the visitor asks anything specific about his experience or projects that you're not 100% certain of. Prefer searching over guessing; never invent projects or facts.",
        inputSchema: z.object({
          query: z.string().describe("what to look up, e.g. 'healthcare projects at Doerz' or 'education' or 'gym apps'"),
        }),
        execute: async ({ query }) => searchKnowledge(query, 6),
      }),
      capture_lead: tool({
        description:
          "Save the visitor as a lead. Call this as soon as you have at least their email plus a sense of what they're building. Call again to enrich it as you learn more (name, company, budget).",
        inputSchema: z.object({
          email: z.string().describe("visitor's email"),
          name: z.string().optional(),
          company: z.string().optional(),
          audienceType: z.enum(["individual", "business", "hiring", "other"]).optional(),
          whatBuilding: z.string().optional(),
          budgetBand: z.string().optional(),
        }),
        execute: async (args) => {
          await saveLead({ sessionId, ...args, source: "digital-twin" });
          return { saved: true };
        },
      }),
      get_availability: tool({
        description:
          "Get Junaid's real open consultation slots. ALWAYS call this before proposing or booking a time. Returns upcoming slots as ISO timestamps.",
        inputSchema: z.object({
          fromDate: z.string().optional().describe("YYYY-MM-DD start (default: today)"),
          toDate: z.string().optional().describe("YYYY-MM-DD end (default: +14 days)"),
          timeZone: z.string().optional().describe("visitor's IANA timezone, ask/confirm it first so slots show in their time, e.g. America/New_York"),
        }),
        execute: async ({ fromDate, toDate, timeZone }) => getAvailability(fromDate, toDate, timeZone),
      }),
      book_appointment: tool({
        description:
          "Book a consultation. Only after the visitor picked one of the slots from get_availability and gave name + email. Use an EXACT ISO start from get_availability.",
        inputSchema: z.object({
          name: z.string(),
          email: z.string(),
          startISO: z.string().describe("exact slot start (ISO 8601) returned by get_availability"),
          timeZone: z.string().describe("visitor's CONFIRMED IANA timezone, e.g. America/New_York, you must confirm this with them before booking"),
          notes: z.string().optional().describe("what they're building / context for the call"),
        }),
        execute: async (args) => {
          const res = await createBooking({ ...args });
          if (res.ok) {
            await saveLead({
              sessionId,
              name: args.name,
              email: args.email,
              whatBuilding: args.notes,
              source: "digital-twin-booked",
            });
          }
          return res;
        },
      }),
    },
    onFinish: ({ text }) => {
      if (!sessionId) return;
      const transcript: ChatMsg[] = [...clean, { role: "assistant", content: text }];
      after(() => saveConversation(sessionId, transcript).catch(() => {}));
    },
  });

  return result.toTextStreamResponse();
}
