"use client";

import { type FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingRequestForm } from "@/components/shared/BookingRequestForm";
import { cn } from "@/lib/utils";

const plans = ["daytime", "regular"] as const;
type Plan = (typeof plans)[number];
const partnerCounts = [1, 2, 3] as const;
type PartnerCount = (typeof partnerCounts)[number];
const sessionCounts = {
  daytime: [1, 4, 8],
  regular: [1, 4],
} as const;

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

function buildWhatsAppLink(phone: string, message: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export default function CoachingPage() {
  const t = useTranslations("coaching");
  const bt = useTranslations("booking");
  const tContact = useTranslations("contact");
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
    const total = getPrice(bookingPlan, partners, sessions);
    const message = t("plans.whatsappMessage", {
      plan: t(`plans.${bookingPlan}.name`),
      partners: t(`plans.partners.${partners}`),
      sessions: t("plans.sessionCount", { count: sessions }),
      total,
      name: customerName.trim(),
    });

    window.open(buildWhatsAppLink(tContact("info.phone"), message), "_blank", "noopener,noreferrer");
    setBookingPlan(null);
    setCustomerName("");
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 mb-6 text-sm px-4 py-1.5">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-[#E2D9F3] text-xl leading-relaxed">{t("hero.desc")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-10 text-center"
          >
            {t("plans.title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, i) => {
              const partners = selectedPartners[plan];
              const sessions = selectedSessions[plan];
              const total = getPrice(plan, partners, sessions);
              return (
                <motion.div
                  key={plan}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#3B0758] rounded-2xl border border-white/10 hover:border-[#FFD700]/40 transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative w-full aspect-[16/9] bg-[#3B0758] flex items-center justify-center overflow-hidden">
                    <Image
                      src="/PadelHaus.png"
                      alt={t(`plans.${plan}.name`)}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B0758]/60 to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-white">{t(`plans.${plan}.name`)}</h3>
                  <p className="text-[#E2D9F3] text-sm mb-6">{t(`plans.${plan}.schedule`)}</p>

                  <span className="text-xs font-bold uppercase tracking-wide text-[#E2D9F3]/70 mb-2">
                    {t("plans.partnersLabel")}
                  </span>
                  <div className="flex gap-2 mb-6">
                    {partnerCounts.map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() =>
                          setSelectedPartners((prev) => ({ ...prev, [plan]: count }))
                        }
                        className={cn(
                          "flex-1 rounded-xl border py-2 text-sm font-bold transition-all",
                          partners === count
                            ? "bg-[#FFD700] border-[#FFD700] text-[#3B0758]"
                            : "border-white/20 text-white hover:border-[#FFD700]/40"
                        )}
                      >
                        {count}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wide text-[#E2D9F3]/70 mb-2">
                    {t("plans.sessionsLabel")}
                  </span>
                  <div className="flex gap-2 mb-6">
                    {sessionCounts[plan].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() =>
                          setSelectedSessions((prev) => ({ ...prev, [plan]: count }))
                        }
                        className={cn(
                          "flex-1 rounded-xl border py-2 text-sm font-bold transition-all",
                          sessions === count
                            ? "bg-[#FFD700] border-[#FFD700] text-[#3B0758]"
                            : "border-white/20 text-white hover:border-[#FFD700]/40"
                        )}
                      >
                        {count}
                      </button>
                    ))}
                  </div>

                  <p className="text-[#E2D9F3] text-sm mb-1">{t(`plans.partners.${partners}`)}</p>
                  <p className="text-[#FFD700] font-black text-2xl mb-1">
                    {total} lei <span className="text-sm font-bold text-[#E2D9F3]">{t("plans.total")}</span>
                  </p>
                  <p className="text-[#E2D9F3]/70 text-sm mb-6">{t("plans.packagePrice")}</p>

                  <Button
                    type="button"
                    onClick={() => setBookingPlan(plan)}
                    className="bg-brand-accent text-[#3B0758] hover:bg-brand-accent-hover font-bold w-full h-11 mt-auto"
                  >
                    {t("whatsappCta")}
                  </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {bookingPlan && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
              role="presentation"
              onMouseDown={() => setBookingPlan(null)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="coaching-booking-title"
                className="w-full max-w-md rounded-2xl border border-white/15 bg-[#3B0758] p-6 shadow-2xl"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <h2 id="coaching-booking-title" className="mb-2 text-2xl font-black text-white">
                  {t("plans.bookingModal.title")}
                </h2>
                <p className="mb-6 text-sm text-[#E2D9F3]">{t("plans.bookingModal.description")}</p>
                <form onSubmit={handleBookingSubmit}>
                  <label htmlFor="coaching-customer-name" className="mb-2 block text-sm font-semibold text-white">
                    {t("plans.bookingModal.nameLabel")}
                  </label>
                  <Input
                    id="coaching-customer-name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder={t("plans.bookingModal.namePlaceholder")}
                    className="h-11 border-white/20 bg-[#25003D] text-white placeholder:text-white/40"
                    autoComplete="name"
                    autoFocus
                    required
                  />
                  <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setBookingPlan(null)}>
                      {t("plans.bookingModal.cancel")}
                    </Button>
                    <Button type="submit" className="bg-brand-accent text-[#3B0758] hover:bg-brand-accent-hover">
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
              className="text-[#E2D9F3]/70 text-sm underline hover:text-[#FFD700] transition-colors"
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
              className="bg-[#3B0758] rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-3xl font-black text-white mb-8">{bt("title")}</h2>
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
