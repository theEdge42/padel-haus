"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Eyebrow, pill } from "@/components/shared/Brand";
import { PhotoLightbox } from "@/components/shared/PhotoLightbox";
import { INSTAGRAM_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Two rows of three. The print is a 3:4 crop (public/brand/prints/<key>.webp), the viewer shows the whole photo.
const PHOTOS = [
  { key: "between", src: "/community/community2.jpg", width: 1080, height: 718, rotate: -4, y: 0 },
  { key: "lunge", src: "/community/girlPadelTourmanet2.jpg", width: 1080, height: 1440, rotate: 3, y: 14 },
  { key: "net", src: "/community/teamTournament.jpg", width: 1080, height: 718, rotate: -2, y: 4 },
  { key: "team", src: "/community/girlTeam.jpg", width: 1080, height: 718, rotate: 3, y: 0 },
  { key: "focus", src: "/community/girlPadelTournamet1.jpg", width: 1080, height: 1440, rotate: -4, y: 10 },
  { key: "evening", src: "/brand/mexicano-evening.webp", width: 1200, height: 1600, rotate: 2, y: 2 },
] as const;
const PER_ROW = 3;
const ROWS = [0, PER_ROW];

export default function SocialGallery() {
  const t = useTranslations("home.gallery");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="overflow-hidden bg-noapte py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-14 text-center">
          <Eyebrow className="justify-center">{t("eyebrow")}</Eyebrow>
          <h2 className="font-editorial text-[clamp(34px,5vw,52px)] leading-[1.05] text-crem">{t("title")}</h2>
          <p className="mt-5 text-lg text-lilac">{t("desc")}</p>
        </div>

        <div className="flex flex-col gap-7 sm:gap-10">
          {ROWS.map((start, rowIndex) => (
            <div
              key={start}
              className={cn("flex justify-center gap-[clamp(8px,2.4vw,36px)]", rowIndex === 1 && "sm:pl-[clamp(0px,4vw,60px)]")}
            >
              {PHOTOS.slice(start, start + PER_ROW).map(({ key, rotate, y }, i) => (
                // The observer sits on the untransformed wrapper, the print animates inside it
                <motion.div
                  key={key}
                  initial="away"
                  whileInView="placed"
                  viewport={{ once: true, amount: 0.15 }}
                  className="w-[clamp(84px,28vw,168px)] shrink-0 sm:w-[clamp(150px,25vw,290px)]"
                >
                  <motion.button
                    type="button"
                    data-print={key}
                    onClick={() => setOpenIndex(start + i)}
                    aria-label={t("open", { photo: t(`photos.${key}`) })}
                    aria-haspopup="dialog"
                    variants={{
                      away: { opacity: 0, y: -40, scale: 1.1, rotate: 0 },
                      placed: {
                        opacity: 1,
                        y,
                        scale: 1,
                        rotate,
                        transition: { delay: rowIndex * 0.15 + i * 0.08, duration: 0.6, ease: "easeOut" },
                      },
                    }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 2, transition: { duration: 0.25 } }}
                    className="relative block w-full cursor-zoom-in rounded bg-crem p-[clamp(6px,1vw,10px)] pb-[clamp(26px,3.2vw,40px)] shadow-[0_14px_34px_rgba(28,12,37,.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
                  >
                    <span className="relative block aspect-[3/4]">
                      <Image src={`/brand/prints/${key}.webp`} alt="" fill unoptimized className="object-cover" />
                    </span>
                    <span className="absolute inset-x-0 bottom-[clamp(6px,1vw,12px)] text-center font-editorial text-[clamp(11px,1.4vw,17px)] leading-none whitespace-nowrap text-mov">
                      {t(`photos.${key}`)}
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={pill("line")}>
            {t("instagram")}
          </a>
        </div>
      </div>

      {openIndex !== null && (
        <PhotoLightbox
          photos={PHOTOS.map(({ key, src, width, height }) => ({ src, width, height, alt: t(`photos.${key}`) }))}
          index={openIndex}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
