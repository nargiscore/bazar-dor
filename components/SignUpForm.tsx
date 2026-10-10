"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fail = (msg: string) => {
    setError(msg);
    toast.error(msg);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return fail("আপনার নাম দিন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল ঠিকানা দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name: name.trim(), email, password });
    setLoading(false);
    if (error) {
      const taken = /exist|already/i.test(error.message ?? "");
      return fail(taken ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে" : error.message || "রেজিস্ট্রেশন করা যায়নি");
    }
    toast.success("রেজিস্ট্রেশন সফল! এবার সাইন ইন করুন");
    router.push("/signin");
  };

  const field = "input w-full border-base-300 bg-base-100";
  const label = "mb-1 block text-sm font-medium";

  return (
    <div className="mx-auto max-w-md px-4 py-11">
      <h1 className="text-center text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-1 text-center text-sm text-base-content/65">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

      <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-6">
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <label className="block">
            <span className={label}>নাম</span>
            <input type="text" autoComplete="name" className={field} placeholder="যেমন: রহিম উদ্দিন" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block">
            <span className={label}>ইমেইল</span>
            <input type="email" autoComplete="email" className={field} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <span className={label}>পাসওয়ার্ড</span>
            <input type="password" autoComplete="new-password" className={field} placeholder="কমপক্ষে ৮ অক্ষর" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label className="block">
            <span className={label}>পাসওয়ার্ড নিশ্চিত করুন</span>
            <input type="password" autoComplete="new-password" className={field} placeholder="আবার লিখুন" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </label>
          {error && (
            <p role="alert" className="text-sm text-error">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-primary w-full shadow-md" disabled={loading}>
            {loading && <span className="loading loading-spinner loading-sm" />}
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="divider my-4 text-xs text-base-content/55">অথবা</div>
        <SocialButtons next="/" />

        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-primary hover:underline">
            সাইন ইন করুন
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
