import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Dots, pill } from "@/components/shared/Brand";
import { ZoomablePhoto } from "@/components/shared/ZoomablePhoto";
import { LEAGUE_RANKINGS_URL, PLAYTOMIC_ACTIVITIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DIVISIONS = ["beginners", "intermediate"] as const;
const PODIUM = ["first", "second", "third"] as const;
const BONUSES = ["draw", "progress"] as const;

const LINEUP_SIZE = { width: 1600, height: 1067 };

const IMPACT_TITLE = "text-[clamp(36px,6.5vw,72px)] leading-[.95] font-extrabold tracking-[-.035em] uppercase";

export default function EventsPage() {
  const t = useTranslations("events");
  const rules = t.raw("how.rules") as string[];
  const example = t.raw("how.example") as { label: string; value: string }[];
  const steps = t.raw("join.steps") as { title: string; desc: string }[];

  return (
    <div className="bg-noapte text-crem">
      {/* Cover */}
      <section className="relative isolate -mt-24 overflow-hidden bg-mov pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <Image
            src="/brand/team-wide.webp"
            alt=""
            fill
            unoptimized
            preload
            className="scale-110 object-cover object-[45%_55%] blur-[7px] saturate-75"
          />
          <div className="absolute inset-0 bg-mov/50" />
          <div className="absolute inset-0 bg-linear-to-b from-noapte/90 via-noapte/30 to-mov/70" />
        </div>

        <div className="mx-auto max-w-6xl px-5">
          <Dots />
          <h1 className="my-16 -rotate-6 text-center text-[14vw] sm:text-[clamp(52px,8.6vw,104px)] leading-[.92] font-extrabold tracking-[-.035em] uppercase sm:my-20">
            <span className="block">{t("hero.titleTop")}</span>
            <span className="block">{t("hero.titleBottom")}</span>
          </h1>
          <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-3">
            {(["prize", "stages"] as const).map((key) => (
              <div key={key} className="flex flex-col-reverse justify-center rounded-2xl border border-crem/30 bg-mov/60 px-2 py-5 text-center">
                <dt className="mt-1.5 font-editorial text-lg leading-tight sm:text-2xl">{t(`hero.${key}Label`)}</dt>
                <dd className="text-[clamp(22px,5vw,52px)] leading-none font-extrabold tracking-[-.03em]">{t(`hero.${key}Value`)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={PLAYTOMIC_ACTIVITIES} target="_blank" rel="noopener noreferrer" className={pill("amber", "w-full sm:w-auto")}>
              {t("hero.register")}
            </a>
            <a href={LEAGUE_RANKINGS_URL} target="_blank" rel="noopener noreferrer" className={pill("line", "w-full sm:w-auto")}>
              {t("hero.ranking")}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Divisions and when they play */}
      <section className="bg-noapte py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-editorial text-[clamp(36px,5vw,56px)] leading-none">{t("divisions.title")}</h2>
          <p className="mt-3 text-lg text-lilac">{t("divisions.subtitle")}</p>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {DIVISIONS.map((division) => (
              <article key={division} data-division={division} className="border-t border-crem/70 py-6">
                <h3 className="text-xl font-extrabold">{t(`divisions.${division}.name`)}</h3>
                <p className="mt-1 text-lilac">
                  {t(`divisions.${division}.day`)}, {t(`divisions.${division}.time`)}
                </p>
                <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[clamp(56px,8vw,88px)] leading-none font-extrabold tracking-[-.04em] whitespace-nowrap">
                    {t(`divisions.${division}.level`)}
                  </span>
                  <span className="text-lilac">{t("divisions.levelLabel")}</span>
                </p>
              </article>
            ))}
          </div>

          <ZoomablePhoto
            photo={{ ...LINEUP_SIZE, src: "/brand/mexicano-lineup.webp", alt: t("photos.lineup") }}
            className="mt-8 aspect-[3/2] lg:aspect-video"
          />
        </div>
      </section>

      {/* Prizes: utility piece on Verde */}
      <section className="bg-verde py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-center text-sm font-extrabold tracking-[.14em] uppercase">{t("prizes.title")}</h2>
          <p className="mt-3 text-center text-[clamp(56px,13vw,132px)] leading-none font-extrabold tracking-[-.04em]">{t("prizes.total")}</p>

          <dl className="mx-auto mt-8 grid max-w-2xl grid-cols-2 divide-x divide-crem/30 text-center">
            {DIVISIONS.map((division) => (
              <div key={division} className="flex flex-col-reverse px-2">
                <dt className="mt-1 text-sm text-crem/75">{t(`divisions.${division}.name`)}</dt>
                <dd className="text-2xl font-extrabold tracking-[-.02em] sm:text-4xl">{t("prizes.perLeague")}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-14 mb-3 text-lg font-extrabold">{t("prizes.podium")}</h3>
          <ol>
            {PODIUM.map((place, i) => (
              <li
                key={place}
                data-place={place}
                className="grid grid-cols-[36px_1fr] items-center gap-x-4 gap-y-3 border-t border-crem/60 py-6 sm:grid-cols-[64px_1fr_auto]"
              >
                <span className="font-editorial text-[52px] leading-none sm:text-7xl">{i + 1}</span>
                <p className="text-[32px] leading-none font-extrabold tracking-[-.03em] whitespace-nowrap sm:order-last sm:text-5xl">
                  {t(`prizes.${place}.amount`)}
                </p>
                <ul className="col-start-2 space-y-1 text-crem/85">
                  {(t.raw(`prizes.${place}.items`) as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-crem/60 pt-6">
            <span className="font-extrabold">{t("prizes.bonusLabel")}</span>
            <span className="text-[32px] font-extrabold tracking-[-.03em] sm:text-5xl">{t("prizes.bonusTotal")}</span>
          </p>
        </div>
      </section>

      {/* Bonus prizes */}
      <section className="bg-mov py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className={IMPACT_TITLE}>{t("bonus.title")}</h2>
          <p className="mt-3 text-2xl font-extrabold tracking-[-.02em]">{t("bonus.subtitle")}</p>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {BONUSES.map((bonus) => (
              <article key={bonus} className="border-t border-crem/70 py-6">
                <h3 className="font-bold text-lilac">{t(`bonus.${bonus}.label`)}</h3>
                <p className="mt-2 text-[clamp(28px,4vw,38px)] leading-none font-extrabold tracking-[-.03em]">{t(`bonus.${bonus}.value`)}</p>
                <p className="mt-3 leading-relaxed text-lilac">{t(`bonus.${bonus}.desc`)}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 rounded-2xl border-[1.5px] border-amber p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <h3 className="text-3xl font-extrabold uppercase">{t("bonus.joker.title")}</h3>
            <p className="leading-relaxed">{t("bonus.joker.desc")}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-noapte py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className={IMPACT_TITLE}>{t("how.title")}</h2>
          <p className="mt-3 font-editorial text-[28px]">{t("how.format")}</p>

          <dl className="mt-8 grid grid-cols-2 gap-5">
            {(["matches", "duration"] as const).map((key) => (
              <div key={key} className="flex flex-col-reverse justify-end border-t border-crem/70 pt-3">
                <dt className="text-sm text-lilac">{t(`how.${key}Label`)}</dt>
                <dd className="text-[clamp(22px,4vw,38px)] font-extrabold tracking-[-.02em]">{t(`how.${key}Value`)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-3xl border border-crem/20 bg-mov p-5 sm:p-8">
            <ol>
              {rules.map((rule, i) => (
                <li key={rule} className="flex gap-4 border-b border-crem/15 py-4 first:pt-0">
                  <span className="w-5 shrink-0 font-editorial text-2xl leading-none text-lilac">{i + 1}</span>
                  <p className="leading-relaxed">{rule}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-6 mb-3 font-extrabold">{t("how.exampleTitle")}</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {example.map(({ label, value }, i) => (
                <p
                  key={label}
                  className={cn(
                    "rounded-xl border p-3",
                    i === example.length - 1 ? "col-span-2 border-crem bg-crem text-mov sm:col-span-1" : "border-crem/30",
                  )}
                >
                  <span className="block text-xs font-bold">{label}</span>
                  <span className="block text-[28px] font-extrabold tracking-[-.02em]">{value}</span>
                </p>
              ))}
            </div>
            <p className="mt-4 leading-relaxed text-lilac">{t("how.exampleNote")}</p>
          </div>
        </div>
      </section>

      {/* How to register */}
      <section data-ends-mov className="bg-mov py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className={IMPACT_TITLE}>{t("join.title")}</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <ZoomablePhoto
              photo={{ src: "/gallery/Competition1.jpeg", width: 1200, height: 1600, alt: t("photos.players") }}
              // A vertical photo: the frame is set on the players, pressing it shows the whole photo
              className="aspect-[3/2] lg:order-last [&>img]:object-[50%_63%]"
            />
            <div>
              <ol>
                {steps.map(({ title, desc }, i) => (
                  <li key={title} className="flex gap-4 border-t border-crem/20 py-5">
                    <span className="w-5 shrink-0 font-editorial text-3xl leading-none text-amber">{i + 1}</span>
                    <div>
                      <h3 className="text-xl leading-tight font-extrabold">{title}</h3>
                      <p className="mt-1 text-lilac">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <a href={PLAYTOMIC_ACTIVITIES} target="_blank" rel="noopener noreferrer" className={pill("amber", "w-full sm:w-auto")}>
                  {t("hero.register")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
