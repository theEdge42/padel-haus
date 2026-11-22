"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Dots, Eyebrow, pill } from "@/components/shared/Brand";
import { PhotoLightbox } from "@/components/shared/PhotoLightbox";
import { Reveal } from "@/components/shared/Reveal";
import { WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MEMBERS = 500;
const PHOTO = { src: "/community/kidsPadel.jpg", width: 1080, height: 720 };
const NAVBAR_BOTTOM = 80;

function MemberCount() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!inView || !element) return;
    const controls = animate(0, MEMBERS, {
      duration: reduced ? 0 : 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        element.textContent = `${Math.round(value)}${value >= MEMBERS ? "+" : ""}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced]);

  return (
    <>
      <span className="sr-only">{MEMBERS}+</span>
      <span ref={ref} aria-hidden="true">{MEMBERS}+</span>
    </>
  );
}

export default function CommunitySection() {
  const t = useTranslations("home.community");
  const sectionRef = useRef<HTMLElement>(null);
  const joinRef = useRef<HTMLAnchorElement>(null);
  const [docked, setDocked] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  // Phones: while this section holds the screen there is always a WhatsApp button in view
  useEffect(() => {
    const update = () => {
      if (!sectionRef.current || !joinRef.current) return;
      const section = sectionRef.current.getBoundingClientRect();
      const button = joinRef.current.getBoundingClientRect();
      const height = window.innerHeight;
      const onScreen = section.top < height * 0.65 && section.bottom > height * 0.4;
      const buttonHidden = button.top < NAVBAR_BOTTOM || button.bottom > height - 8;
      setDocked(window.innerWidth < 640 && onScreen && buttonHidden);
    };
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const stats = [
    { label: t("members"), value: <MemberCount />, word: false },
    { label: t("weeklyLabel"), value: t("weeklyValue"), word: true },
    { label: t("levelsLabel"), value: t("levelsValue"), word: true },
  ];

  return (
    <section id="community" ref={sectionRef} className="scroll-mt-16 bg-mov pt-7 pb-20 sm:pt-12 sm:pb-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <Dots double className="mb-[18px] sm:mb-9" />

        <div className="grid gap-3.5 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-12">
          <div>
            <Eyebrow className="mb-2.5 sm:mb-[18px]">{t("eyebrow")}</Eyebrow>
            <h2 className="text-4xl leading-[.95] font-extrabold tracking-[-.035em] text-crem sm:text-[clamp(40px,6.5vw,72px)]">
              {t("title")}
              <em className="block font-editorial tracking-[-.01em] text-amber">{t("accent")}</em>
            </h2>
          </div>
          <div>
            <p className="max-w-xl leading-normal text-lilac sm:mt-5 sm:text-lg sm:leading-relaxed">{t("desc")}</p>
            <a
              ref={joinRef}
              data-join
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={pill("amber", "mt-[18px] w-full sm:mt-7 sm:w-auto")}
            >
              {t("joinButton")}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <Reveal className="mt-10 grid gap-3 sm:mt-14 lg:grid-cols-[1.7fr_1fr]">
          <button
            type="button"
            data-community-photo
            onClick={() => setPhotoOpen(true)}
            aria-haspopup="dialog"
            className="relative block aspect-[3/2] w-full cursor-zoom-in self-start overflow-hidden rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
          >
            <Image src="/brand/community-kids.webp" alt={t("photoAlt")} fill unoptimized className="object-cover" />
          </button>
          <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map(({ label, value, word }) => (
              <div
                key={label}
                data-stat
                className="flex flex-row-reverse items-baseline justify-between gap-3 rounded-[20px] bg-crem px-5 py-[26px] text-mov sm:flex-col-reverse sm:items-start sm:justify-center"
              >
                <dt className="text-xs font-extrabold tracking-[.16em] text-mov/70 uppercase">{label}</dt>
                <dd
                  className={cn(
                    "leading-none font-extrabold tracking-[-.04em] tabular-nums sm:flex sm:h-14 sm:items-end",
                    word ? "text-[clamp(24px,3.4vw,44px)]" : "text-[clamp(34px,5vw,56px)]",
                  )}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {photoOpen && (
        <PhotoLightbox photos={[{ ...PHOTO, alt: t("photoAlt") }]} index={0} onClose={() => setPhotoOpen(false)} />
      )}

      <a
        data-dock
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        inert={!docked}
        className={pill(
          "amber",
          cn(
            "fixed inset-x-4 bottom-[calc(14px+env(safe-area-inset-bottom,0px))] z-40 h-[52px] transition-opacity sm:hidden",
            docked ? "opacity-100" : "pointer-events-none opacity-0",
          ),
        )}
      >
        {t("joinButton")}
      </a>
    </section>
  );
}
