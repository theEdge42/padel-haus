"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { ArrowRight } from "lucide-react";
import { PLAYTOMIC_APP, WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawDoorOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const doorOpacity = useSpring(rawDoorOpacity, { stiffness: 90, damping: 30, mass: 0.5 });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background"
    >
      {/* Gradient block — wraps the logo/catchphrase/CTAs and the door; the door's bottom sits flush with this block's bottom edge */}
      <div
        className="relative w-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 120%, rgba(255,215,0,0.15) 0%, #25003D 80%)",
        }}
      >
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 text-center">

        {/* Logo as main hero title — real text set in the brand fonts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-5"
        >
          <Logo size="lg" />
        </motion.div>

        {/* Catchphrase — prominent */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="italic text-[#F3E8FF] text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide mb-10"
          style={{ fontFamily: "var(--font-serif-italic)" }}
        >
          {t("catchphrase")}
        </motion.p>

        {/* CTAs — Abonamente (secondary) · Rezerva (primary) · Antrenează-te (tertiary) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-0"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-2 border-[#FFD700] bg-transparent text-[#FFE773] hover:bg-white/10 hover:text-[#FFE773] font-extrabold tracking-wide text-base px-8 h-14"
          >
            <Link href={`/${locale}/memberships`}>{t("ctaMemberships")}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFE773] text-[#25003D] hover:brightness-105 font-extrabold tracking-wide text-base px-10 h-14"
          >
            <a href={PLAYTOMIC_APP} target="_blank" rel="noopener noreferrer">
              {t("ctaBook")}
              <ArrowRight className="ml-0.5" size={14} />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="rounded-full border border-white/25 bg-transparent text-[#F3E8FF]/80 hover:bg-white/10 hover:text-[#F3E8FF] font-bold tracking-wide text-base px-10 h-14"
          >
            <Link href={`/${locale}/coaching`}>{t("ctaTraining")}</Link>
          </Button>
        </motion.div>

        {/* Community door — its bottom sits flush with the gradient block's bottom edge, taller, open at the base, label only on hover */}
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ opacity: doorOpacity }}
          className="group relative mx-auto mt-10 flex h-64 w-48 items-center justify-center rounded-t-full border-x-2 border-t-2 border-[#FFD700]/80 bg-gradient-to-t from-black/50 to-transparent shadow-[inset_0_4px_16px_rgba(255,215,0,0.3),0_-4px_16px_rgba(255,215,0,0.25)] transition-shadow hover:shadow-[inset_0_4px_24px_rgba(255,215,0,0.5),0_-4px_24px_rgba(255,215,0,0.4)] sm:h-[28rem] sm:w-80"
          aria-label={t("communityDoor")}
        >
          <span
            className="italic text-lg text-[#FFD700] tracking-wide opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-2xl"
            style={{ fontFamily: "'Times New Roman MT', 'Times New Roman', Times, serif" }}
          >
            {t("communityDoor")}
          </span>
        </motion.a>
      </div>
      </div>
    </section>
  );
}
