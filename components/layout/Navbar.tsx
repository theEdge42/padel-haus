"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLAYTOMIC_WEB = "https://playtomic.com/clubs/padel-haus-bucharest";
const PLAYTOMIC_APP = "https://play.google.com/store/apps/details?id=com.playtomic&hl=en";

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
    { href: `/${locale}`, label: t("experience") },
    { href: `/${locale}/coaching`, label: t("coaching") },
    { href: `/${locale}/community`, label: t("community") },
    { href: `/${locale}/events`, label: t("events") },
    { href: `/${locale}/corporate`, label: t("corporate") },
    { href: `/${locale}/contact`, label: t("contact") },
    // { href: `/${locale}/shop`, label: t("shop") },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#341743]/90 backdrop-blur-md border-b border-white/10"
      style={{ transform: "translateZ(0)", willChange: "transform" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center opacity-100 hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/logo.svg"
              alt="Padel Haus"
              width={180}
              height={72}
              priority
              className="h-14 w-auto"
            />
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
            {/* Desktop → Playtomic web */}
            <Button
              asChild
              className="bg-[#B5F03D] text-[#341743] hover:bg-[#a1d936] font-bold text-sm"
            >
              <a href={PLAYTOMIC_WEB} target="_blank" rel="noopener noreferrer">
                {t("bookNow")}
              </a>
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
        <div className="lg:hidden bg-[#4A2060] border-t border-white/10 px-4 py-4">
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
              {/* Mobile → Play Store app */}
              <Button
                asChild
                className="bg-[#B5F03D] text-[#341743] hover:bg-[#a1d936] font-bold text-sm flex-1"
              >
                <a
                  href={PLAYTOMIC_APP}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("bookNow")}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
