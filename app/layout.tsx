import type { Metadata } from "next";
import { Nunito_Sans, Geist_Mono, Tinos } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tinos = Tinos({
  variable: "--font-tinos",
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Padel Haus — Premium Indoor Padel Bucharest",
  description:
    "4 world-class indoor padel courts in Bucharest. Join our vibrant community, book your court, and experience premium padel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${nunitoSans.variable} ${geistMono.variable} ${tinos.variable}`}
    >
      <body className="bg-background text-crem antialiased">{children}</body>
    </html>
  );
}
