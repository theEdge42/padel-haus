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
    image: "/1.png",
  },
  {
    id: 2,
    name: "Court Beta",
    image: "/2.png",
  },
  {
    id: 3,
    name: "Court Gamma",
    image: "/3.png",
  },
  {
    id: 4,
    name: "Court Delta",
    image: "/4.png",
  },
];

export default function CourtsCarousel() {
  const t = useTranslations("home.courts");

  return (
    <section className="py-24 bg-[#4A2060]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#341743] via-transparent to-transparent" />
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
