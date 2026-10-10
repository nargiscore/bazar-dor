import type { Category, Product } from "./types";

const BASE_1 = process.env.NEXT_PUBLIC_API_BASE || "https://api.api-store.workers.dev/api/bazardor";
const BASE_2 = "https://api.abcz.workers.dev/api/bazardor"; // alternative from the assignment

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  let lastErr: unknown;
  for (const base of [BASE_1, BASE_2]) {
    try {
      const res = await fetch(`${base}${path}`, init);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export const fetchProducts = () => getJson<Product[]>("/products");
export const fetchCategories = () => getJson<Category[]>("/categories");

/** Server-side: one product by slug (or null → 404). */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const all = await getJson<Product[]>("/products", { next: { revalidate: 60 } });
  return all.find((p) => p.slug === slug) ?? null;
}
