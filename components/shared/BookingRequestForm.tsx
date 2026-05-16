"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  apiEndpoint: string;
  extraData?: Record<string, string>;
}

export function BookingRequestForm({ apiEndpoint, extraData = {} }: Props) {
  const t = useTranslations("booking");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      ...extraData,
    };
    await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 size={48} className="text-[#B5F03D] mx-auto mb-4" />
        <p className="text-white font-bold text-lg">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-[#E2D9F3]">{t("name")}</Label>
        <Input
          name="name"
          required
          className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[#E2D9F3]">{t("email")}</Label>
          <Input
            name="email"
            type="email"
            className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[#E2D9F3]">{t("phone")}</Label>
          <Input
            name="phone"
            type="tel"
            className="bg-[#1A0530] border-white/20 text-white placeholder:text-white/40 focus:border-[#B5F03D]"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold w-full h-11"
      >
        {loading ? "..." : t("submit")}
      </Button>
    </form>
  );
}
