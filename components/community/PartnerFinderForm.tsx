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
      className="bg-[#2D0A4E] rounded-2xl p-8 md:p-10 border border-white/10"
    >
      <h2 className="text-3xl font-black text-white mb-2">{t("title")}</h2>
      <p className="text-[#E2D9F3] mb-8">{t("desc")}</p>

      {submitted ? (
        <div className="text-center py-10">
          <CheckCircle2 size={48} className="text-[#B5F03D] mx-auto mb-4" />
          <p className="text-white font-bold text-lg">{t("success")}</p>
          <p className="text-[#E2D9F3] mt-2 text-sm">{t("successSub")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-[#E2D9F3]">{t("name")}</Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#E2D9F3]">{t("phone")}</Label>
              <Input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("phonePlaceholder")}
                className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[#E2D9F3]">{t("availability")}</Label>
            <div className="grid grid-cols-2 gap-3">
              {availabilityKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAvailability(key)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
                    availability === key
                      ? "border-[#B5F03D] bg-[#B5F03D]/10 text-[#B5F03D]"
                      : "border-white/20 text-[#E2D9F3] hover:border-white/40"
                  }`}
                >
                  <div className="font-bold">{t(`avail.${key}Label`)}</div>
                  <div className="text-xs opacity-70">{t(`avail.${key}Time`)}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[#E2D9F3]">{t("skillLevel")}</Label>
            <div className="grid grid-cols-2 gap-3">
              {skillKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSkillLevel(key)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
                    skillLevel === key
                      ? "border-[#B5F03D] bg-[#B5F03D]/10 text-[#B5F03D]"
                      : "border-white/20 text-[#E2D9F3] hover:border-white/40"
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
            className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? t("sending") : t("submit")}
          </Button>
        </form>
      )}
    </motion.div>
  );
}
