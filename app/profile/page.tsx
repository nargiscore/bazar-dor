import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");
  const initial = (user.name || user.email).trim().charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="text-sm text-base-content/65">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <section className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-base-300 bg-base-100 p-4">
        <div className="flex min-w-0 items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
          ) : (
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-content">
              {initial}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{user.name}</p>
            <p className="truncate text-sm text-base-content/65">{user.email}</p>
          </div>
        </div>
        <SignOutButton className="btn btn-sm btn-outline btn-error shrink-0 bg-base-100">↩ সাইন আউট</SignOutButton>
      </section>

      <section className="mt-4 rounded-xl border border-base-300 bg-base-100 p-5">
        <h2 className="font-semibold">তথ্য</h2>
        <label className="mt-4 block">
          <span className="mb-1 block text-sm text-base-content/70">নাম</span>
          <input className="input w-full border-base-300 bg-base-200/60" value={user.name} readOnly aria-readonly />
        </label>
        <Link href="/profile/update" className="btn btn-primary mt-4 w-full shadow-md">
          আপডেট
        </Link>
      </section>
    </div>
  );
}
