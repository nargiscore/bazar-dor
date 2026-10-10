"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">কিছু একটা ভুল হয়েছে</h1>
      <p className="mt-2 text-base-content/70">দামের তথ্য আনা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
      <button onClick={reset} className="btn btn-primary mt-6">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
