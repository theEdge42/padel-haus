"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Sun } from "lucide-react";
import { PLAYTOMIC_MEMBERSHIPS, WHATSAPP_CONTACT_URL } from "@/lib/constants";

const tiers = [
  { key: "daily" as const, icon: Sun, features: ["feature1", "feature2", "feature3"], popular: false },
  { key: "full" as const, icon: Calendar, features: ["feature1", "feature2", "feature3", "feature4"], popular: true },
];

export default function MembershipsPage() {
  const t = useTranslations("memberships");

  return (
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

      {/* Plans */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tiers.map(({ key, icon: Icon, features, popular }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative rounded-2xl p-8 border flex flex-col ${
                  popular
                    ? "bg-[#FFD700]/10 border-[#FFD700]/50 ring-2 ring-[#FFD700]/30"
                    : "bg-[#4A0E6D] border-white/10"
                }`}
              >
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#3B0758] text-xs font-black px-4 py-1 rounded-full">
                    {t("popular")}
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    popular ? "bg-[#FFD700]/20" : "bg-[#FFD700]/10"
                  }`}
                >
                  <Icon size={24} className="text-[#FFD700]" />
                </div>

                <h3 className="text-2xl font-black text-white mb-1">{t(`${key}.name`)}</h3>
                <p className="text-[#E2D9F3]/70 text-sm mb-4">{t(`${key}.window`)}</p>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-[#FFD700]">{t(`${key}.price`)}</span>
                  <span className="text-[#E2D9F3]/70 text-sm">{t(`${key}.period`)}</span>
                </div>

                <p className="text-[#E2D9F3] text-sm mb-6">{t(`${key}.desc`)}</p>

                <ul className="space-y-3 mb-6 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#E2D9F3]">
                      <Check size={16} className="text-[#FFD700] mt-0.5 shrink-0" />
                      {t(`${key}.${f}`)}
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 mb-6 pt-4 border-t border-white/10 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#E2D9F3]/70">{t(`${key}.priorityLabel`)}</span>
                    <span className="text-white font-semibold">{t(`${key}.priorityValue`)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#E2D9F3]/70">{t(`${key}.cancellationLabel`)}</span>
                    <span className="text-white font-semibold text-right">
                      {t(`${key}.cancellationValue`)}
                    </span>
                  </div>
                </div>

                <Button
                  asChild
                  className={`w-full font-bold ${
                    popular
                      ? "bg-brand-accent text-[#25003D] hover:bg-brand-accent-hover"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <a href={PLAYTOMIC_MEMBERSHIPS} target="_blank" rel="noopener noreferrer">
                    {t("cta")}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-[#E2D9F3]/60 text-sm mt-10 max-w-md mx-auto">
            {t.rich("note", {
              whatsapp: (chunks) => (
                <a
                  href={WHATSAPP_CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFD700] underline underline-offset-2 hover:text-[#FFE773]"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </section>
    </div>
  );
}
