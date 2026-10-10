"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "@/lib/api";
import type { Category, Product } from "@/lib/types";

type Status = "loading" | "ready" | "error";
type Ctx = {
  products: Product[];
  categories: Category[];
  status: Status;
  reload: () => void;
};

const DataCtx = createContext<Ctx>({
  products: [],
  categories: [],
  status: "loading",
  reload: () => {},
});

export const useData = () => useContext(DataCtx);

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([p, c]) => {
        if (cancelled) return;
        setProducts(p);
        setCategories(c);
        setStatus("ready");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  return (
    <DataCtx.Provider value={{ products, categories, status, reload }}>{children}</DataCtx.Provider>
  );
}
