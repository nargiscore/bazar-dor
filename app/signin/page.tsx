import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import { auth } from "@/lib/auth";

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/"); // already logged in
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
