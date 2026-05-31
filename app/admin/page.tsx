import { redirect } from "next/navigation";
import { createSupabaseServer, authConfigured } from "@/lib/supabase/server";
import { getSupabaseAdmin, supabaseConfigured } from "@/lib/supabase";
import { SignOutButton } from "./SignOutButton";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  what_building: string | null;
  audience_type: string | null;
  source: string | null;
};

export default async function AdminPage() {
  if (!authConfigured()) {
    return <Shell email={null}><Note>Supabase auth isn&apos;t configured. Set <C>NEXT_PUBLIC_SUPABASE_URL</C> + <C>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</C>.</Note></Shell>;
  }

  // --- auth gate (real Supabase session + email allowlist) ---
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const allowed = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!user || (allowed && user.email?.toLowerCase() !== allowed)) {
    redirect("/login");
  }

  // --- read leads with the service role (page is already gated) ---
  let leads: Lead[] = [];
  let dbNote: string | null = null;
  if (!supabaseConfigured()) {
    dbNote = "Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY and run supabase/schema.sql to see leads.";
  } else {
    const db = getSupabaseAdmin()!;
    const { data, error } = await db
      .from("leads")
      .select("id,created_at,name,email,what_building,audience_type,source")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) dbNote = error.message.includes("schema cache")
      ? "Tables not created yet — run supabase/schema.sql in the Supabase SQL editor."
      : `Error: ${error.message}`;
    else leads = (data ?? []) as Lead[];
  }

  return (
    <Shell email={user!.email ?? null}>
      {dbNote ? (
        <Note>{dbNote}</Note>
      ) : leads.length === 0 ? (
        <Note>No leads yet.</Note>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-elevated/60 font-mono text-[11px] uppercase tracking-wider text-text-dim">
              <tr>{["When", "Name", "Email", "Building", "Audience", "Source"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-line/70 align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-text-dim">{new Date(l.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">{l.name ?? "—"}</td>
                  <td className="px-4 py-3 text-cyan-bright">{l.email ?? "—"}</td>
                  <td className="max-w-xs px-4 py-3 text-text-muted">{l.what_building ?? "—"}</td>
                  <td className="px-4 py-3 text-text-muted">{l.audience_type ?? "—"}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-text-dim">{l.source ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}

function Shell({ email, children }: { email: string | null; children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Leads</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-text-dim">
            junaidkhattak.com · admin{email ? ` · ${email}` : ""}
          </p>
        </div>
        {email && <SignOutButton />}
      </div>
      <div className="mt-8">{children}</div>
    </main>
  );
}

const Note = ({ children }: { children: React.ReactNode }) => <p className="text-text-muted">{children}</p>;
const C = ({ children }: { children: React.ReactNode }) => <code className="text-cyan-bright">{children}</code>;
