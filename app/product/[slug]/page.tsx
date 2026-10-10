import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductBySlug } from "@/lib/api";
import { avgBn, changeText, priceSummary, toBn, unitShort } from "@/lib/format";
import { requireSession } from "@/lib/session";
import { textTone } from "@/lib/tone";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`); // protected route

  const p = await fetchProductBySlug(slug);
  if (!p) notFound();

  const { min, max, avg } = priceSummary(p);
  const diff = Math.abs(p.today - p.yesterday);
  const unit = unitShort(p.unit);
  const rows = p.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const move =
    p.change.dir === "up" ? (
      <>
        গতকালের তুলনায় আজ দাম <b>বেড়েছে</b> · {toBn(diff)} টাকা
      </>
    ) : p.change.dir === "down" ? (
      <>
        গতকালের তুলনায় আজ দাম <b>কমেছে</b> · {toBn(diff)} টাকা
      </>
    ) : (
      <>গতকালের মতোই আছে</>
    );

  return (
    <div className="mx-auto max-w-page space-y-4 px-4 py-6">
      <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-base-content/65">
        <Link href="/" className="hover:underline">হোম</Link>
        <span aria-hidden>›</span>
        <Link href={`/category/${p.category}`} className="hover:underline">{p.categoryNameBn}</Link>
        <span aria-hidden>›</span>
        <span className="text-base-content">{p.nameBn}</span>
      </nav>

      {/* Summary */}
      <header className="flex items-center justify-between gap-4 rounded-xl border border-base-300 bg-base-100 p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl" aria-hidden>
            {p.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{p.nameBn}</h1>
            <p className="text-xs text-base-content/60">
              প্রতি {unit} · {p.categoryNameBn}
            </p>
            <p className="mt-1 text-xs text-base-content/75">{move}</p>
          </div>
        </div>
        <div className="shrink-0 rounded-xl bg-base-200 px-5 py-3 text-center">
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-3xl font-bold leading-tight">{toBn(p.today)}</p>
          <p className="text-xs text-base-content/60">টাকা / {unit}</p>
          <p className={`mt-1 text-xs font-semibold ${textTone[p.change.dir]}`}>{changeText(p.change)}</p>
        </div>
      </header>

      <section className="rounded-xl border border-base-300 bg-base-100 p-5" aria-labelledby="price-summary">
        <h2 id="price-summary" className="text-sm font-semibold">
          দামের সারসংক্ষেপ
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            ["সর্বনিম্ন দাম", min, "text-success", "সবচেয়ে কম দামের বাজার"],
            ["সর্বাধিক দাম", max, "text-error", "সবচেয়ে বেশি দামের বাজার"],
            ["গড় দাম", avg, "text-success", `প্রতি ${unit}-এর হিসাব`],
          ].map(([label, value, color, note]) => (
            <div key={label as string} className="rounded-xl border border-base-300 p-4">
              <p className="text-xs text-base-content/65">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>
                {toBn(value as number)} <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-xs text-base-content/60">{note}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-6 text-sm font-semibold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-base-300">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="text-left text-xs text-base-content/60">
                <th className="px-4 py-3 font-normal">বাজার</th>
                <th className="px-4 py-3 font-normal">বিভাগ</th>
                <th className="px-4 py-3 text-right font-normal">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-normal">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-normal">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m, i) => (
                <tr key={m.market} className={`border-t border-base-300 ${i % 2 === 1 ? "bg-base-200/70" : ""}`}>
                  <td className="px-4 py-3">{m.market}</td>
                  <td className="px-4 py-3 text-base-content/70">{m.division}</td>
                  <td className="px-4 py-3 text-right text-base-content/70">{toBn(m.min)} টাকা</td>
                  <td className="px-4 py-3 text-right text-base-content/70">{toBn(m.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-semibold">{avgBn(m.avg)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
