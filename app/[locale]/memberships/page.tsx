import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Dots, PageHero, pill } from "@/components/shared/Brand";
import { PLAYTOMIC_MEMBERSHIPS, WHATSAPP_CONTACT_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PLANS = [
  { key: "weekend", price: 219 },
  { key: "fullTime", price: 599 },
  { key: "beforeFive", price: 199 },
] as const;
const PAID_BOOKINGS = 9;

export default function MembershipsPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale);
  const t = useTranslations("memberships");
  const included = t.raw("included") as string[];

  return (
    <div className="bg-noapte">
      <PageHero title={t("hero.title")} desc={t("hero.desc")} />

      {/* Prices: Verde Velvet replaces Mov */}
      <section className="bg-verde py-16 text-crem sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-10 font-editorial text-[clamp(34px,5vw,52px)] leading-none">{t("plansTitle")}</h2>

          <div className="grid gap-4 lg:grid-cols-3">
            {PLANS.map(({ key, price }) => (
              <article key={key} data-membership={key} className="flex flex-col rounded-3xl border border-crem/20 p-6 sm:p-8">
                <h3 className="text-[28px] leading-none font-extrabold tracking-[-.03em]">{t(`${key}.name`)}</h3>
                <p className="mt-3 font-editorial text-[22px] leading-tight">{t(`${key}.lead`)}</p>
                <p className="mt-3 flex-1 leading-relaxed text-crem/75">{t(`${key}.desc`)}</p>
                <p className="mt-8 flex flex-wrap items-baseline gap-x-2 border-t border-crem/20 pt-5">
                  <span data-price className="text-[56px] leading-none font-extrabold tracking-[-.04em]">{price}</span>
                  <span className="font-bold">{t("currency")}</span>
                  <span className="text-sm text-crem/75">{t("period")}</span>
                </p>
                <a href={PLAYTOMIC_MEMBERSHIPS} target="_blank" rel="noopener noreferrer" className={pill("amber", "mt-6 w-full")}>
                  {t("cta")}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="mb-4 text-lg font-extrabold">{t("includedTitle")}</h3>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-crem/85">
                  <Check size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section data-stamp className="bg-crem py-16 text-mov sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-[clamp(40px,6.5vw,72px)] leading-[.95] font-extrabold tracking-[-.035em]">
              {t("stamp.name")}
              <em className="block font-editorial tracking-[-.01em]">{t("stamp.lead")}</em>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-mov/80">{t("stamp.desc")}</p>
            <a href={WHATSAPP_CONTACT_URL} target="_blank" rel="noopener noreferrer" className={pill("amber", "mt-7")}>
              {t("stamp.cta")}
            </a>
          </div>

          <div role="img" aria-label={t("stamp.cardLabel")} className="rounded-3xl bg-mov p-5 text-crem sm:p-8">
            <Dots className="mb-6" />
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {Array.from({ length: PAID_BOOKINGS + 1 }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-full",
                    i === PAID_BOOKINGS
                      ? "bg-amber font-editorial text-sm text-noapte sm:text-xl"
                      : "border-2 border-crem/60 text-lg font-extrabold sm:text-2xl",
                  )}
                >
                  {i === PAID_BOOKINGS ? t("stamp.free") : i + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <p className="mx-auto max-w-md px-5 py-10 text-center text-sm text-lilac">
        {t.rich("note", {
          whatsapp: (chunks) => (
            <a href={WHATSAPP_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="text-crem underline underline-offset-2">
              {chunks}
            </a>
          ),
        })}
      </p>
    </div>
  );
}
