import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { AGENCY_CONFIG } from "@/config/agency";

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  variable: "--font-dm-sans",
  display: "swap",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F8F5",
};

export const metadata: Metadata = {
  title: {
    default: `${AGENCY_CONFIG.name} — ${AGENCY_CONFIG.tagline} | Burkina Faso`,
    template: `%s | ${AGENCY_CONFIG.name}`,
  },
  description: AGENCY_CONFIG.description,
  keywords: [
    "immobilier Burkina Faso",
    "maison à vendre Ouagadougou",
    "appartement à louer Bobo-Dioulasso",
    "terrain Koudougou",
    "NAYA IMMOBILIER",
  ],
  openGraph: {
    title: `${AGENCY_CONFIG.name} — ${AGENCY_CONFIG.tagline}`,
    description: AGENCY_CONFIG.description,
    locale: "fr_BF",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-naya-bg text-naya-text antialiased pb-20 lg:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}

