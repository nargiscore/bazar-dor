"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm text-base-content/70">নাম</span>
        <input className="input w-full border-base-300 bg-base-200" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </label>
      <button type="submit" className="btn btn-primary w-full shadow-md" disabled={loading}>
        {loading && <span className="loading loading-spinner loading-sm" />}
        আপডেট
      </button>
    </form>
  );
}
