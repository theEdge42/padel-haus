"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Clock, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { PLAYTOMIC_ACTIVITIES } from "@/lib/constants";

const tournament = "americano";

export default function EventsPage() {
  const t = useTranslations("events");
  const [howOpen, setHowOpen] = useState(false);
  const rules = t.raw("americano.rules") as string[];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-background-alternate py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-5xl font-black text-white sm:text-6xl">{t("hero.title")}</h1>
            <p className="text-xl leading-relaxed text-[#E2D9F3]">{t("hero.desc")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#3B0758] transition-all hover:border-[#FFD700]/40"
          >
            <div className="relative h-96 overflow-hidden sm:h-[26rem]">
              <Image
                src="/Mexicano.png"
                alt={t(`americano.${tournament}.title`)}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700]">
                  {t(`americano.${tournament}.level`)} · {t(`americano.${tournament}.time`)} · {t(`americano.${tournament}.spots`)}
                </p>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#3B0758] p-3">
                  <div className="mb-1 flex items-center gap-2 text-[#FFD700]">
                    <Clock size={14} />
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {t(`americano.${tournament}.scheduleLabel`)}
                    </span>
                  </div>
                  <p className="font-bold text-white">{t(`americano.${tournament}.time`)}</p>
                  <p className="text-xs text-[#E2D9F3]">{t(`americano.${tournament}.duration`)}</p>
                </div>
                <div className="rounded-xl bg-[#3B0758] p-3">
                  <div className="mb-1 flex items-center gap-2 text-[#FFD700]">
                    <Trophy size={14} />
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {t(`americano.${tournament}.prizeLabel`)}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">{t(`americano.${tournament}.prize`)}</p>
                </div>
              </div>

              <Button asChild className="h-11 w-full bg-brand-accent font-bold text-[#3B0758] hover:bg-brand-accent-hover">
                <a href={PLAYTOMIC_ACTIVITIES} target="_blank" rel="noopener noreferrer">
                  {t("americano.register")}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background-alternate py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <button
              onClick={() => setHowOpen(!howOpen)}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#3B0758] px-6 py-5 text-left transition-all hover:border-[#FFD700]/40"
            >
              <span className="text-xl font-black text-white">{t("americano.howTitle")}</span>
              {howOpen ? <ChevronUp size={20} className="shrink-0 text-[#FFD700]" /> : <ChevronDown size={20} className="shrink-0 text-[#FFD700]" />}
            </button>

            {howOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 space-y-3 rounded-2xl border border-white/10 bg-[#3B0758] px-6 py-5"
              >
                {rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-[#E2D9F3]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD700]" />
                    {rule}
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
