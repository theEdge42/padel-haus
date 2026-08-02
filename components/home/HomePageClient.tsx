"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Hero from "@/components/home/Hero";
import CommunitySection from "@/components/home/CommunitySection";
import SocialGallery from "@/components/home/SocialGallery";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import LoadingScreen from "@/components/shared/LoadingScreen";

const HOME_LOADER_COOKIE_NAME = "padel-haus-home-loader-seen";

type HomePageClientProps = {
  initialShowLoader: boolean;
};

export default function HomePageClient({ initialShowLoader }: HomePageClientProps) {
  const tExp = useTranslations("experience");
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 18 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Hero />

        <CommunitySection />



        <div id="gallery">
          <SocialGallery />
        </div>

        <PricingSection />

        <section className="py-24 bg-background-alternate">
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
              <div className="rounded-2xl overflow-hidden aspect-video bg-[#3B0758] border border-white/10 max-w-4xl mx-auto">
                <video
                  src="/VIDEO-VIBE%20%26%20PADEL%20MUTE.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <FAQSection />
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading-screen" onComplete={handleLoadingComplete} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
