"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A0530]">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B5F03D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-[#B5F03D]/20 text-[#B5F03D] border-[#B5F03D]/30 mb-6 text-sm px-4 py-1.5">
            {t("badge")}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-none tracking-tight mb-6"
        >
          {t("title").split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-[#B5F03D]">
            {t("title").split(" ").slice(-1)[0]}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-[#E2D9F3] text-lg sm:text-xl mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold text-base px-8 h-14"
          >
            <Link href={`/${locale}/contact`}>
              {t("ctaBook")}
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold text-base px-8 h-14"
          >
            <Link href={`/${locale}/experience`}>
              <Play className="mr-2" size={18} />
              {t("ctaLearn")}
            </Link>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { number: "4", label: "Indoor Courts" },
            { number: "500+", label: "Members" },
            { number: "7d/7", label: "Open" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-black text-[#B5F03D]">{stat.number}</div>
              <div className="text-[#E2D9F3] text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A0530] to-transparent" />
    </section>
  );
}
