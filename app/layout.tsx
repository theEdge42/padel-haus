import type { Metadata } from "next";
import { Geist, Geist_Mono, Black_Ops_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
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
    <html className={`${geistSans.variable} ${geistMono.variable} ${blackOpsOne.variable}`}>
      <body className="bg-[#341743] text-white antialiased">{children}</body>
    </html>
  );
}
