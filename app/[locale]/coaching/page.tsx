"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingRequestForm } from "@/components/shared/BookingRequestForm";

const sessions = [
  { key: "session60" as const, duration: "60 min", value: "60min" },
  { key: "session90" as const, duration: "90 min", value: "90min" },
];

const steps = ["step1", "step2", "step3"] as const;

function SessionCard({
  duration,
  sessionValue,
}: {
  duration: string;
  sessionValue: string;
}) {
  const t = useTranslations("coaching");
  const bt = useTranslations("booking");
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col"
    >
      {/* Card */}
      <div className="bg-[#2D0A4E] rounded-2xl border border-white/10 overflow-hidden hover:border-[#B5F03D]/40 transition-all">
        {/* Image */}
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

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#B5F03D] text-[#1A0530]">
              {duration}
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
            onClick={handleOpen}
            className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold w-full h-11"
          >
            {bt("title")}
          </Button>
        </div>
      </div>

      {/* Inline form */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={formRef}
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-[#2D0A4E] rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-black text-white mb-6">{bt("title")}</h3>
              <BookingRequestForm
                apiEndpoint="/api/coaching-request"
                extraData={{ session: sessionValue }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CoachingPage() {
  const t = useTranslations("coaching");

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
      <section className="py-16 bg-[#2D0A4E]">
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

      {/* Session Cards */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-10 text-center"
          >
            {t("coach.title")}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {sessions.map(({ key, duration, value }) => (
              <SessionCard key={key} duration={duration} sessionValue={value} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
