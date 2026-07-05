"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/shop/ProductCard";
import CartDrawer from "@/components/shop/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import type { Product } from "@/context/CartContext";

const products: Product[] = [
  {
    id: 1,
    name: "Babolat Viper Carbon",
    price: 680,
    image: "/5.png",
    category: "rackets",
  },
  {
    id: 2,
    name: "Head Graphene 360",
    price: 520,
    image: "/5.png",
    category: "rackets",
  },
  {
    id: 3,
    name: "Wilson Blade Pro",
    price: 490,
    image: "/5.png",
    category: "rackets",
  },
  {
    id: 4,
    name: "Dunlop Padel Pro (3-pack)",
    price: 75,
    image: "/5.png",
    category: "balls",
  },
  {
    id: 5,
    name: "Head Padel Pro (3-pack)",
    price: 65,
    image: "/5.png",
    category: "balls",
  },
];

export default function ShopPage() {
  const t = useTranslations("shop");
  const [filter, setFilter] = useState<"all" | "rackets" | "balls">("all");

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  const categories = [
    { key: "all" as const, label: t("categories.all") },
    { key: "rackets" as const, label: t("categories.rackets") },
    { key: "balls" as const, label: t("categories.balls") },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-24 bg-background-alternate relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 mb-6 text-sm px-4 py-1.5">
                {t("hero.badge")}
              </Badge>
              <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-[#E2D9F3] text-xl leading-relaxed">{t("hero.desc")}</p>
            </motion.div>
          </div>
        </section>

        {/* Shop */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter + Cart */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div className="flex gap-2 flex-wrap">
                {categories.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      filter === key
                        ? "bg-[#FFD700] text-[#3B0758]"
                        : "bg-white/10 text-[#E2D9F3] hover:bg-white/20"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <CartDrawer />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </CartProvider>
  );
}
