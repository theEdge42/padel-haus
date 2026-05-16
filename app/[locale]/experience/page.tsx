"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";

const galleryImages = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/6.png",
  "/7.png",
];

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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1424.6245643968098!2d26.179369830486497!3d44.428051670800954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff005138e94d%3A0x859648e1e9b81efa!2sPadel%20Haus%20Bucharest!5e0!3m2!1sen!2sro!4v1775249393523!5m2!1sen!2sro"
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

      {/* Photo Gallery */}
      <section className="py-24 bg-[#2D0A4E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-white mb-10"
          >
            {t("gallery.title")}
          </motion.h2>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="break-inside-avoid overflow-hidden rounded-xl"
              >
                <Image
                  src={src}
                  alt={`Padel Haus ${i + 1}`}
                  width={800}
                  height={i % 3 === 0 ? 600 : 400}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-16 bg-[#1A0530]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-4">{t("gallery.videoTitle")}</h2>
            <p className="text-[#E2D9F3] mb-8">{t("gallery.videoDesc")}</p>
            <div className="rounded-2xl overflow-hidden aspect-video bg-[#2D0A4E] border border-white/10">
              <video
                src="/PadelVideo.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
