import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { PageHero, pill } from "@/components/shared/Brand";
import { ZoomablePhoto } from "@/components/shared/ZoomablePhoto";
import { PLAYTOMIC_RESERVATIONS, PLAYTOMIC_OPEN_MATCHES, WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

// The disabled "How booking works" block below also needs framer-motion and bookingSteps = ["step1", "step2", "step3"]
const levels = ["beginner", "intermediate", "advanced"] as const;

const SECTION_TITLE = "font-editorial text-[clamp(34px,5vw,52px)] leading-[1.05] text-crem";
const CARD = "rounded-3xl bg-crem p-6 text-mov sm:p-8";
const CARD_TITLE = "text-2xl leading-tight font-extrabold tracking-[-.02em]";

export default function BeginnersPage() {
  const t = useTranslations("beginners");
  const locale = useLocale();

  return (
    <div className="bg-noapte">
      <PageHero
        title={t("hero.title")}
        desc={t("hero.desc")}
        aside={
          <ZoomablePhoto
            photo={{ src: "/brand/beginners-racket.webp", width: 1080, height: 1440, alt: t("photoAlt") }}
            // Square on phones, framed on the racket. The whole photo on desktop.
            className="mx-auto aspect-square max-w-[360px] [&>img]:object-[50%_68%] lg:aspect-[3/4]"
          />
        }
      />

      {/*/!* How booking works *!/*/}
      {/*<section className="py-20">*/}
      {/*  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">*/}
      {/*    <motion.h2*/}
      {/*      initial={{ opacity: 0, y: 20 }}*/}
      {/*      whileInView={{ opacity: 1, y: 0 }}*/}
      {/*      viewport={{ once: true }}*/}
      {/*      className="text-3xl font-black text-crem mb-10 text-center"*/}
      {/*    >*/}
      {/*      {t("booking.title")}*/}
      {/*    </motion.h2>*/}
      {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">*/}
      {/*      {bookingSteps.map((step, i) => (*/}
      {/*        <motion.div*/}
      {/*          key={step}*/}
      {/*          initial={{ opacity: 0, y: 30 }}*/}
      {/*          whileInView={{ opacity: 1, y: 0 }}*/}
      {/*          viewport={{ once: true }}*/}
      {/*          transition={{ delay: i * 0.1 }}*/}
      {/*          className="bg-mov rounded-2xl p-6 border border-crem/10 text-center"*/}
      {/*        >*/}
      {/*          <div className="w-10 h-10 rounded-full bg-amber text-mov font-black text-lg flex items-center justify-center mx-auto mb-4">*/}
      {/*            {i + 1}*/}
      {/*          </div>*/}
      {/*          <h3 className="text-crem font-bold mb-2">{t(`booking.${step}Title`)}</h3>*/}
      {/*          <p className="text-lilac text-sm leading-relaxed">{t(`booking.${step}Desc`)}</p>*/}
      {/*        </motion.div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Gear */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className={cn(SECTION_TITLE, "mb-10")}>{t("gear.title")}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <article data-card className={CARD}>
              <h3 className={CARD_TITLE}>{t("gear.racketTitle")}</h3>
              <p className="mt-3 leading-relaxed text-mov/80">{t("gear.racketDesc")}</p>
              <Link
                href={`/${locale}#pricing`}
                className="mt-4 inline-block font-extrabold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mov"
              >
                {t("gear.racketLink")}
              </Link>
            </article>
            <article data-card className={CARD}>
              <h3 className={CARD_TITLE}>{t("gear.shoesTitle")}</h3>
              <p className="mt-3 leading-relaxed text-mov/80">{t("gear.shoesDesc")}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Come alone */}
      <section className="bg-mov py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-2 lg:gap-12">
          <h2 className={SECTION_TITLE}>{t("alone.title")}</h2>
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-lilac">{t("alone.desc")}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={PLAYTOMIC_OPEN_MATCHES} target="_blank" rel="noopener noreferrer" className={pill("amber")}>
                {t("alone.openMatchesCta")}
              </a>
              <Link href={`/${locale}/community`} className={pill("line")}>
                {t("alone.communityCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skill levels */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className={cn(SECTION_TITLE, "mb-10")}>{t("levels.title")}</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {levels.map((level) => (
              <article key={level} data-card className={CARD}>
                <h3 className={CARD_TITLE}>{t(`levels.${level}Title`)}</h3>
                <p className="mt-3 leading-relaxed text-mov/80">{t(`levels.${level}Desc`)}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-lilac">{t("levels.note")}</p>
        </div>
      </section>

      {/* Final CTA */}
      <section data-ends-mov className="bg-mov pt-16 pb-14 text-center sm:pt-24">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-[clamp(36px,6vw,64px)] leading-[.98] font-extrabold tracking-[-.035em] text-balance text-crem">
            {t("cta.title")}
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={PLAYTOMIC_RESERVATIONS} target="_blank" rel="noopener noreferrer" className={pill("amber")}>
              {t("cta.bookButton")}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={pill("line")}>
              {t("cta.communityButton")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
