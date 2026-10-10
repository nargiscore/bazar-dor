"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.5-4.1 7-10.2 7-17.6z" />
    <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 010-9.4l-7.9-6.1a24 24 0 000 21.6l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M12 .5a11.5 11.5 0 00-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0012 .5z" />
  </svg>
);

export default function SocialButtons({ next = "/" }: { next?: string }) {
  const [busy, setBusy] = useState<string | null>(null);

  const go = async (provider: "google" | "github") => {
    setBusy(provider);
    const { error } = await authClient.signIn.social({ provider, callbackURL: next });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
      setBusy(null);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button type="button" className="btn btn-sm h-10 border-base-300 bg-base-100 text-xs font-medium" onClick={() => go("google")} disabled={busy !== null}>
        {busy === "google" ? <span className="loading loading-spinner loading-sm" /> : <GoogleIcon />}
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" className="btn btn-sm h-10 border-base-300 bg-base-100 text-xs font-medium" onClick={() => go("github")} disabled={busy !== null}>
        {busy === "github" ? <span className="loading loading-spinner loading-sm" /> : <GitHubIcon />}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
