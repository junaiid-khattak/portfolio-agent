import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

// Lead capture from the scripted twin / forms. Persists to Supabase when configured.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await saveLead({
      sessionId: body.sessionId,
      name: body.name,
      email: body.email,
      company: body.company,
      audienceType: body.who ?? body.audienceType,
      whatBuilding: body.building ?? body.whatBuilding,
      budgetBand: body.budgetBand,
      source: body.source ?? "site",
      ua: req.headers.get("user-agent"),
    });
    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }
}
