import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

// The tab title of a page: "Padel Haus | <name>", the name in the page's language.
// Written out in full: Next only applies a title template one level down, so nested pages (shop/checkout) would lose it.
export function pageTitle(key: string) {
  return async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale });
    return { title: { absolute: `Padel Haus | ${t(key)}` } };
  };
}
