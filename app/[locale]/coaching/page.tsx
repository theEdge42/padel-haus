"use client";

import { type FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFormatter, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingRequestForm } from "@/components/shared/BookingRequestForm";
import { PageHero, pill } from "@/components/shared/Brand";
import { ZoomablePhoto } from "@/components/shared/ZoomablePhoto";
import { WHATSAPP_CONTACT_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const plans = ["daytime", "regular"] as const;
type Plan = (typeof plans)[number];
const partnerCounts = [1, 2, 3] as const;
type PartnerCount = (typeof partnerCounts)[number];
const sessionCounts = {
  daytime: [1, 4, 8],
  regular: [1, 4],
} as const;

// Prices are per person. The group total is the price times the number of people.
const PRICES: Record<Plan, Record<PartnerCount, Partial<Record<number, number>>>> = {
  daytime: {
    1: { 1: 210, 4: 800, 8: 1500 },
    2: { 1: 120, 4: 440, 8: 840 },
    3: { 1: 95, 4: 340, 8: 840 },
  },
  regular: {
    1: { 1: 260, 4: 960 },
    2: { 1: 145, 4: 540 },
    3: { 1: 115, 4: 420 },
  },
};

function getPrice(plan: Plan, partners: PartnerCount, sessions: number) {
  const price = PRICES[plan][partners][sessions];

  if (price === undefined) {
    throw new Error(`Missing coaching price for ${plan}, ${partners} players, ${sessions} sessions.`);
  }

  return price;
}

function getQuote(plan: Plan, partners: PartnerCount, sessions: number) {
  const perPerson = getPrice(plan, partners, sessions);
  return { perPerson, total: perPerson * partners };
}

function buildWhatsAppLink(message: string) {
  return `${WHATSAPP_CONTACT_URL}?text=${encodeURIComponent(message)}`;
}

function OptionGroup<T extends number>({
  label,
  options,
  value,
  onChange,
  renderLabel,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (option: T) => void;
  renderLabel: (option: T) => string;
}) {
  return (
    <fieldset className="mt-6 min-w-0">
      <legend className="mb-2.5 text-xs font-extrabold tracking-[.12em] text-mov/75 uppercase">{label}</legend>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={option === value}
            onClick={() => onChange(option)}
            className={cn(
              "min-h-12 min-w-0 flex-1 cursor-pointer rounded-xl border px-1 py-2 text-sm leading-tight font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mov",
              option === value ? "border-mov bg-mov text-crem" : "border-mov/30 text-mov hover:border-mov",
            )}
          >
            {renderLabel(option)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function CoachingPage() {
  const t = useTranslations("coaching");
  const bt = useTranslations("booking");
  const format = useFormatter();
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPartners, setSelectedPartners] = useState<Record<Plan, (typeof partnerCounts)[number]>>({
    daytime: 1,
    regular: 1,
  });
  const [selectedSessions, setSelectedSessions] = useState<Record<Plan, number>>({
    daytime: 1,
    regular: 1,
  });
  const [bookingPlan, setBookingPlan] = useState<Plan | null>(null);
  const [customerName, setCustomerName] = useState("");

  const scrollToForm = () => {
    setShowForm(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bookingPlan) return;

    const partners = selectedPartners[bookingPlan];
    const sessions = selectedSessions[bookingPlan];
    const { perPerson, total } = getQuote(bookingPlan, partners, sessions);
    const message = t(partners > 1 ? "plans.whatsappMessageGroup" : "plans.whatsappMessage", {
      plan: t(`plans.${bookingPlan}.name`),
      partners: t(`plans.partners.${partners}`),
      sessions: t("plans.sessionCount", { count: sessions }),
      perPerson: format.number(perPerson),
      total: format.number(total),
      name: customerName.trim(),
    });

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    setBookingPlan(null);
    setCustomerName("");
  };

  return (
    <div className="min-h-screen bg-noapte">
      <PageHero
        title={t("hero.title")}
        desc={t("hero.desc")}
        aside={
          <ZoomablePhoto
            photo={{ src: "/community/coaching.jpg", width: 720, height: 1280, alt: t("photoAlt") }}
            // Square on phones so the plans stay close; the crop keeps both faces and the raised racket
            className="mx-auto aspect-square max-w-[360px] [&>img]:object-[50%_30%] lg:aspect-[3/4] lg:[&>img]:object-[50%_55%]"
          />
        }
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-5">
          <h2 className="mb-10 font-editorial text-[clamp(34px,5vw,52px)] leading-none text-crem">{t("plans.title")}</h2>

          <div className="grid gap-5 md:grid-cols-2">
            {plans.map((plan) => {
              const partners = selectedPartners[plan];
              const sessions = selectedSessions[plan];
              const { perPerson, total } = getQuote(plan, partners, sessions);

              return (
                <article key={plan} data-plan={plan} className="flex min-w-0 flex-col rounded-3xl bg-crem p-5 text-mov sm:p-8">
                  <h3 className="text-[32px] leading-none font-extrabold tracking-[-.03em]">{t(`plans.${plan}.name`)}</h3>
                  <p className="mt-2 text-sm text-mov/75">{t(`plans.${plan}.schedule`)}</p>

                  <OptionGroup
                    label={t("plans.partnersLabel")}
                    options={partnerCounts}
                    value={partners}
                    onChange={(count) => setSelectedPartners((prev) => ({ ...prev, [plan]: count }))}
                    renderLabel={(count) => `${t(`plans.partners.${count}`)}${count > 1 ? "*" : ""}`}
                  />
                  <OptionGroup<number>
                    label={t("plans.sessionsLabel")}
                    options={sessionCounts[plan]}
                    value={sessions}
                    onChange={(count) => setSelectedSessions((prev) => ({ ...prev, [plan]: count }))}
                    renderLabel={(count) => t("plans.sessionCount", { count })}
                  />

                  <div data-quote aria-live="polite" className="mt-7 border-t border-mov/20 pt-5">
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <span data-per-person className="text-[40px] leading-none font-extrabold tracking-[-.04em]">{format.number(perPerson)} lei</span>
                      <span className="text-sm font-bold text-mov/75">{t("plans.perPerson")}</span>
                    </p>
                    <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className="text-sm font-bold text-mov/75">{t(partners > 1 ? "plans.groupTotal" : "plans.total")}</span>
                      <span data-total className="text-2xl font-extrabold tracking-[-.02em]">{format.number(total)} lei</span>
                    </p>
                  </div>

                  <button type="button" onClick={() => setBookingPlan(plan)} className={pill("amber", "mt-6 w-full focus-visible:outline-mov")}>
                    {t("whatsappCta")}
                  </button>
                </article>
              );
            })}
          </div>
          <p data-partner-note className="mt-4 text-[13px] leading-relaxed text-lilac">{t("partnerNote")}</p>

          {bookingPlan && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-noapte/70 p-4"
              role="presentation"
              onMouseDown={() => setBookingPlan(null)}
              onKeyDown={(event) => event.key === "Escape" && setBookingPlan(null)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="coaching-booking-title"
                className="w-full max-w-md rounded-2xl border border-crem/15 bg-mov p-6 shadow-2xl"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <h2 id="coaching-booking-title" className="mb-2 text-2xl font-black text-crem">
                  {t("plans.bookingModal.title")}
                </h2>
                <p className="mb-6 text-sm text-lilac">{t("plans.bookingModal.description")}</p>
                <form onSubmit={handleBookingSubmit}>
                  <label htmlFor="coaching-customer-name" className="mb-2 block text-sm font-semibold text-crem">
                    {t("plans.bookingModal.nameLabel")}
                  </label>
                  <Input
                    id="coaching-customer-name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder={t("plans.bookingModal.namePlaceholder")}
                    className="h-11 border-crem/20 bg-noapte text-crem placeholder:text-crem/40"
                    autoComplete="name"
                    autoFocus
                    required
                  />
                  <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setBookingPlan(null)}>
                      {t("plans.bookingModal.cancel")}
                    </Button>
                    <Button type="submit" className="bg-brand-accent text-mov hover:bg-brand-accent-hover">
                      {t("plans.bookingModal.continue")}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={scrollToForm}
              className="text-lilac/70 text-sm underline hover:text-amber transition-colors"
            >
              {t("fallbackLabel")}
            </button>
          </div>
        </div>
      </section>

      {showForm && (
        <section className="pb-24">
          <div ref={formRef} className="scroll-mt-24 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-mov rounded-2xl p-8 border border-crem/10"
            >
              <h2 className="text-3xl font-black text-crem mb-8">{bt("title")}</h2>
              <BookingRequestForm
                apiEndpoint="/api/coaching-request"
                extraData={{ session: "60/90 min" }}
              />
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
