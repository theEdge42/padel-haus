"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Layers, Wind, Sparkles } from "lucide-react";

const icons = [Layers, Wind, Sparkles];
const cardKeys = ["card1", "card2", "card3"] as const;

export default function ExperienceSection() {
  const t = useTranslations("home.experience");

  return (
    <section className="py-24 bg-[#1A0530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-[#E2D9F3] text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-[#2D0A4E] rounded-2xl p-8 border border-white/10 hover:border-[#B5F03D]/40 transition-all group"
              >
                <div className="w-12 h-12 bg-[#B5F03D]/15 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#B5F03D]/25 transition-colors">
                  <Icon size={24} className="text-[#B5F03D]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t(`${key}Title`)}
                </h3>
                <p className="text-[#E2D9F3] leading-relaxed">{t(`${key}Desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
