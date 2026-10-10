import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/** Server-side guard for protected pages. Redirects to /signin with a reason for the toast. */
export async function requireSession(nextPath: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(nextPath)}&reason=protected`);
  }
  return session;
}
