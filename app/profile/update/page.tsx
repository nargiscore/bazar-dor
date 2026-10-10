import Link from "next/link";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export default async function UpdateProfilePage() {
  const { user } = await requireSession("/profile/update");
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/profile" className="text-xs text-base-content/65 hover:underline">
        ← প্রোফাইলে ফিরে যান
      </Link>
      <h1 className="mt-3 text-2xl font-bold">তথ্য আপডেট</h1>
      <p className="text-sm text-base-content/65">আপনার নাম পরিবর্তন করুন।</p>
      <section className="mt-5 rounded-xl border border-base-300 bg-base-100 p-5">
        <h2 className="font-semibold">তথ্য</h2>
        <UpdateProfileForm initialName={user.name} />
      </section>
    </div>
  );
}
