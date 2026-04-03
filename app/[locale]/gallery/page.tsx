"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const galleryImages = [
  { src: "/1.png", span: "col-span-2 row-span-2" },
  { src: "/2.png", span: "" },
  { src: "/3.png", span: "" },
  { src: "/4.png", span: "" },
  { src: "/6.png", span: "col-span-2" },
  { src: "/2.png", span: "" },
  { src: "/3.png", span: "" },
  { src: "/4.png", span: "row-span-2" },
  { src: "/1.png", span: "" },
  { src: "/6.png", span: "" },
  { src: "/2.png", span: "col-span-2" },
];

export default function GalleryPage() {
  const t = useTranslations("gallery");

  return (
    <div className="min-h-screen bg-[#1A0530]">
      {/* Hero */}
      <section className="py-24 bg-[#2D0A4E] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B5F03D]/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#B5F03D]/20 text-[#B5F03D] border-[#B5F03D]/30 mb-6 text-sm px-4 py-1.5">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">{t("hero.title")}</h1>
            <p className="text-[#E2D9F3] text-xl leading-relaxed">{t("hero.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid — Masonry-style using CSS grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-white mb-10"
          >
            {t("photos.title")}
          </motion.h2>

          {/* CSS columns masonry */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="break-inside-avoid overflow-hidden rounded-xl"
              >
                <Image
                  src={img.src}
                  alt={`Gallery image ${i + 1}`}
                  width={800}
                  height={i % 3 === 0 ? 600 : 400}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-[#2D0A4E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-4">{t("video.title")}</h2>
            <p className="text-[#E2D9F3] mb-8">{t("video.desc")}</p>
            <div className="rounded-2xl overflow-hidden aspect-video bg-[#1A0530] border border-white/10">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Padel Haus Video"
                width="100%"
                height="100%"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
