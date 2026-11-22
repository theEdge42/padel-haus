"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingRequestForm } from "@/components/shared/BookingRequestForm";
import { Zap, Crown, Sun, Clock } from "lucide-react";

const packageKeys = ["basic", "premium", "exclusive"] as const;
const packageIcons = [Sun, Zap, Crown];
// Courts base: morning 5,120 RON, mixed 5,440 RON — evening adds open bar, catering, trophy, full customisation
const packagePrices = ["5,120 RON", "7,200 RON", "10,500 RON"];

export default function CorporatePage() {
  const t = useTranslations("corporate");
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState("");

  const scrollToForm = (packageKey?: string) => {
    if (packageKey) setSelectedPackage(packageKey);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 bg-background-alternate relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-amber/20 text-amber border-amber/30 mb-6 text-sm px-4 py-1.5">
              {t("hero.badge")}
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-black text-crem mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lilac text-xl leading-relaxed">{t("hero.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Rates info */}
      <section className="py-10 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-3 bg-mov rounded-xl px-5 py-3 border border-crem/10">
              <Sun size={18} className="text-amber flex-shrink-0" />
              <span className="text-lilac text-sm">{t("packages.rateDay")}</span>
            </div>
            <div className="flex items-center gap-3 bg-mov rounded-xl px-5 py-3 border border-crem/10">
              <Clock size={18} className="text-amber flex-shrink-0" />
              <span className="text-lilac text-sm">{t("packages.rateEvening")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-crem text-center mb-14"
          >
            {t("packages.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packageKeys.map((key, i) => {
              const Icon = packageIcons[i];
              const isPremium = key === "premium";
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative rounded-2xl p-8 border transition-all flex flex-col ${
                    isPremium
                      ? "bg-amber/10 border-amber/50 ring-2 ring-amber/30"
                      : "bg-mov border-crem/10"
                  }`}
                >
                  {isPremium && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber text-mov text-xs font-black px-4 py-1 rounded-full">
                      POPULAR
                    </div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                      isPremium ? "bg-amber/20" : "bg-amber/10"
                    }`}
                  >
                    <Icon size={24} className="text-amber" />
                  </div>
                  <h3 className="text-2xl font-black text-crem mb-1">
                    {t(`packages.${key}.name`)}
                  </h3>
                  <p className="text-lilac text-sm mb-4">{t(`packages.${key}.desc`)}</p>
                  <div className="text-3xl font-black text-amber mb-1">
                    {t("packages.price")} {packagePrices[i]}
                  </div>
                  <p className="text-lilac text-sm mb-2">{t(`packages.${key}.courts`)}</p>
                  <p className="text-lilac text-sm mb-6 flex-1">{t(`packages.${key}.includes`)}</p>
                  <Button
                    onClick={() => scrollToForm(key)}
                    className={`w-full font-bold ${
                      isPremium
                        ? "bg-brand-accent text-noapte hover:bg-brand-accent-hover"
                        : "bg-crem/10 text-crem hover:bg-crem/20 border border-crem/20"
                    }`}
                  >
                    {t("packages.inquire")}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Nights */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-black text-crem mb-6">{t("nights.title")}</h2>
            <p className="text-lilac text-lg leading-relaxed">{t("nights.desc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24">
        <div ref={formRef} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-mov rounded-2xl p-8 border border-crem/10"
          >
            <h2 className="text-3xl font-black text-crem mb-8">{t("form.title")}</h2>
            <BookingRequestForm
              apiEndpoint="/api/corporate-request"
              packageOptions={packageKeys.map((key, i) => ({
                value: key,
                label: `${t(`packages.${key}.name`)} — ${packagePrices[i]}`,
              }))}
              selectedPackage={selectedPackage}
              onPackageChange={setSelectedPackage}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
