"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "rackets" | "balls";
};

export type CartItem = Product & { quantity: number };

type CartContext = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, quantity: number) => void;
  total: number;
  count: number;
  clear: () => void;
};

const CartCtx = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id: number, quantity: number) {
    if (quantity <= 0) return removeItem(id);
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartCtx.Provider value={{ items, addItem, removeItem, updateQty, total, count, clear }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
