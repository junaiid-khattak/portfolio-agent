import { getSupabaseAdmin } from "./supabase";

export type LeadInput = {
  sessionId?: string;
  name?: string;
  email?: string;
  company?: string;
  audienceType?: string;
  whatBuilding?: string;
  budgetBand?: string;
  source?: string;
  ua?: string | null;
};

export type ChatMsg = { role: "user" | "assistant" | "twin"; content: string };

/** Upsert a lead row. No-op (logs) when Supabase isn't configured. */
export async function saveLead(lead: LeadInput) {
  const db = getSupabaseAdmin();
  if (!db) {
    console.log("[lead:nodb]", JSON.stringify(lead));
    return { ok: true, persisted: false };
  }
  const { error } = await db.from("leads").upsert(
    {
      session_id: lead.sessionId ?? null,
      name: lead.name ?? null,
      email: lead.email ?? null,
      company: lead.company ?? null,
      audience_type: lead.audienceType ?? null,
      what_building: lead.whatBuilding ?? null,
      budget_band: lead.budgetBand ?? null,
      source: lead.source ?? "site",
      ua: lead.ua ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "session_id" },
  );
  if (error) {
    console.error("[lead:error]", error.message);
    return { ok: false, persisted: false };
  }
  return { ok: true, persisted: true };
}

/** Persist a chat transcript tied to a session. No-op when not configured. */
export async function saveConversation(sessionId: string, messages: ChatMsg[]) {
  const db = getSupabaseAdmin();
  if (!db) return { ok: true, persisted: false };
  const { error } = await db.from("conversations").upsert(
    { session_id: sessionId, messages, updated_at: new Date().toISOString() },
    { onConflict: "session_id" },
  );
  if (error) {
    console.error("[conversation:error]", error.message);
    return { ok: false, persisted: false };
  }
  return { ok: true, persisted: true };
}
