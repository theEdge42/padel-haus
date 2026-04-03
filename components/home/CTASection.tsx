"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

export default function CTASection() {
  const t = useTranslations("home.cta");
  const locale = useLocale();

  return (
    <section className="py-24 bg-[#341743] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[#B5F03D]/5 blur-3xl rounded-full" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-black text-white mb-6"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#E2D9F3] text-xl mb-10 max-w-xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Mobile → Play Store; Desktop → Playtomic web */}
          <Button
            asChild
            size="lg"
            className="sm:hidden bg-[#B5F03D] text-[#341743] hover:bg-[#a1d936] font-bold text-base px-10 h-14"
          >
            <a href="https://play.google.com/store/apps/details?id=com.playtomic&hl=en" target="_blank" rel="noopener noreferrer">
              {t("ctaBook")}
              <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="hidden sm:flex bg-[#B5F03D] text-[#341743] hover:bg-[#a1d936] font-bold text-base px-10 h-14"
          >
            <a href="https://playtomic.com/clubs/padel-haus-bucharest" target="_blank" rel="noopener noreferrer">
              {t("ctaBook")}
              <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold text-base px-10 h-14"
          >
            <Link href={`/${locale}/experience`}>
              <MapPin className="mr-2" size={18} />
              {t("ctaVisit")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
