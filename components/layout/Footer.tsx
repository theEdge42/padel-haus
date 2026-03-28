import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Share2, Rss, Play } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}/experience`, label: tNav("experience") },
    { href: `/${locale}/community`, label: tNav("community") },
    { href: `/${locale}/events`, label: tNav("events") },
    { href: `/${locale}/corporate`, label: tNav("corporate") },
    { href: `/${locale}/gallery`, label: tNav("gallery") },
    { href: `/${locale}/contact`, label: tNav("contact") },
    { href: `/${locale}/shop`, label: tNav("shop") },
  ];

  return (
    <footer className="bg-[#2D0A4E] border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="inline-block mb-3">
              <span className="text-2xl font-black tracking-tight text-white">
                PADEL<span className="text-[#B5F03D]">HAUS</span>
              </span>
            </Link>
            <p className="text-[#E2D9F3] text-sm">{t("tagline")}</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-[#E2D9F3] hover:text-[#B5F03D] transition-colors" aria-label="Instagram">
                <Share2 size={20} />
              </a>
              <a href="#" className="text-[#E2D9F3] hover:text-[#B5F03D] transition-colors" aria-label="Facebook">
                <Rss size={20} />
              </a>
              <a href="#" className="text-[#E2D9F3] hover:text-[#B5F03D] transition-colors" aria-label="YouTube">
                <Play size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("links")}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#E2D9F3] text-sm hover:text-[#B5F03D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-[#E2D9F3]">
              <li>Str. Exemplu 42, Bucharest</li>
              <li>+40 700 000 000</li>
              <li>hello@padelhaus.ro</li>
              <li className="mt-3">Lun–Vin: 07:00–23:00</li>
              <li>Sâm–Dum: 08:00–22:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#E2D9F3]/60">
          <p>© {new Date().getFullYear()} Padel Haus. {t("rights")}</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#B5F03D] transition-colors">{t("privacy")}</Link>
            <Link href="#" className="hover:text-[#B5F03D] transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
