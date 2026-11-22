"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Eyebrow, pill } from "@/components/shared/Brand";
import { Reveal } from "@/components/shared/Reveal";
import { PLAYTOMIC_RESERVATIONS } from "@/lib/constants";

// Utility piece: Verde Velvet replaces Mov entirely (brand book §04.1)
export default function PricingSection() {
  const t = useTranslations("pricing");
  const locale = useLocale();

  return (
    <section id="pricing" className="scroll-mt-16 bg-verde py-20 text-crem sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <Eyebrow className="text-crem">{t("badge")}</Eyebrow>
        <h2 className="text-[clamp(40px,6.5vw,72px)] leading-[.95] font-extrabold tracking-[-.035em]">{t("courtTitle")}</h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-crem/75">{t("subtitle")}</p>

        <Reveal className="mt-14 grid gap-4 md:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-crem/15 p-6 sm:p-[30px]">
            <dl>
              {(["weekday", "evening"] as const).map((rate) => (
                <div key={rate} className="border-t border-crem/15 py-5 first:border-t-0">
                  <dt className="mb-1.5 text-xs font-extrabold tracking-[.14em] text-crem/70 uppercase">{t(`${rate}Label`)}</dt>
                  <dd className="text-[clamp(34px,4.6vw,48px)] leading-none font-extrabold tracking-[-.04em]">
                    {t(`${rate}Price`)} <small className="text-[17px] font-bold tracking-normal text-crem/70">{t("priceUnit")}</small>
                  </dd>
                </div>
              ))}
            </dl>
            <a href={PLAYTOMIC_RESERVATIONS} target="_blank" rel="noopener noreferrer" className={pill("amber", "mt-3")}>
              {t("cta")}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <dl className="flex justify-between gap-3 border-b border-crem/15 py-4">
              <dt className="text-crem/85">{t("racketLabel")}</dt>
              <dd className="font-bold whitespace-nowrap">{t("racketPrice")}</dd>
            </dl>
            {[
              { href: "memberships", text: t("membershipTeaser"), link: t("membershipLink") },
              { href: "coaching", text: t("academyTeaser"), link: t("academyLink") },
            ].map(({ href, text, link }) => (
              <Link
                key={href}
                href={`/${locale}/${href}`}
                className="flex flex-col items-start gap-1.5 rounded-[18px] bg-crem px-5 py-[18px] font-bold text-verde transition-opacity hover:opacity-90"
              >
                {text}
                <span className="inline-flex items-center gap-1.5 text-sm font-extrabold underline underline-offset-4">
                  {link}
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
