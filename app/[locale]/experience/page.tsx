"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

const courtNameKeys = ["court1", "court2", "court3", "court4"] as const;

const courtDetails = [
  {
    nameKey: "court1",
    badge: { label: "Tournament", color: "bg-[#B5F03D] text-[#1A0530]" },
    specs: [
      { value: "10×20m", label: "Dimensions" },
      { value: "LED Pro", label: "Lighting" },
      { value: "AstroTurf", label: "Surface" },
      { value: "4 players", label: "Capacity" },
    ],
    features: [
      "Full panoramic glass walls",
      "Certified tournament surface",
      "Scoreboards & shot clock",
      "Spectator viewing area",
    ],
  },
  {
    nameKey: "court2",
    badge: { label: "Training", color: "bg-purple-400 text-white" },
    specs: [
      { value: "10×20m", label: "Dimensions" },
      { value: "LED Pro", label: "Lighting" },
      { value: "AstroTurf", label: "Surface" },
      { value: "4 players", label: "Capacity" },
    ],
    features: [
      "Full panoramic glass walls",
      "Ball machine power outlets",
      "Video analysis camera points",
      "Coaching platform access",
    ],
  },
  {
    nameKey: "court3",
    badge: { label: "Social", color: "bg-blue-400 text-white" },
    specs: [
      { value: "10×20m", label: "Dimensions" },
      { value: "LED Pro", label: "Lighting" },
      { value: "AstroTurf", label: "Surface" },
      { value: "4 players", label: "Capacity" },
    ],
    features: [
      "Full panoramic glass walls",
      "Lounge-adjacent location",
      "Premium sound system",
      "Great for casual play & events",
    ],
  },
  {
    nameKey: "court4",
    badge: { label: "VIP", color: "bg-orange-400 text-white" },
    specs: [
      { value: "10×20m", label: "Dimensions" },
      { value: "LED Pro", label: "Lighting" },
      { value: "AstroTurf", label: "Surface" },
      { value: "4 players", label: "Capacity" },
    ],
    features: [
      "Full panoramic glass walls",
      "Private changing room access",
      "Dedicated towel & water service",
      "Available for exclusive hire",
    ],
  },
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

      {/* Courts Showcase */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courtDetails.map((court, i) => (
              <motion.div
                key={court.nameKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#2D0A4E] rounded-2xl p-8 border border-white/10 hover:border-[#B5F03D]/40 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[#B5F03D] text-xs font-black uppercase tracking-widest">
                      Court {i + 1}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {t(`courts.${court.nameKey}`)}
                    </h3>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${court.badge.color}`}>
                    {court.badge.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {court.specs.map((spec) => (
                    <div key={spec.label} className="bg-[#1A0530] rounded-xl p-3">
                      <div className="text-[#B5F03D] text-lg font-black">{spec.value}</div>
                      <div className="text-[#E2D9F3] text-xs mt-0.5">{spec.label}</div>
                    </div>
                  ))}
                </div>

                <ul className="space-y-2">
                  {court.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[#E2D9F3] text-sm">
                      <span className="w-1.5 h-1.5 bg-[#B5F03D] rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
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
    </div>
  );
}
