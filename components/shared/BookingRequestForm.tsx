"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface PackageOption {
  value: string;
  label: string;
}

interface Props {
  apiEndpoint: string;
  extraData?: Record<string, string>;
  packageOptions?: PackageOption[];
  selectedPackage?: string;
  onPackageChange?: (value: string) => void;
}

export function BookingRequestForm({
  apiEndpoint,
  extraData = {},
  packageOptions,
  selectedPackage,
  onPackageChange,
}: Props) {
  const t = useTranslations("booking");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data: Record<string, string> = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      ...extraData,
    };
    if (packageOptions && selectedPackage) {
      data.package = selectedPackage;
    }
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
        <CheckCircle2 size={48} className="text-[#FFD700] mx-auto mb-4" />
        <p className="text-white font-bold text-lg">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {packageOptions && (
        <div className="space-y-2">
          <Label className="text-[#E2D9F3]">{t("package")}</Label>
          <div className="relative">
          <select
            name="package"
            value={selectedPackage ?? ""}
            onChange={(e) => onPackageChange?.(e.target.value)}
            required
            className="w-full appearance-none rounded-md border border-white/20 bg-[#3B0758] pl-3 pr-8 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700] [&>option]:bg-[#3B0758]"
          >
            <option value="" disabled>
              {t("selectPackage")}
            </option>
            {packageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <Label className="text-[#E2D9F3]">{t("name")}</Label>
        <Input
          name="name"
          required
          className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[#E2D9F3]">{t("email")}</Label>
          <Input
            name="email"
            type="email"
            className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[#E2D9F3]">{t("phone")}</Label>
          <Input
            name="phone"
            type="tel"
            className="bg-[#3B0758] border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD700]"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#FFD700] text-[#3B0758] hover:bg-[#FFE773] font-bold w-full h-11"
      >
        {loading ? "..." : t("submit")}
      </Button>
    </form>
  );
}
