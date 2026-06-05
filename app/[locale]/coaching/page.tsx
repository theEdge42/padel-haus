"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingRequestForm } from "@/components/shared/BookingRequestForm";

const steps = ["step1", "step2", "step3"] as const;

export default function CoachingPage() {
  const t = useTranslations("coaching");
  const bt = useTranslations("booking");
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" />
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

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-10 text-center"
          >
            {t("howItWorks.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1A0530] rounded-2xl p-6 border border-white/10 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#B5F03D] text-[#1A0530] font-black text-lg flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="text-white font-bold mb-2">{t(`howItWorks.${step}Title`)}</h3>
                <p className="text-[#E2D9F3] text-sm leading-relaxed">{t(`howItWorks.${step}Desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-10 text-center"
          >
            {t("coach.title")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2D0A4E] rounded-2xl border border-white/10 overflow-hidden hover:border-[#B5F03D]/40 transition-all"
          >
            <div className="relative w-full aspect-[4/3] bg-[#1A0530] flex items-center justify-center overflow-hidden">
              <Image
                src="/PadelHaus.png"
                alt="Padel Haus"
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A4E]/60 to-transparent pointer-events-none" />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#B5F03D] text-[#1A0530]">
                  60 / 90 min
                </span>
                <span className="text-[#E2D9F3] text-xs bg-white/10 px-3 py-1 rounded-full">
                  Padel
                </span>
                <span className="text-[#E2D9F3] text-xs bg-white/10 px-3 py-1 rounded-full">
                  Padel Haus Bucharest
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">Private Class</h3>
              <p className="text-[#E2D9F3] text-sm leading-relaxed">{t("coach.bio")}</p>

              <Button
                onClick={scrollToForm}
                className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold w-full h-11"
              >
                {bt("title")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div ref={formRef} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2D0A4E] rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-black text-white mb-8">{bt("title")}</h2>
            <BookingRequestForm
              apiEndpoint="/api/coaching-request"
              extraData={{ session: "60/90 min" }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
