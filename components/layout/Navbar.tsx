"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { PLAYTOMIC_APP, WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/constants";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
    { href: `/${locale}/beginners`, label: t("beginners") },
    { href: `/${locale}/coaching`, label: t("coaching") },
    { href: `/${locale}/events`, label: t("events") },
    { href: `/${locale}/memberships`, label: t("memberships") },
    // { href: `/${locale}/community`, label: t("community") },
    // { href: `/${locale}/contact`, label: t("contact") },
    // { href: `/${locale}/shop`, label: t("shop") },
    // { href: `/${locale}/corporate`, label: t("corporate") },
  ];

  return (
    <header className="fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-50">
      <div className="max-w-7xl mx-auto rounded-2xl border border-white/15 bg-[#25003D]/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="px-4 sm:px-6 flex items-center gap-4 h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center shrink-0 opacity-100 hover:opacity-80 transition-opacity duration-200"
          >
            <Logo size="sm" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#F3E8FF]/80 hover:text-[#FFE773] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions — Book · WhatsApp · Instagram */}
          <div className="hidden lg:flex items-center justify-end gap-3 ml-auto">
            <button
              onClick={switchLocale}
              className="text-sm font-semibold text-[#F3E8FF]/80 hover:text-[#FFE773] transition-colors px-2 py-1 border border-white/20 rounded-md"
            >
              {otherLocale.toUpperCase()}
            </button>
            <Button
              asChild
              className="bg-[#FFD700] text-[#25003D] hover:bg-[#FFE773] font-bold text-sm"
            >
              <a href={PLAYTOMIC_APP} target="_blank" rel="noopener noreferrer">
                {t("bookNow")}
              </a>
            </Button>
            {/*<a*/}
            {/*  href={WHATSAPP_URL}*/}
            {/*  target="_blank"*/}
            {/*  rel="noopener noreferrer"*/}
            {/*  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 text-[#F3E8FF] hover:border-[#FFE773] hover:text-[#FFE773] transition-colors"*/}
            {/*  aria-label="WhatsApp"*/}
            {/*>*/}
            {/*  <MessageCircle size={16} />*/}
            {/*</a>*/}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 text-[#F3E8FF] hover:border-[#FFE773] hover:text-[#FFE773] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
          </div>

          {/* Mobile: Book / WhatsApp / Instagram stay visible outside the burger */}
          <div className="flex lg:hidden items-center justify-end gap-2 ml-auto">
            <Button
              asChild
              size="sm"
              className="bg-[#FFD700] text-[#25003D] hover:bg-[#FFE773] font-bold text-xs px-3"
            >
              <a href={PLAYTOMIC_APP} target="_blank" rel="noopener noreferrer">
                {t("bookNow")}
              </a>
            </Button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-white/25 text-[#F3E8FF]"
              aria-label="WhatsApp"
            >
              <MessageCircle size={14} />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-white/25 text-[#F3E8FF]"
              aria-label="Instagram"
            >
              <InstagramIcon size={14} />
            </a>
            <button
              className="p-1.5 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav — links + locale switch only; Book/WhatsApp/Instagram live outside this drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-[#F3E8FF]/80 hover:text-[#FFE773] transition-colors py-2.5 border-b border-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  switchLocale();
                  setMobileOpen(false);
                }}
                className="text-sm font-semibold text-[#F3E8FF]/80 hover:text-[#FFE773] transition-colors px-3 py-2 mt-3 border border-white/20 rounded-md w-fit"
              >
                {otherLocale.toUpperCase()}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
