"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form onSubmit={onSubmit} className="glass glow-violet w-full max-w-sm rounded-3xl p-8">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-violet/15 text-violet-bright">
            <Lock className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-lg font-semibold">Admin sign-in</h1>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-dim">junaidkhattak.com</p>
          </div>
        </div>

        <label className="mt-7 block text-sm text-text-muted">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl bg-void/60 px-4 py-2.5 text-text outline-none ring-1 ring-line focus:ring-cyan/60"
          />
        </label>
        <label className="mt-4 block text-sm text-text-muted">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl bg-void/60 px-4 py-2.5 text-text outline-none ring-1 ring-line focus:ring-cyan/60"
          />
        </label>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button type="submit" disabled={busy} className="btn-glow mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm disabled:opacity-60">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
          Sign in
        </button>
        <p className="mt-4 text-center font-mono text-[11px] text-text-dim">
          Create your user in Supabase → Authentication → Users.
        </p>
      </form>
    </main>
  );
}
