"use client";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useData } from "@/components/DataProvider";
import NotFoundView from "@/components/NotFoundView";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import { sortProducts, toBn, type SortKey } from "@/lib/format";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories, status, reload } = useData();
  const [sort, setSort] = useState<SortKey>("default");

  const category = categories.find((c) => c.slug === slug);
  const items = useMemo(() => sortProducts(products.filter((p) => p.category === slug), sort), [products, slug, sort]);

  if (status === "error") {
    return (
      <div className="mx-auto max-w-page px-4 py-10">
        <div role="alert" className="alert alert-error alert-soft">
          <span>দামের তথ্য আনা যায়নি।</span>
          <button className="btn btn-sm" onClick={reload}>
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  if (status === "ready" && (!category || items.length === 0)) {
    return (
      <NotFoundView
        title="এই বিভাগে কোনো পণ্য নেই"
        message="বিভাগটি খুঁজে পাওয়া যায়নি, অথবা এখানে এখনো কোনো পণ্য যোগ হয়নি।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-page space-y-4 px-4 py-6">
      <section className="flex items-center gap-4 rounded-xl border border-base-300 bg-base-100 p-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-200 text-2xl" aria-hidden>
          {category?.icon}
        </span>
        <div>
          {category ? <h1 className="text-2xl font-bold">{category.nameBn}</h1> : <div className="skeleton h-8 w-32" />}
          {status === "ready" && (
            <p className="text-sm text-base-content/65">{toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          )}
        </div>
      </section>

      <section className="flex items-center justify-end gap-3 rounded-xl border border-base-300 bg-base-100 px-5 py-3">
        <label htmlFor="sort" className="text-sm text-base-content/70">
          সাজান
        </label>
        <select
          id="sort"
          className="select select-sm w-auto min-w-32 border-base-300 bg-base-100"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </section>

      {status === "ready" && <p className="text-xs text-base-content/65">মোট {toBn(items.length)}টি পণ্য দেখানো হচ্ছে</p>}

      {status === "loading" ? (
        <GridSkeleton count={6} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
