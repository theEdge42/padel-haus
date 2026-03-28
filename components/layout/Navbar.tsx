"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === "en" ? "ro" : "en";

  function switchLocale() {
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    router.push(segments.join("/") || "/");
  }

  const navLinks = [
    { href: `/${locale}/experience`, label: t("experience") },
    { href: `/${locale}/community`, label: t("community") },
    { href: `/${locale}/events`, label: t("events") },
    { href: `/${locale}/corporate`, label: t("corporate") },
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/contact`, label: t("contact") },
    { href: `/${locale}/shop`, label: t("shop") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A0530]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">
              PADEL<span className="text-[#B5F03D]">HAUS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#E2D9F3] hover:text-[#B5F03D] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={switchLocale}
              className="text-sm font-semibold text-[#E2D9F3] hover:text-[#B5F03D] transition-colors px-2 py-1 border border-white/20 rounded-md"
            >
              {otherLocale.toUpperCase()}
            </button>
            <Button
              asChild
              className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold text-sm"
            >
              <Link href={`/${locale}/contact`}>{t("bookNow")}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#2D0A4E] border-t border-white/10 px-4 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#E2D9F3] hover:text-[#B5F03D] transition-colors py-2 border-b border-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  switchLocale();
                  setMobileOpen(false);
                }}
                className="text-sm font-semibold text-[#E2D9F3] hover:text-[#B5F03D] transition-colors px-3 py-2 border border-white/20 rounded-md"
              >
                {otherLocale.toUpperCase()}
              </button>
              <Button
                asChild
                className="bg-[#B5F03D] text-[#1A0530] hover:bg-[#a1d936] font-bold text-sm flex-1"
              >
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("bookNow")}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
