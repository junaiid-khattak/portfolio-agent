import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** Cookie-bound Supabase client for reading the auth session in Server Components. */
export async function createSupabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(url!, key!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // called from a Server Component — safe to ignore (proxy refreshes cookies)
        }
      },
    },
  });
}

export const authConfigured = () => Boolean(url && key);
