import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle } from "lucide-react";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const INSTAGRAM_URL = "https://www.instagram.com/padelhaus.romania/";
const WHATSAPP_URL = "https://chat.whatsapp.com/CqGix2BlvAtIyz7z3ic30I";

export default function Footer() {
  const t = useTranslations("footer");
  const tContact = useTranslations("contact");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}`, label: tNav("experience") },
    { href: `/${locale}/coaching`, label: tNav("coaching") },
    { href: `/${locale}/community`, label: tNav("community") },
    { href: `/${locale}/events`, label: tNav("events") },
    { href: `/${locale}/corporate`, label: tNav("corporate") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <footer className="bg-brand-surface border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <Link href={`/${locale}`} className="inline-block mb-3 opacity-90 hover:opacity-100 transition-opacity">
              <Image src="/logo.svg" alt="Padel Haus" width={130} height={52} className="h-10 w-auto" />
            </Link>
            <p className="text-brand-muted text-sm">{t("tagline")}</p>
            <div className="flex gap-4 mt-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-accent transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E2D9F3] hover:text-[#B5F03D] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

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

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-[#E2D9F3]">
              <li>Strada Rampei 37, Faur, Bucuresti</li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B5F03D] transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </li>
              <li className="mt-3">{tContact("info.hours")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#E2D9F3]/60">
          <p>© {new Date().getFullYear()} Padel Haus. {t("rights")}</p>
          <div className="flex gap-4">
            {/*<Link href="#" className="hover:text-[#B5F03D] transition-colors">{t("privacy")}</Link>*/}
            {/*<Link href="#" className="hover:text-[#B5F03D] transition-colors">{t("terms")}</Link>*/}
          </div>
        </div>
      </div>
    </footer>
  );
}
