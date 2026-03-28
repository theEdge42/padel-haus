"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Star, Zap, Crown } from "lucide-react";

const packageKeys = ["basic", "premium", "exclusive"] as const;
const packageIcons = [Star, Zap, Crown];
const packagePrices = ["200 RON", "500 RON", "1200 RON"];

export default function CorporatePage() {
  const t = useTranslations("corporate");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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

      {/* Packages */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-white text-center mb-14"
          >
            {t("packages.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packageKeys.map((key, i) => {
              const Icon = packageIcons[i];
              const isPremium = key === "premium";
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative rounded-2xl p-8 border transition-all ${
                    isPremium
                      ? "bg-[#B5F03D]/10 border-[#B5F03D]/50 ring-2 ring-[#B5F03D]/30"
                      : "bg-[#2D0A4E] border-white/10"
                  }`}
                >
                  {isPremium && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B5F03D] text-[#1A0530] text-xs font-black px-4 py-1 rounded-full">
                      POPULAR
                    </div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                      isPremium ? "bg-[#B5F03D]/20" : "bg-[#B5F03D]/10"
                    }`}
                  >
                    <Icon size={24} className="text-[#B5F03D]" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    {t(`packages.${key}.name`)}
                  </h3>
                  <p className="text-[#E2D9F3] text-sm mb-4">{t(`packages.${key}.desc`)}</p>
                  <div className="text-3xl font-black text-[#B5F03D] mb-1">
                    {t("packages.price")} {packagePrices[i]}
                  </div>
                  <p className="text-[#E2D9F3] text-sm mb-2">{t(`packages.${key}.courts`)}</p>
                  <p className="text-[#E2D9F3] text-sm mb-6">{t(`packages.${key}.includes`)}</p>
                  <Button
                    className={`w-full font-bold ${
                      isPremium
                        ? "bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936]"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    {t("packages.inquire")}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Nights */}
      <section className="py-16 bg-[#2D0A4E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-black text-white mb-6">{t("nights.title")}</h2>
            <p className="text-[#E2D9F3] text-lg leading-relaxed">{t("nights.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2D0A4E] rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-black text-white mb-8">{t("form.title")}</h2>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-[#B5F03D] mx-auto mb-4" />
                <p className="text-white font-bold text-lg">Request sent! We&apos;ll contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("form.company")}</Label>
                    <Input
                      required
                      className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("form.name")}</Label>
                    <Input
                      required
                      className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("form.email")}</Label>
                    <Input
                      type="email"
                      required
                      className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("form.phone")}</Label>
                    <Input
                      type="tel"
                      className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("form.date")}</Label>
                    <Input
                      type="date"
                      required
                      className="bg-[#1A0530] border-white/20 text-white focus:border-[#B5F03D] [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#E2D9F3]">{t("form.people")}</Label>
                    <Input
                      type="number"
                      min="2"
                      required
                      className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#E2D9F3]">{t("form.message")}</Label>
                  <Textarea
                    rows={4}
                    className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D] resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold w-full h-12"
                >
                  {t("form.submit")}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
