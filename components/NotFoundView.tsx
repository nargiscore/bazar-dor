import Link from "next/link";

export default function NotFoundView({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে ঠিকানাটি খুঁজছেন সেটি নেই, অথবা সরিয়ে ফেলা হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-21 text-center">
      <p className="font-display text-7xl font-bold text-primary">৪০৪</p>
      <h1 className="mt-3 text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
