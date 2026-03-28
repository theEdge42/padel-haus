"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Search, Heart } from "lucide-react";
import Image from "next/image";

const socialImages = [
  "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
  "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80",
  "https://images.unsplash.com/photo-1545109621-7f3cdc6dab5c?w=600&q=80",
  "https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?w=600&q=80",
  "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
];

const stepIcons = [Users, Search, Heart];
const stepKeys = ["step1", "step2", "step3"] as const;

export default function CommunityPage() {
  const t = useTranslations("community");

  return (
    <div className="min-h-screen bg-[#1A0530]">
      {/* Hero */}
      <section className="py-24 bg-[#2D0A4E] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B5F03D]/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#B5F03D]/20 text-[#B5F03D] border-[#B5F03D]/30 mb-6 text-sm px-4 py-1.5">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-[#E2D9F3] text-xl leading-relaxed">{t("hero.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-white text-center mb-14"
          >
            {t("howItWorks.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stepKeys.map((key, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-[#2D0A4E] rounded-2xl p-8 border border-white/10 text-center"
                >
                  <div className="w-14 h-14 bg-[#B5F03D]/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon size={28} className="text-[#B5F03D]" />
                  </div>
                  <div className="text-[#B5F03D] font-black text-3xl mb-2">{i + 1}</div>
                  <h3 className="text-white font-bold text-xl mb-3">
                    {t(`howItWorks.${key}Title`)}
                  </h3>
                  <p className="text-[#E2D9F3] leading-relaxed">
                    {t(`howItWorks.${key}Desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-[#2D0A4E]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#1A0530] rounded-2xl p-10 border border-white/10"
          >
            <div className="w-16 h-16 bg-green-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={32} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">{t("whatsapp.title")}</h2>
            <p className="text-[#E2D9F3] mb-8 leading-relaxed">{t("whatsapp.desc")}</p>
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 h-12">
              <MessageCircle className="mr-2" size={20} />
              {t("whatsapp.button")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Partner Finder */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2D0A4E] rounded-2xl p-10 border border-white/10 text-center"
          >
            <h2 className="text-3xl font-black text-white mb-4">{t("partner.title")}</h2>
            <p className="text-[#E2D9F3] text-lg leading-relaxed">{t("partner.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-black text-white mb-3">{t("gallery.title")}</h2>
            <p className="text-[#E2D9F3]">{t("gallery.subtitle")}</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {socialImages.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Community moment ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
