"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Hero from "@/components/home/Hero";
import CommunitySection from "@/components/home/CommunitySection";
import SocialGallery from "@/components/home/SocialGallery";

export default function HomePage() {
  const tExp = useTranslations("experience");

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Community */}
      <CommunitySection />

      {/* 3. Concept + Design */}
      <section className="py-16 bg-[#2D0A4E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-white mb-10 text-center"
          >
            {tExp("hero.title")}
          </motion.h2>
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
                <h3 className="text-2xl font-bold text-white mb-4">
                  {tExp(`${section}.title`)}
                </h3>
                <p className="text-[#E2D9F3] leading-relaxed">
                  {tExp(`${section}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Photo Gallery + Video */}
      <div id="gallery">
        <SocialGallery />
      </div>

      <section className="py-24 bg-[#1A0530]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              {tExp("gallery.videoTitle")}
            </h2>
            <p className="text-[#E2D9F3] mb-8">{tExp("gallery.videoDesc")}</p>
            <div className="rounded-2xl overflow-hidden aspect-video bg-[#2D0A4E] border border-white/10 max-w-4xl mx-auto">
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
    </>
  );
}
