"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

const availabilityKeys = ["morning", "lunch", "evening", "anytime"] as const;
const skillKeys = ["beginner", "intermediate", "advanced", "competitive"] as const;

export default function PartnerFinderForm() {
  const t = useTranslations("community.partnerForm");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [availability, setAvailability] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/partner-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, availability, skillLevel }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-mov rounded-2xl p-8 md:p-10 border border-crem/10"
    >
      <h2 className="text-3xl font-black text-crem mb-2">{t("title")}</h2>
      <p className="text-lilac mb-8">{t("desc")}</p>

      {submitted ? (
        <div className="text-center py-10">
          <CheckCircle2 size={48} className="text-amber mx-auto mb-4" />
          <p className="text-crem font-bold text-lg">{t("success")}</p>
          <p className="text-lilac mt-2 text-sm">{t("successSub")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-lilac">{t("name")}</Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="bg-mov border-crem/20 text-crem placeholder:text-crem/40 focus:border-amber"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lilac">{t("phone")}</Label>
              <Input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("phonePlaceholder")}
                className="bg-mov border-crem/20 text-crem placeholder:text-crem/40 focus:border-amber"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-lilac">{t("availability")}</Label>
            <div className="grid grid-cols-2 gap-3">
              {availabilityKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAvailability(key)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
                    availability === key
                      ? "border-amber bg-amber/10 text-amber"
                      : "border-crem/20 text-lilac hover:border-crem/40"
                  }`}
                >
                  <div className="font-bold">{t(`avail.${key}Label`)}</div>
                  <div className="text-xs opacity-70">{t(`avail.${key}Time`)}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-lilac">{t("skillLevel")}</Label>
            <div className="grid grid-cols-2 gap-3">
              {skillKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSkillLevel(key)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
                    skillLevel === key
                      ? "border-amber bg-amber/10 text-amber"
                      : "border-crem/20 text-lilac hover:border-crem/40"
                  }`}
                >
                  <div className="font-bold">{t(`skill.${key}Label`)}</div>
                  <div className="text-xs opacity-70">{t(`skill.${key}Sub`)}</div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{t("errorMsg")}</p>
          )}

          <Button
            type="submit"
            disabled={loading || !name || !phone || !availability || !skillLevel}
            className="bg-brand-accent text-mov hover:bg-brand-accent-hover font-bold w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? t("sending") : t("submit")}
          </Button>
        </form>
      )}
    </motion.div>
  );
}
