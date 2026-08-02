import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { LetterRoll } from "@/components/shared/LetterRoll";
import { WHATSAPP_CONTACT_URL, INSTAGRAM_URL } from "@/lib/constants";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1424.6245643968098!2d26.179369830486497!3d44.428051670800954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff005138e94d%3A0x859648e1e9b81efa!2sPadel%20Haus%20Bucharest!5e0!3m2!1sen!2sro!4v1775249393523!5m2!1sen!2sro";
const LATITUDE = 44;
const LONGITUDE = 26;

export default function Footer() {
  const t = useTranslations("footer");
  const tContact = useTranslations("contact");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const exploreLinks = [
    { href: `/${locale}`, label: tNav("experience") },
    { href: `/${locale}/beginners`, label: tNav("beginners") },
    { href: `/${locale}/coaching`, label: tNav("coaching") },
    { href: `/${locale}/memberships`, label: tNav("memberships") },
    { href: `/${locale}/events`, label: tNav("events") },
    // { href: `/${locale}/community`, label: tNav("community") },
    // { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <footer className="bg-background-alternate border-t border-white/10 pt-16 pb-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo — sits above the address */}
        <Link href={`/${locale}`} className="inline-block mb-8 opacity-90 hover:opacity-100 transition-opacity">
          <Logo size="lg" />
        </Link>

        {/* Address / EXPLORE / CONTACT — bottom-aligned so labels sit on the address baseline */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-20 items-end mb-6">
          <div>
            <p className="text-lg font-semibold text-[#E2D9F3] sm:text-xl">{LATITUDE}, {LONGITUDE}   {tContact("info.address")}</p>
          </div>
          <h3 className="hidden text-white font-bold tracking-wide md:block">{t("links").toUpperCase()}</h3>
          <h3 className="hidden text-white font-bold tracking-wide md:block">{tContact("hero.badge").toUpperCase()}</h3>
        </div>

        {/* Map / links / contact — top-aligned so the map lines up with the first link */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-20 items-start mb-12">
          <div className="rounded-xl overflow-hidden border border-white/10 w-full max-w-[500px] aspect-square">
            <iframe
              src={MAP_EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Padel Haus Map"
            />
          </div>

          <div>
            <h3 className="mb-4 text-white font-bold tracking-wide md:hidden">{t("links").toUpperCase()}</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                  href={link.href}
                    className="group text-[#E2D9F3] hover:text-[#FFD700] transition-colors"
                    aria-label={link.label}
                  >
                    <LetterRoll>{link.label}</LetterRoll>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-white font-bold tracking-wide md:hidden">{tContact("hero.badge").toUpperCase()}</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href={`mailto:${tContact("info.email")}`} className="text-[#E2D9F3] hover:text-[#FFD700] transition-colors">
                  Email
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E2D9F3] hover:text-[#FFD700] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/20 text-[#E2D9F3] hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-colors"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={WHATSAPP_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/20 text-[#E2D9F3] hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#E2D9F3]/60">
          <div className="flex gap-4">
            {/*<Link href="#" className="hover:text-[#FFD700] transition-colors">{t("privacy")}</Link>*/}
            {/*<Link href="#" className="hover:text-[#FFD700] transition-colors">{t("terms")}</Link>*/}
          </div>
        </div>
      </div>
    </footer>
  );
}
