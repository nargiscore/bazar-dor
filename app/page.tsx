"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useData } from "@/components/DataProvider";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import { banglaDate, toBn } from "@/lib/format";
import type { Product } from "@/lib/types";

function Section({
  title, subtitle, id, products, mark,
}: { title: string; subtitle?: string; id?: string; products: Product[]; mark?: React.ReactNode }) {
  return (
    <section id={id} className="pt-9">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        {mark}
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-base-content/65">{subtitle}</p>}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

function SkeletonSection({ title, count, mark }: { title: string; count: number; mark?: React.ReactNode }) {
  return (
    <section className="pt-9">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        {mark}
        {title}
      </h2>
      <div className="mt-4">
        <GridSkeleton count={count} />
      </div>
    </section>
  );
}

const Up = <span className="text-sm text-error">▲</span>;
const Down = <span className="text-sm text-success">▼</span>;

export default function Home() {
  const { products, status, reload } = useData();
  const [date, setDate] = useState("");
  useEffect(() => setDate(banglaDate()), []);

  const { risers, fallers } = useMemo(
    () => ({
      risers: products.filter((p) => p.change.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6),
      fallers: products.filter((p) => p.change.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6),
    }),
    [products],
  );

  return (
    <div className="mx-auto max-w-page px-4 py-6">
      {/* Hero */}
      <section className="grid items-center gap-6 rounded-2xl border border-base-300 bg-base-100 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="inline-block min-h-6 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{date}</span>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-base-content/65">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-5 shadow-md">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image src="/bazar-hero.png" alt="ফলে ভরা একটি বাজারের ঝুড়ি" width={315} height={263} priority className="h-auto w-full max-w-72" />
        </div>
      </section>

      {status === "error" && (
        <div role="alert" className="alert alert-error alert-soft mt-8">
          <span>দামের তথ্য আনা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</span>
          <button className="btn btn-sm" onClick={reload}>
            আবার চেষ্টা করুন
          </button>
        </div>
      )}

      {status === "loading" ? (
        <>
          <SkeletonSection title="আজ দাম বেড়েছে" count={6} mark={Up} />
          <SkeletonSection title="আজ দাম কমেছে" count={6} mark={Down} />
          <SkeletonSection title="সব পণ্য" count={9} />
        </>
      ) : status === "ready" ? (
        <>
          <Section title="আজ দাম বেড়েছে" mark={Up} products={risers} />
          <Section title="আজ দাম কমেছে" mark={Down} products={fallers} />
          <Section id="সব-পণ্য" title="সব পণ্য" subtitle={`মোট ${toBn(products.length)} পণ্য দেখানো হচ্ছে`} products={products} />
        </>
      ) : null}
    </div>
  );
}
