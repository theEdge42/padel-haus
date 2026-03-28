"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useCart, type Product } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const t = useTranslations("shop");
  const { addItem } = useCart();

  return (
    <div className="bg-[#2D0A4E] rounded-2xl overflow-hidden border border-white/10 hover:border-[#B5F03D]/40 transition-all group flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <span className="text-[#B5F03D] text-xs font-bold uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="text-white font-bold mt-1 mb-2">{product.name}</h3>
          <p className="text-2xl font-black text-white">{product.price} <span className="text-sm font-normal text-[#E2D9F3]">RON</span></p>
        </div>
        <Button
          onClick={() => addItem(product)}
          className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold w-full mt-4"
        >
          <ShoppingCart className="mr-2" size={16} />
          {t("addToCart")}
        </Button>
      </div>
    </div>
  );
}
