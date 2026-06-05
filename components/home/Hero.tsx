"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/IMG_2807_trimmed.MOV" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(26,5,48,0.75)" }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

        {/* Logo as main hero title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-5"
        >
          <Image
            src="/logo.svg"
            alt="Padel Haus"
            width={640}
            height={256}
            priority
            className="w-full max-w-xs sm:max-w-md lg:max-w-2xl h-auto"
          />
        </motion.div>

        {/* Catchphrase — prominent */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[#E2D9F3] text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide mb-10"
        >
          {t("catchphrase")}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-xl mx-auto text-[#E2D9F3]/70 text-base sm:text-lg mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="sm:hidden bg-[#B5F03D] text-[#341743] hover:bg-[#a1d936] font-bold text-base px-8 h-14"
          >
            <a href="https://play.google.com/store/apps/details?id=com.playtomic&hl=en" target="_blank" rel="noopener noreferrer">
              {t("ctaBook")}
              <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="hidden sm:flex bg-[#B5F03D] text-[#341743] hover:bg-[#a1d936] font-bold text-base px-8 h-14"
          >
            <a href="https://playtomic.io/tenant/6b8b2cf1-4654-4d6e-88f4-70c95f84ee8b" target="_blank" rel="noopener noreferrer">
              {t("ctaBook")}
              <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold text-base px-8 h-14"
          >
            <a href="#gallery">
              <Play className="mr-2" size={18} />
              {t("ctaLearn")}
            </a>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-20 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { number: "4", label: t("statCourts") },
            { number: "500+", label: t("statMembers") },
            { number: t("statEventsValue"), label: t("statEvents") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-black text-[#B5F03D]">{stat.number}</div>
              <div className="text-[#E2D9F3] text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A0530] to-transparent" />
    </section>
  );
}
