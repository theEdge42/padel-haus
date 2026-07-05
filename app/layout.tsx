import type { Metadata } from "next";
import { Nunito_Sans, Geist_Mono, Black_Ops_One, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const blackOpsOne = Black_Ops_One({
  variable: "--font-black-ops",
  subsets: ["latin"],
  weight: "400",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif-italic",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Padel Haus — Premium Indoor Padel Bucharest",
  description:
    "4 world-class indoor padel courts in Bucharest. Join our vibrant community, book your court, and experience premium padel.",
  icons: {
    icon: "/5.svg",
    shortcut: "/5.svg",
    apple: "/5.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${nunitoSans.variable} ${geistMono.variable} ${blackOpsOne.variable} ${cormorantGaramond.variable}`}
    >
      <body className="bg-background text-white antialiased">{children}</body>
    </html>
  );
}
