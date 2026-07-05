"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Footprints, ArrowRight } from "lucide-react";
import { PLAYTOMIC_APP, WHATSAPP_URL } from "@/lib/constants";

const bookingSteps = ["step1", "step2", "step3"] as const;
const levels = ["beginner", "intermediate", "advanced"] as const;

export default function BeginnersPage() {
  const t = useTranslations("beginners");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 bg-background-alternate relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 mb-6 text-sm px-4 py-1.5">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-[#E2D9F3] text-lg leading-relaxed">{t("hero.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/*/!* How booking works *!/*/}
      {/*<section className="py-20">*/}
      {/*  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">*/}
      {/*    <motion.h2*/}
      {/*      initial={{ opacity: 0, y: 20 }}*/}
      {/*      whileInView={{ opacity: 1, y: 0 }}*/}
      {/*      viewport={{ once: true }}*/}
      {/*      className="text-3xl font-black text-white mb-10 text-center"*/}
      {/*    >*/}
      {/*      {t("booking.title")}*/}
      {/*    </motion.h2>*/}
      {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">*/}
      {/*      {bookingSteps.map((step, i) => (*/}
      {/*        <motion.div*/}
      {/*          key={step}*/}
      {/*          initial={{ opacity: 0, y: 30 }}*/}
      {/*          whileInView={{ opacity: 1, y: 0 }}*/}
      {/*          viewport={{ once: true }}*/}
      {/*          transition={{ delay: i * 0.1 }}*/}
      {/*          className="bg-[#3B0758] rounded-2xl p-6 border border-white/10 text-center"*/}
      {/*        >*/}
      {/*          <div className="w-10 h-10 rounded-full bg-[#FFD700] text-[#3B0758] font-black text-lg flex items-center justify-center mx-auto mb-4">*/}
      {/*            {i + 1}*/}
      {/*          </div>*/}
      {/*          <h3 className="text-white font-bold mb-2">{t(`booking.${step}Title`)}</h3>*/}
      {/*          <p className="text-[#E2D9F3] text-sm leading-relaxed">{t(`booking.${step}Desc`)}</p>*/}
      {/*        </motion.div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Come alone */}
      <section className="py-20 bg-background-alternate">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#4A0E6D] rounded-2xl p-8 border border-white/10 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FFD700]/15 flex items-center justify-center mx-auto mb-5">
              <MessageCircle className="text-[#FFD700]" size={22} />
            </div>
            <h2 className="text-2xl font-black text-white mb-3">{t("alone.title")}</h2>
            <p className="text-[#E2D9F3] leading-relaxed mb-6 max-w-xl mx-auto">{t("alone.desc")}</p>
            <Button asChild className="bg-[#FFD700] text-[#25003D] hover:bg-[#FFE773] font-bold">
              <Link href={`/${locale}/community`}>
                {t("alone.cta")}
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gear */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-10 text-center"
          >
            {t("gear.title")}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#3B0758] rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-white font-bold mb-2">{t("gear.racketTitle")}</h3>
              <p className="text-[#E2D9F3] text-sm leading-relaxed mb-3">{t("gear.racketDesc")}</p>
              <Link
                href={`/${locale}#pricing`}
                className="inline-flex items-center gap-1.5 text-[#FFD700] text-sm font-semibold hover:underline"
              >
                {t("gear.racketLink")} <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#3B0758] rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <Footprints className="text-[#FFD700]" size={18} />
                <h3 className="text-white font-bold">{t("gear.shoesTitle")}</h3>
              </div>
              <p className="text-[#E2D9F3] text-sm leading-relaxed">{t("gear.shoesDesc")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skill levels */}
      <section className="py-20 bg-background-alternate">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-10 text-center"
          >
            {t("levels.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((level, i) => (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#4A0E6D] rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-[#FFD700] font-black text-lg mb-2">
                  {t(`levels.${level}Title`)}
                </h3>
                <p className="text-[#E2D9F3] text-sm leading-relaxed">
                  {t(`levels.${level}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-8"
          >
            {t("cta.title")}
          </motion.h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("cta.communityButton")}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#FFD700] text-[#25003D] hover:bg-[#FFE773] font-bold"
            >
              <a href={PLAYTOMIC_APP} target="_blank" rel="noopener noreferrer">
                {t("cta.bookButton")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
