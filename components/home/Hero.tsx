"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@/components/shared/Logo";
import { pill } from "@/components/shared/Brand";
import CourtDrawing from "@/components/home/CourtDrawing";
import { COURT_BOUNDS, COURT_VIEW } from "@/lib/court";
import { PLAYTOMIC_RESERVATIONS, WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const WALK_START = 0.12; // share of the pinned scroll before the door starts to grow
const COPY_GONE = 0.28;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const walk = (p: number) => clamp((p - WALK_START) / (1 - WALK_START)) ** 3;

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// framer's useReducedMotion differs between server and first client render, which breaks hydration here
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const reduced = usePrefersReducedMotion();

  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLAnchorElement>(null);
  const fit = useMotionValue({ doorScale: 1, courtScale: 1, drop: 0, lift: 0 });

  useEffect(() => {
    const hero = heroRef.current;
    const inner = innerRef.current;
    const door = doorRef.current;
    if (!hero || !inner || !door) return;

    // Offsets, not getBoundingClientRect: they ignore the scroll transforms, so resizing mid-walk is safe
    const measure = () => {
      const vw = hero.clientWidth;
      const vh = hero.clientHeight;
      const w = door.offsetWidth;
      const h = door.offsetHeight;
      const unit = Math.max(door.clientWidth / COURT_VIEW.width, door.clientHeight / COURT_VIEW.height);
      const courtWidth = COURT_BOUNDS.width * unit;
      const courtHeight = (COURT_BOUNDS.bottom - COURT_BOUNDS.top) * unit;
      const doorScale = Math.max((vw * 1.25) / w, (vh * 1.05) / (h - w / 2));
      // Phones: the court always ends at 105% of the screen width. Larger screens: it fits with a margin.
      const courtScale =
        vw < 640
          ? (vw * 1.05) / courtWidth
          : Math.min(doorScale, (vw * 0.94) / courtWidth, (vh - 140) / courtHeight);

      fit.set({
        doorScale,
        courtScale,
        // The door's base ends on the bottom of the screen, straight into the Community section
        drop: vh - (inner.offsetTop + door.offsetTop + h),
        lift: 12 - (COURT_VIEW.height - COURT_BOUNDS.bottom) * unit * courtScale,
      });
    };

    const observer = new ResizeObserver(measure);
    for (const element of [hero, inner, door]) observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, [fit]);

  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  const progress = useTransform(() => (reduced ? 0 : scrollYProgress.get()));
  const faded = useTransform(() => clamp(progress.get() / COPY_GONE));
  const copyOpacity = useTransform(() => 1 - faded.get());
  const copyY = useTransform(() => -80 * faded.get());
  const copyVisibility = useTransform(() => (faded.get() >= 1 ? "hidden" : "visible"));
  const doorY = useTransform(() => fit.get().drop * walk(progress.get()));
  const doorScale = useTransform(() => 1 + (fit.get().doorScale - 1) * walk(progress.get()));
  // Once the door grows it covers the screen: it must stop being a link, or any tap opens WhatsApp
  const doorPointer = useTransform(() => (progress.get() > WALK_START ? "none" : "auto"));
  const courtY = useTransform(() => (-fit.get().lift * walk(progress.get())) / doorScale.get());
  const courtScale = useTransform(
    () => (1 + (fit.get().courtScale - 1) * walk(progress.get())) / doorScale.get(),
  );
  const glow = useTransform(() => clamp((progress.get() - 0.3) / 0.35));

  const intro = (delay: number, y: number) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
  });

  return (
    <div ref={pinRef} data-hero-pin className="relative -mt-24 h-[280svh] bg-mov motion-reduce:h-auto">
      <section
        ref={heroRef}
        data-ready={ready}
        className="sticky top-0 isolate h-svh overflow-hidden bg-linear-to-b from-noapte to-mov pt-24 motion-reduce:relative"
      >
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          {/* Pre-sized file, served as is: in Next 16.2.1 the optimiser hangs for good when a first request is aborted */}
          <Image
            src="/brand/team-wide.webp"
            alt=""
            fill
            unoptimized
            preload
            className="scale-[1.03] object-cover object-[43%_55%] blur-[1.5px] saturate-90 sm:object-[50%_55%]"
          />
          <div className="absolute inset-0 bg-mov/30" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,12,37,.95)_0%,rgba(28,12,37,.78)_26%,rgba(28,12,37,.32)_52%,rgba(52,23,67,.5)_100%)]" />
        </div>

        <div ref={innerRef} className="relative mx-auto w-full max-w-5xl px-4 pt-10 text-center sm:px-6 sm:pt-[clamp(40px,16svh,140px)]">
          <motion.div style={{ opacity: copyOpacity, y: copyY, visibility: copyVisibility }}>
            <motion.h1
              {...intro(0, 24)}
              className="mb-7 font-editorial text-[min(46px,11.7vw)] leading-none tracking-[-.01em] text-balance text-amber sm:mb-10 sm:text-[84px]"
            >
              {t("catchphrase")}
            </motion.h1>

            <motion.div {...intro(0.25, 20)} className="flex flex-col items-center justify-center gap-[18px] sm:flex-row sm:gap-3.5">
              <a
                href={PLAYTOMIC_RESERVATIONS}
                target="_blank"
                rel="noopener noreferrer"
                className={pill("amber", "px-[34px] sm:h-[60px] sm:px-11 sm:text-[17px]")}
              >
                {t("ctaBook")}
              </a>
              {/* Phones: text links. From sm: outline pills. */}
              <div className="flex gap-7 sm:gap-3.5">
                {[
                  { href: `/${locale}/memberships`, label: t("ctaMemberships"), border: "sm:border-2 sm:border-crem sm:bg-crem/[.08]" },
                  { href: `/${locale}/coaching`, label: t("ctaTraining"), border: "sm:border-[1.5px] sm:border-crem/60 sm:bg-crem/[.04]" },
                ].map(({ href, label, border }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "inline-flex items-center border-b-[1.5px] border-crem/55 py-1.5 font-bold text-crem transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber sm:h-[52px] sm:rounded-full sm:px-[26px] sm:font-extrabold sm:hover:bg-crem/[.16]",
                      border,
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* The name hangs over the entrance instead of repeating the navbar logo */}
          <motion.div style={{ opacity: copyOpacity }} className="mt-[7svh] sm:mt-10">
            <motion.div {...intro(0.45, 12)} className="flex flex-col items-center gap-2.5">
              <Logo size="sm" className="gap-[7px] [&>span:first-child]:text-2xl [&>span:last-child]:text-[21px] sm:[&>span:first-child]:text-3xl sm:[&>span:last-child]:text-[26px]" />
              <span className="h-0.5 w-11 bg-led shadow-[0_0_10px_rgba(139,79,232,.8)]" />
            </motion.div>
          </motion.div>

          <motion.a
            ref={doorRef}
            data-door
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("communityDoor")}
            style={{ y: doorY, scale: doorScale, pointerEvents: doorPointer, originX: 0.5, originY: 1 }}
            className="relative mx-auto mt-3.5 block h-[304px] w-[228px] overflow-hidden rounded-t-full border-2 border-b-0 border-led bg-linear-to-t from-mov to-deep shadow-[0_0_0_1px_rgba(139,79,232,.25),0_-6px_28px_rgba(139,79,232,.45),inset_0_6px_24px_rgba(139,79,232,.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber sm:h-[448px] sm:w-80 [@media(max-width:639px)_and_(max-height:700px)]:h-[240px] [@media(max-width:639px)_and_(max-height:700px)]:w-[180px]"
          >
            <motion.div data-court className="absolute inset-0" style={{ y: courtY, scale: courtScale, originX: 0.5, originY: 1 }}>
              <CourtDrawing progress={progress} />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,233,201,.28),transparent_65%)]"
              style={{ opacity: glow }}
            />
          </motion.a>
        </div>
      </section>
    </div>
  );
}
