"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const row1 = [
  { src: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80", alt: "Court action" },
  { src: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80", alt: "Players celebrating" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", alt: "Team training" },
  { src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80", alt: "Social night" },
  { src: "https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?w=600&q=80", alt: "Tournament" },
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", alt: "Workout" },
];

const row2 = [
  { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80", alt: "Training" },
  { src: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80", alt: "High five" },
  { src: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=600&q=80", alt: "Match play" },
  { src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80", alt: "After game" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Court view" },
  { src: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80", alt: "Community" },
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
            <div className="absolute inset-0 bg-[#1A0530]/20 hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SocialGallery() {
  const t = useTranslations("home.courts");

  return (
    <section className="py-24 bg-[#2D0A4E] overflow-hidden">
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
