"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const PLAYTOMIC_MEXICANO_SATURDAY_URL = "https://app.playtomic.io/tournaments/fee95270-a11d-4a69-85dc-22424e77458d?utm_source=manager";
const PLAYTOMIC_MEXICANO_SUNDAY_URL = "https://app.playtomic.io/tournaments/32b23a56-8f63-4b0e-98c7-0bd98788bbb3?utm_source=manager";

const links = {
  saturday: PLAYTOMIC_MEXICANO_SATURDAY_URL,
  sunday: PLAYTOMIC_MEXICANO_SUNDAY_URL,
}
const tournaments = ["saturday", "sunday"] as const;

export default function EventsPage() {
  const t = useTranslations("events");
  const [howOpen, setHowOpen] = useState(false);

  const rules = t.raw("mexicano.rules") as string[];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 bg-background-alternate relative overflow-hidden">
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

      {/* Tournaments */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-white mb-2">{t("mexicano.title")}</h2>
            <p className="text-[#E2D9F3] text-lg">{t("mexicano.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tournaments.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#2D0A4E] rounded-2xl border border-white/10 overflow-hidden hover:border-[#B5F03D]/40 transition-all"
              >
                {/* Poster Image with overlay and text */}
                <div className="relative h-96 sm:h-[26rem] overflow-hidden">
                  <Image
                    src="/Mexicano.png"
                    alt={t(`mexicano.${key}.title`)}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                    <p className="text-[#B5F03D] text-xs font-bold uppercase tracking-[0.2em]">
                      {t(`mexicano.${key}.level`)} · {t(`mexicano.${key}.time`)} · {t(`mexicano.${key}.spots`)}
                    </p>
                    <h3
                      className="text-6xl sm:text-7xl text-white leading-none"
                      style={{ fontFamily: "var(--font-black-ops)", transform: "rotate(-3deg)" }}
                    >
                      MEXICANO
                    </h3>
                    <div className="bg-[#B5F03D] text-[#1A0530] px-5 py-1 text-xs font-black uppercase tracking-widest mt-1">
                      Play. Change partners. Win.
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#1A0530] rounded-xl p-3">
                      <div className="flex items-center gap-2 text-[#B5F03D] mb-1">
                        <Clock size={14} />
                        <span className="text-xs font-bold uppercase tracking-wide">{t(`mexicano.${key}.scheduleLabel`)}</span>
                      </div>
                      <p className="text-white font-bold">{t(`mexicano.${key}.time`)}</p>
                      <p className="text-[#E2D9F3] text-xs">{t(`mexicano.${key}.duration`)}</p>
                    </div>
                    <div className="bg-[#1A0530] rounded-xl p-3">
                      <div className="flex items-center gap-2 text-[#B5F03D] mb-1">
                        <Trophy size={14} />
                        <span className="text-xs font-bold uppercase tracking-wide">
                          {t(`mexicano.${key}.prizeLabel`)}
                        </span>
                      </div>
                      <p className="text-white font-bold text-sm">{t(`mexicano.${key}.prize`)}</p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold w-full h-11"
                  >
                    <a href={links[key]} target="_blank" rel="noopener noreferrer">
                      {t("mexicano.register")}
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Mexicano Works */}
      <section className="py-16 bg-background-alternate">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setHowOpen(!howOpen)}
              className="w-full flex items-center justify-between text-left bg-[#1A0530] rounded-2xl px-6 py-5 border border-white/10 hover:border-[#B5F03D]/40 transition-all"
            >
              <span className="text-xl font-black text-white">{t("mexicano.howTitle")}</span>
              {howOpen ? (
                <ChevronUp size={20} className="text-[#B5F03D] flex-shrink-0" />
              ) : (
                <ChevronDown size={20} className="text-[#B5F03D] flex-shrink-0" />
              )}
            </button>

            {howOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-[#1A0530] rounded-2xl px-6 py-5 border border-white/10 space-y-3"
              >
                {rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#E2D9F3] text-sm">
                    <span className="w-1.5 h-1.5 bg-[#B5F03D] rounded-full flex-shrink-0 mt-1.5" />
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
