"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

function PadelBall({ size, style, delay = 0 }: { size: number; style: React.CSSProperties; delay?: number }) {
  const d = size;
  const r = d / 2;
  const id = `ball-${size}-${delay}`;
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={style}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`}>
        <defs>
          <radialGradient id={`${id}-grad`} cx="36%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#e8ff70" />
            <stop offset="45%" stopColor="#cae832" />
            <stop offset="100%" stopColor="#8cb518" />
          </radialGradient>
          <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </radialGradient>
          <clipPath id={`${id}-clip`}>
            <circle cx={r} cy={r} r={r} />
          </clipPath>
        </defs>
        {/* Ball base */}
        <circle cx={r} cy={r} r={r} fill={`url(#${id}-grad)`} />
        {/* Edge shadow for 3D */}
        <circle cx={r} cy={r} r={r} fill={`url(#${id}-shadow)`} />
        {/* Seam — upper arc curving down */}
        <path
          d={`M ${d * 0.08} ${d * 0.42} C ${d * 0.28} ${d * 0.75}, ${d * 0.72} ${d * 0.75}, ${d * 0.92} ${d * 0.42}`}
          fill="none"
          stroke="white"
          strokeWidth={d * 0.055}
          strokeLinecap="round"
          opacity="0.75"
          clipPath={`url(#${id}-clip)`}
        />
        {/* Seam — lower arc curving up */}
        {/* <path
          d={`M ${d * 0.08} ${d * 0.58} C ${d * 0.28} ${d * 0.25}, ${d * 0.72} ${d * 0.25}, ${d * 0.92} ${d * 0.58}`}
          fill="none"
          stroke="white"
          strokeWidth={d * 0.055}
          strokeLinecap="round"
          opacity="0.75"
          clipPath={`url(#${id}-clip)`}
        /> */}
        {/* Specular highlight */}
        <ellipse cx={r * 0.72} cy={r * 0.58} rx={r * 0.28} ry={r * 0.17} fill="rgba(255,255,255,0.32)" />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#341743]">
      {/* Modern mesh gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 200deg at 60% 40%, #4A2060 0%, #341743 30%, #1e0f2e 55%, #341743 75%, #4A2060 100%)",
          opacity: 0.8,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 15% 85%, rgba(181,240,61,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 85% 10%, rgba(140,60,210,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Decorative padel balls */}
      <PadelBall size={160} delay={0}   style={{ top: "-50px",  right: "-40px", opacity: 0.22 }} />
      <PadelBall size={110} delay={1.2} style={{ bottom: "60px", left: "-25px",  opacity: 0.18 }} />
      <PadelBall size={70}  delay={0.7} style={{ top: "28%",    right: "5%",    opacity: 0.28 }} />
      <PadelBall size={50}  delay={2.1} style={{ bottom: "26%", left: "7%",     opacity: 0.2  }} />

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
            <a href="https://playtomic.com/clubs/padel-haus-bucharest" target="_blank" rel="noopener noreferrer">
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
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-20 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { number: "4", label: t("statCourts") },
            { number: "500+", label: t("statMembers") },
            { number: locale === "ro" ? "7z/7" : "7d/7", label: t("statOpen") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-black text-[#B5F03D]">{stat.number}</div>
              <div className="text-[#E2D9F3] text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#341743] to-transparent" />
    </section>
  );
}
