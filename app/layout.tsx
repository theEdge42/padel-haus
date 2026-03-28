import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Padel Haus — Premium Indoor Padel Cluj-Napoca",
  description:
    "4 world-class indoor padel courts in Cluj-Napoca. Join our vibrant community, book your court, and experience premium padel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#1A0530] text-white antialiased">{children}</body>
    </html>
  );
}
