import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";

// Tab title of home; every other page sets "Padel Haus | <page>" through lib/metadata.ts
export const metadata: Metadata = {
  title: "Padel Haus",
};

// Pages are built ahead of time for each locale, so links can prefetch them and clicks open instantly
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // The locale comes from the URL, not the request headers: reading headers made every page dynamic
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main className="pt-24 flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
