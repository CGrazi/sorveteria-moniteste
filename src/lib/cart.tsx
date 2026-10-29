import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = { slug: string; nome: string; preco: number; qtd: number };

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qtd">, qtd?: number) => void;
  setQtd: (slug: string, qtd: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "moniteste-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  const save = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };
  const add: CartCtx["add"] = (item, qtd = 1) => {
    const exists = items.find((i) => i.slug === item.slug);
    save(exists ? items.map((i) => (i.slug === item.slug ? { ...i, qtd: i.qtd + qtd } : i)) : [...items, { ...item, qtd }]);
  };
  const setQtd = (slug: string, qtd: number) =>
    save(qtd <= 0 ? items.filter((i) => i.slug !== slug) : items.map((i) => (i.slug === slug ? { ...i, qtd } : i)));
  const clear = () => save([]);
  const total = items.reduce((s, i) => s + i.preco * i.qtd, 0);
  const count = items.reduce((s, i) => s + i.qtd, 0);
  return <Ctx.Provider value={{ items, add, setQtd, clear, total, count }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
