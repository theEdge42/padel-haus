"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingRequestForm } from "@/components/shared/BookingRequestForm";
import { cn } from "@/lib/utils";

const plans = ["daytime", "regular"] as const;
const partnerCounts = [1, 2, 3] as const;

const PRICES: Record<(typeof plans)[number], Record<(typeof partnerCounts)[number], number>> = {
  daytime: { 1: 210, 2: 120, 3: 95 },
  regular: { 1: 260, 2: 145, 3: 115 },
};

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
  const [selectedPartners, setSelectedPartners] = useState<Record<(typeof plans)[number], (typeof partnerCounts)[number]>>({
    daytime: 1,
    regular: 1,
  });

  const scrollToForm = () => {
    setShowForm(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
              const price = PRICES[plan][partners];
              const message = t("plans.whatsappMessage", {
                plan: t(`plans.${plan}.name`),
                partners: t(`plans.partners.${partners}`),
              });
              const whatsappLink = buildWhatsAppLink(tContact("info.phone"), message);
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
                          "flex-1 rounded-xl border py-3 text-sm font-bold transition-all",
                          partners === count
                            ? "bg-[#FFD700] border-[#FFD700] text-[#3B0758]"
                            : "border-white/20 text-white hover:border-[#FFD700]/40"
                        )}
                      >
                        {count}
                      </button>
                    ))}
                  </div>

                  <p className="text-[#E2D9F3] text-sm mb-1">{t(`plans.partners.${partners}`)}</p>
                  <p className="text-[#FFD700] font-black text-2xl mb-6">
                    {price} lei <span className="text-sm font-bold text-[#E2D9F3]">/ {t("plans.perSession")}</span>
                  </p>

                  <Button
                    asChild
                    className="bg-[#FFD700] text-[#3B0758] hover:bg-[#FFE773] font-bold w-full h-11 mt-auto"
                  >
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      {t("whatsappCta")}
                    </a>
                  </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

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
          <div ref={formRef} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
