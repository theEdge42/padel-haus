"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import Hero from "@/components/home/Hero";
import CommunitySection from "@/components/home/CommunitySection";
import SocialGallery from "@/components/home/SocialGallery";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { HOME_INTRO_COOKIE } from "@/lib/constants";

const subscribeNothing = () => () => {};
const readIntroSeen = () => document.cookie.split("; ").includes(`${HOME_INTRO_COOKIE}=true`);

export default function HomePageClient() {
  // The prebuilt HTML always contains the intro (the server can't read the cookie); the browser then decides.
  // A returning visitor never sees it: the inline script in the page hides it until this takes over.
  const introSeen = useSyncExternalStore(subscribeNothing, readIntroSeen, () => false);
  const [introDone, setIntroDone] = useState(false);
  const isLoading = !introSeen && !introDone;

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    if (!isLoading) {
      const sectionId = window.location.hash.slice(1);

      if (sectionId) {
        requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "auto", block: "start" });
        });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    document.cookie = `${HOME_INTRO_COOKIE}=true; path=/; SameSite=Lax`;
    setIntroDone(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      {/* Opacity only: a transform here would break the hero's sticky walk-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Hero ready={!isLoading} />
        <CommunitySection />
        <div id="gallery">
          <SocialGallery />
        </div>
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading-screen" onComplete={handleLoadingComplete} />
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  );
}
