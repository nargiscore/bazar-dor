import Link from "next/link";
import { changeText, toBn, unitLabel } from "@/lib/format";
import { badgeTone } from "@/lib/tone";
import type { Product } from "@/lib/types";

export function ChangeBadge({ change }: { change: Product["change"] }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeTone[change.dir]}`}>
      {changeText(change)}
    </span>
  );
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-xl border border-base-300 bg-base-100 p-4 shadow-[0_1px_2px_rgba(16,36,26,0.04)] transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-base-200 text-xl" aria-hidden>
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-snug">{p.nameBn}</h3>
          <p className="text-xs text-base-content/60">{unitLabel(p.unit)}</p>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-base-content/70">আজকের দাম</p>
          <p className="text-lg font-bold leading-tight">
            {toBn(p.today)} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
