"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const row1 = [
  { src: "/gallery/1.jpeg", alt: "Padel court" },
  { src: "/gallery/2.jpeg", alt: "Players on court" },
  { src: "/gallery/Competition1.jpeg", alt: "Mexicano photo 1" },
  { src: "/gallery/3.jpeg", alt: "Match in progress" },
  { src: "/gallery/4.jpeg", alt: "Community moment" },
  { src: "/gallery/Competition2.jpeg", alt: "Competition" },
];

const row2 = [
  { src: "/gallery/IMG_5270.jpeg", alt: "Tournament action" },
  { src: "/gallery/Competition3.jpeg", alt: "Competition photo 2" },
  { src: "/gallery/Competition5.jpeg", alt: "Court atmosphere" },
  { src: "/gallery/IMG_9076.jpeg", alt: "After the game" },
  { src: "/gallery/Competition4.jpeg", alt: "Competition" },
  { src: "/gallery/IMG_9080.jpeg", alt: "Social night" },
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
            className="relative w-80 h-56 rounded-2xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="256px"
            />
            <div className="absolute inset-0 bg-[#25003D]/20 hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SocialGallery() {
  const t = useTranslations("home.courts");

  return (
    <section className="py-24 bg-background overflow-hidden">
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
