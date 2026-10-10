"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // sent here by a protected route
  useEffect(() => {
    if (params.get("reason") === "protected") {
      toast("এই পাতাটি দেখতে আগে সাইন ইন করুন", { id: "protected-redirect", icon: "🔒" });
    }
  }, [params]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই দিন";
      setError(msg);
      toast.error(msg);
      return;
    }
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      const msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(safeNext);
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">সাইন ইন</h1>
      <p className="mt-1 text-center text-sm text-base-content/65">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>

      <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-6">
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">ইমেইল</span>
            <input type="email" autoComplete="email" className="input w-full border-base-300 bg-base-100" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
            <input type="password" autoComplete="current-password" className="input w-full border-base-300 bg-base-100" placeholder="কমপক্ষে ৮ অক্ষর" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && (
            <p role="alert" className="text-sm text-error">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-primary w-full shadow-md" disabled={loading}>
            {loading && <span className="loading loading-spinner loading-sm" />}
            সাইন ইন
          </button>
        </form>

        <div className="divider my-4 text-xs text-base-content/55">অথবা</div>
        <SocialButtons next={safeNext} />

        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-base-content/60">
        <Link href="/" className="hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
