"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useEffectEvent, useState } from "react";

const PHILOSOPHY_WORDS = ["PLAY", "CONNECT", "ELEVATE"] as const;
const WORD_INTERVAL_MS = 780;
const LOADER_DURATION_MS = WORD_INTERVAL_MS * PHILOSOPHY_WORDS.length;

type LoadingScreenProps = {
  onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const handleComplete = useEffectEvent(onComplete);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      handleComplete();
    }, LOADER_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % PHILOSOPHY_WORDS.length);
    }, WORD_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0A0116]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="relative flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <div className="relative flex h-28 items-end">
          <motion.div
            className="absolute bottom-0 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-white/15 blur-[2px]"
            animate={{ scaleX: [1.05, 0.62, 1.05], opacity: [0.28, 0.12, 0.28] }}
            transition={{ duration: 0.72, repeat: Infinity, ease: [0.33, 1, 0.68, 1] }}
          />
          <motion.div
            className="relative h-12 w-12 rounded-full bg-[#B5F03D] shadow-[0_18px_40px_rgba(181,240,61,0.28)]"
            animate={{
              y: [0, -58, 0],
              scaleX: [1.14, 0.96, 1.14],
              scaleY: [0.84, 1.06, 0.84],
            }}
            transition={{
              duration: 0.72,
              repeat: Infinity,
              times: [0, 0.42, 1],
              ease: [0.33, 1, 0.68, 1],
            }}
          />
        </div>

        <div className="mt-10 h-8 overflow-hidden text-sm font-medium tracking-[0.55em] text-[#E2D9F3]/70 sm:text-base">
          <AnimatePresence mode="wait">
            <motion.div
              key={PHILOSOPHY_WORDS[wordIndex]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {PHILOSOPHY_WORDS[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
