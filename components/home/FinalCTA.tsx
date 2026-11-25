"use client";

import { useTranslations } from "next-intl";
import { pill } from "@/components/shared/Brand";
import { PLAYTOMIC_RESERVATIONS } from "@/lib/constants";

export default function FinalCTA() {
  const t = useTranslations("home.cta");

  return (
    <section data-final data-ends-mov className="bg-mov pt-24 pb-14 text-center sm:pt-28">
      <div className="mx-auto max-w-[900px] px-5">
        <h2 className="text-[clamp(40px,6.5vw,72px)] leading-[.95] font-extrabold tracking-[-.035em] text-crem">
          {t("title")}
          <em className="block font-editorial tracking-[-.01em] text-amber">{t("accent")}</em>
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <a href={PLAYTOMIC_RESERVATIONS} target="_blank" rel="noopener noreferrer" className={pill("amber")}>
            {t("ctaBook")}
          </a>
          <a href="#visit" className={pill("line")}>
            {t("ctaVisit")}
          </a>
        </div>
      </div>
    </section>
  );
}
