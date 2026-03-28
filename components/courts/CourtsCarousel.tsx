"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const courts = [
  {
    id: 1,
    name: "Court Alpha",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  },
  {
    id: 2,
    name: "Court Beta",
    image: "https://images.unsplash.com/photo-1545109621-7f3cdc6dab5c?w=800&q=80https://c8.alamy.com/comp/3CHGHTW/diverse-female-friends-resting-playing-on-purple-padel-court-in-sports-gear-with-rackets-balls-3CHGHTW.jpghttps://c8.alamy.com/comp/3CHGHTW/diverse-female-friends-resting-playing-on-purple-padel-court-in-sports-gear-with-rackets-balls-3CHGHTW.jpg",
  },
  {
    id: 3,
    name: "Court Gamma",
    image: "https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?w=800&q=80",
  },
  {
    id: 4,
    name: "Court Delta",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
  },
];

export default function CourtsCarousel() {
  const t = useTranslations("home.courts");

  return (
    <section className="py-24 bg-[#2D0A4E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-[#E2D9F3] text-lg">{t("subtitle")}</p>
        </motion.div>

        <Carousel
          opts={{ align: "start", loop: true, dragFree: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {courts.map((court) => (
              <CarouselItem
                key={court.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image
                    src={court.image}
                    alt={court.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0530] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white font-bold text-lg">{court.name}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-white/30 text-white hover:bg-white/10 hover:text-white -left-4 sm:-left-6" />
          <CarouselNext className="border-white/30 text-white hover:bg-white/10 hover:text-white -right-4 sm:-right-6" />
        </Carousel>
      </div>
    </section>
  );
}
