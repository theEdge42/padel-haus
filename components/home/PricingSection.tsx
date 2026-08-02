"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Moon } from "lucide-react";
import { PLAYTOMIC_RESERVATIONS } from "@/lib/constants";

export default function PricingSection() {
  const t = useTranslations("pricing");
  const locale = useLocale();

  return (
    <section id="pricing" className="scroll-mt-24 bg-background py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">{t("title")}</h2>
          <p className="text-[#E2D9F3]/80 max-w-xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Court pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#4A0E6D] border border-white/10 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-6">{t("courtTitle")}</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#FFD700]/15 flex items-center justify-center shrink-0">
                <Clock className="text-[#FFD700]" size={20} />
              </div>
              <div>
                <p className="text-[#E2D9F3]/70 text-sm">{t("weekdayLabel")}</p>
                <p className="text-white text-xl font-bold">{t("weekdayPrice")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#FFD700]/15 flex items-center justify-center shrink-0">
                <Moon className="text-[#FFD700]" size={20} />
              </div>
              <div>
                <p className="text-[#E2D9F3]/70 text-sm">{t("eveningLabel")}</p>
                <p className="text-white text-xl font-bold">{t("eveningPrice")}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <span className="text-[#E2D9F3]/80 text-sm">{t("racketLabel")}</span>
              <span className="text-white font-semibold">{t("racketPrice")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#E2D9F3]/80 text-sm">{t("ballsLabel")}</span>
              <span className="text-white font-semibold">{t("ballsPrice")}</span>
            </div>
          </div>
        </motion.div>

        {/* Teasers */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#3B0758] border border-white/10 rounded-2xl p-6"
          >
            <p className="text-white font-semibold mb-1">{t("academyTeaser")}</p>
            <Link
              href={`/${locale}/coaching`}
              className="inline-flex items-center gap-1.5 text-[#FFD700] text-sm font-semibold hover:underline"
            >
              {t("academyLink")} <ArrowRight size={14} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#3B0758] border border-white/10 rounded-2xl p-6"
          >
            <p className="text-white font-semibold mb-1">{t("membershipTeaser")}</p>
            <Link
              href={`/${locale}/memberships`}
              className="inline-flex items-center gap-1.5 text-[#FFD700] text-sm font-semibold hover:underline"
            >
              {t("membershipLink")} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-accent text-[#25003D] hover:bg-brand-accent-hover font-bold text-base px-10 h-14"
          >
            <a href={PLAYTOMIC_RESERVATIONS} target="_blank" rel="noopener noreferrer">
              {t("cta")}
              <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
