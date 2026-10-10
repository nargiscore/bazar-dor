import type { Product } from "./types";

const bn = (opts?: Intl.NumberFormatOptions) => new Intl.NumberFormat("bn-BD", opts);

/** 1850 -> ১,৮৫০ */
export const toBn = (n: number) => bn({ maximumFractionDigits: 0 }).format(Math.round(n));

/** 2.1 -> ২.১ (always one decimal) */
export const pctBn = (n: number) =>
  bn({ minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(Math.abs(n));

/** 1850 -> ১,৮৫০ টাকা */
export const taka = (n: number) => `${toBn(n)} টাকা`;

const UNITS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
export const unitLabel = (u: string) => UNITS[u] ?? `প্রতি ${u}`;

export const changeText = (c: Product["change"]) =>
  c.dir === "up" ? `▲ ${pctBn(c.pct)}%` : c.dir === "down" ? `▼ ${pctBn(c.pct)}%` : `— ${pctBn(0)}%`;

export const banglaDate = (d = new Date()) =>
  d.toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export type SortKey = "default" | "asc" | "desc";

/** Sorts by the numeric price (not the Bengali string), so ৯ never sorts after ১০০. */
export function sortProducts(list: Product[], key: SortKey) {
  if (key === "default") return list;
  return [...list].sort((a, b) => (key === "asc" ? a.today - b.today : b.today - a.today));
}

export function priceSummary(p: Product) {
  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length;
  return { min, max, avg };
}

const SHORT: Record<string, string> = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
export const unitShort = (u: string) => SHORT[u] ?? u;

/** 63.5 -> ৬৩.৫০, 62 -> ৬২ */
export const avgBn = (n: number) =>
  Number.isInteger(n)
    ? toBn(n)
    : bn({ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
