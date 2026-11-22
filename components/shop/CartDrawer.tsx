"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const t = useTranslations("shop");
  const locale = useLocale();
  const { items, removeItem, updateQty, total, count } = useCart();

  return (
    <Sheet>
      <SheetTrigger
        className="relative p-2 text-lilac hover:text-amber transition-colors"
        aria-label="Open cart"
      >
        <ShoppingCart size={22} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber text-noapte text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="bg-mov border-crem/10 text-crem w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-crem text-xl font-black">{t("cart.title")}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-lilac text-center py-10">{t("cart.empty")}</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-noapte rounded-xl p-3 border border-crem/10"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-crem font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-amber font-bold text-sm">{item.price} RON</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-crem/10 hover:bg-crem/20 text-crem text-xs"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-crem text-sm font-semibold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-crem/10 hover:bg-crem/20 text-crem text-xs"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-lilac hover:text-red-400 transition-colors self-start p-1"
                  aria-label={t("cart.remove")}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-crem/10 pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lilac font-semibold">{t("cart.total")}</span>
              <span className="text-amber font-black text-xl">{total} RON</span>
            </div>
            <Button
              asChild
              className="bg-brand-accent text-noapte hover:bg-brand-accent-hover font-bold w-full h-12"
            >
              <Link href={`/${locale}/shop/checkout`}>{t("cart.checkout")}</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
