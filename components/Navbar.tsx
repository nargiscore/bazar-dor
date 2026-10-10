"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { banglaDate } from "@/lib/format";
import { useData } from "./DataProvider";
import SignOutButton from "./SignOutButton";

const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);
const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10a6 6 0 010 12h-2" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const { categories, products, status } = useData();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");

  useEffect(() => setDate(banglaDate()), []);

  // active category: /category/x -> x ; /product/y -> y's category
  let activeSlug: string | null = null;
  if (pathname.startsWith("/category/")) activeSlug = decodeURIComponent(pathname.split("/")[2] ?? "");
  else if (pathname.startsWith("/product/")) {
    const s = decodeURIComponent(pathname.split("/")[2] ?? "");
    activeSlug = products.find((p) => p.slug === s)?.category ?? null;
  }

  const initial = (session?.user.name || session?.user.email || "?").trim().charAt(0).toUpperCase();
  const firstName = (session?.user.name || "").trim().split(/\s+/)[0];

  return (
    <header className="border-b border-base-200 bg-[#f9fbf9]">
      <div className="mx-auto flex max-w-page items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label="বাজার দর, হোম পেজ">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm">
            <Image src="/logo-icon.png" alt="" width={18} height={18} className="brightness-0 invert" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold">বাজার দর</span>
            <span className="min-h-4 text-[11px] text-base-content/60">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          {isPending ? (
            <div className="skeleton h-8 w-24 rounded-lg" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium hover:bg-base-200" aria-label="প্রোফাইল মেনু">
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-content">{initial}</span>
                )}
                <span className="max-w-24 truncate">{firstName}</span>
                <span className="text-[8px] text-base-content/50" aria-hidden>▼</span>
              </button>
              <div tabIndex={0} className="dropdown-content z-50 mt-2 w-60 rounded-xl border border-base-300 bg-base-100 p-3 shadow-lg">
                <p className="text-sm font-semibold">{session.user.name}</p>
                <p className="truncate text-xs text-base-content/60">{session.user.email}</p>
                <div className="my-2 border-t border-base-300" />
                <Link href="/profile" className="flex items-center gap-2 rounded-md px-1 py-1.5 text-sm hover:bg-base-200">
                  <UserIcon /> আমার প্রোফাইল
                </Link>
                <SignOutButton className="flex w-full items-center gap-2 rounded-md px-1 py-1.5 text-sm text-error hover:bg-base-200">
                  <LogoutIcon /> সাইন আউট
                </SignOutButton>
              </div>
            </div>
          ) : (
            <>
              <Link href="/signin" className="rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-base-200">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm shadow-sm">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav aria-label="পণ্যের বিভাগ" className="border-t border-base-300/70">
        <div className="no-scrollbar mx-auto flex max-w-page items-center gap-1 overflow-x-auto px-4 py-2">
          {status === "loading" &&
            Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-8 w-20 shrink-0 rounded-lg" />)}
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeSlug === c.slug ? "bg-primary text-primary-content shadow-sm" : "hover:bg-base-200"
              }`}
            >
              <span aria-hidden>{c.icon}</span> {c.nameBn}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
