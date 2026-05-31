"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    await createSupabaseBrowser().auth.signOut();
    router.push("/login");
    router.refresh();
  }
  return (
    <button onClick={signOut} className="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs">
      <LogOut className="size-3.5" /> Sign out
    </button>
  );
}
