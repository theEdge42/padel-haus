"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import CommunitySection from "@/components/home/CommunitySection";
import SocialGallery from "@/components/home/SocialGallery";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import LoadingScreen from "@/components/shared/LoadingScreen";

const HOME_LOADER_COOKIE_NAME = "padel-haus-home-loader-seen";

type HomePageClientProps = {
  initialShowLoader: boolean;
};

export default function HomePageClient({ initialShowLoader }: HomePageClientProps) {
  const [isLoading, setIsLoading] = useState(initialShowLoader);

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
    document.cookie = `${HOME_LOADER_COOKIE_NAME}=true; path=/; SameSite=Lax`;
    setIsLoading(false);
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
