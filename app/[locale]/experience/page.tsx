"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

const courtImages = [
  "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  "https://images.unsplash.com/photo-1545109621-7f3cdc6dab5c?w=800&q=80",
  "https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?w=800&q=80",
  "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
];

const courtNameKeys = ["court1", "court2", "court3", "court4"] as const;

export default function ExperiencePage() {
  const t = useTranslations("experience");

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

      {/* Courts Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-white mb-3">{t("courts.title")}</h2>
            <p className="text-[#E2D9F3] text-lg">{t("courts.subtitle")}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {courtNameKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
              >
                <Image
                  src={courtImages[i]}
                  alt={t(`courts.${key}`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0530] via-[#1A0530]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl mb-1">{t(`courts.${key}`)}</h3>
                  <p className="text-[#E2D9F3] text-sm">{t("courts.courtDesc")}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept + Design */}
      <section className="py-16 bg-[#2D0A4E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(["concept", "design"] as const).map((section, i) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#1A0530] rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{t(`${section}.title`)}</h3>
                <p className="text-[#E2D9F3] leading-relaxed">{t(`${section}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-black text-white mb-4">{t("location.title")}</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-[#E2D9F3]">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-[#B5F03D]" />
                {t("location.address")}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-[#B5F03D]" />
                {t("location.hours")}
              </span>
            </div>
          </motion.div>

          <div className="rounded-2xl overflow-hidden border border-white/10 h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.1975897738!2d23.5874!3d46.7712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490d70f1a4be3b%3A0x9a7a3a40d15e60d7!2sCluj-Napoca!5e0!3m2!1sen!2sro!4v1617000000000!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Padel Haus Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
