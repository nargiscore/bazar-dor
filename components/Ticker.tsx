"use client";
import { changeText, toBn, unitShort } from "@/lib/format";
import { textTone } from "@/lib/tone";
import { useData } from "./DataProvider";

export default function Ticker() {
  const { products, status } = useData();

  if (status !== "ready") {
    return <div className="skeleton h-9 w-full rounded-none" aria-hidden />;
  }

  const items = products.map((p) => (
    <span key={p.id} className="inline-flex items-center gap-2 whitespace-nowrap border-r border-base-300 px-4 text-xs">
      <span aria-hidden>{p.image}</span>
      <span className="font-semibold">{p.nameBn}</span>
      <span className="text-base-content/80">
        {toBn(p.today)} টাকা/{unitShort(p.unit)}
      </span>
      <span className={`font-semibold ${textTone[p.change.dir]}`}>{changeText(p.change)}</span>
    </span>
  ));

  return (
    <div className="marquee overflow-hidden border-b border-base-300 bg-base-100 py-2.5" role="marquee" aria-label="আজকের দামের তালিকা">
      <div className="marquee-track">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
}
