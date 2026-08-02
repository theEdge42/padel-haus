"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartProvider, useCart } from "@/context/CartContext";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CheckoutForm() {
  const t = useTranslations("shop.checkout");
  const locale = useLocale();
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clear();
    setSubmitted(true);
    setTimeout(() => router.push(`/${locale}/shop`), 4000);
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <CheckCircle2 size={64} className="text-[#FFD700] mx-auto mb-6" />
        <h2 className="text-3xl font-black text-white mb-3">{t("success")}</h2>
        <p className="text-[#E2D9F3]">Redirecting to shop...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Form */}
      <div>
        <h2 className="text-3xl font-black text-white mb-8">{t("title")}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-[#E2D9F3]">{t("name")}</Label>
              <Input
                required
                className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#E2D9F3]">{t("email")}</Label>
              <Input
                type="email"
                required
                className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[#E2D9F3]">{t("address")}</Label>
            <Input
              required
              className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-[#E2D9F3]">{t("city")}</Label>
              <Input
                required
                className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#E2D9F3]">{t("zip")}</Label>
              <Input
                required
                className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
              />
            </div>
          </div>
          {/* Card fields */}
          <div className="pt-4 border-t border-white/10">
            <div className="space-y-2">
              <Label className="text-[#E2D9F3]">{t("cardNumber")}</Label>
              <Input
                required
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <div className="space-y-2">
                <Label className="text-[#E2D9F3]">{t("expiry")}</Label>
                <Input
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#E2D9F3]">{t("cvv")}</Label>
                <Input
                  required
                  placeholder="123"
                  maxLength={3}
                  className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="bg-brand-accent text-[#3B0758] hover:bg-brand-accent-hover font-bold w-full h-12 mt-4"
          >
            {t("placeOrder")} — {total} RON
          </Button>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <h2 className="text-2xl font-black text-white mb-6">{t("orderSummary")}</h2>
        <div className="bg-[#3B0758] rounded-2xl p-6 border border-white/10 space-y-4">
          {items.length === 0 ? (
            <p className="text-[#E2D9F3]">No items in cart</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{item.name}</p>
                    <p className="text-[#E2D9F3] text-xs">× {item.quantity}</p>
                  </div>
                  <p className="text-[#FFD700] font-bold">{item.price * item.quantity} RON</p>
                </div>
              ))}
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-[#E2D9F3] font-semibold">Total</span>
                <span className="text-[#FFD700] font-black text-xl">{total} RON</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const locale = useLocale();

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#3B0758]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 text-[#E2D9F3] hover:text-[#FFD700] transition-colors mb-10 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CheckoutForm />
          </motion.div>
        </div>
      </div>
    </CartProvider>
  );
}
