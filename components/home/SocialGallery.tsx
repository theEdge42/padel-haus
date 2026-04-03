"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const row1 = [
  { src: "/1.png", alt: "Padel court" },
  { src: "/2.png", alt: "Players on court" },
  { src: "/3.png", alt: "Match in progress" },
  { src: "/4.png", alt: "Community moment" },
  { src: "/6.png", alt: "Tournament action" },
  { src: "/1.png", alt: "Court atmosphere" },
];

const row2 = [
  { src: "/6.png", alt: "After the game" },
  { src: "/3.png", alt: "Social night" },
  { src: "/2.png", alt: "Court view" },
  { src: "/4.png", alt: "Team play" },
  { src: "/1.png", alt: "Padel Haus" },
  { src: "/6.png", alt: "Community" },
];

function ScrollRow({
  items,
  reverse = false,
}: {
  items: typeof row1;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="relative w-64 h-44 rounded-2xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="256px"
            />
            <div className="absolute inset-0 bg-[#341743]/20 hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SocialGallery() {
  const t = useTranslations("home.courts");

  return (
    <section className="py-24 bg-[#4A2060] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Life at Padel Haus
          </h2>
          <p className="text-[#E2D9F3] text-lg">
            Real moments. Real community.
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        <ScrollRow items={row1} />
        <ScrollRow items={row2} reverse />
      </div>
    </section>
  );
}
