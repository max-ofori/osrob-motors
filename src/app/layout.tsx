import type { Metadata, Viewport } from "next";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/sigmar-one/400.css";
import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";

const SHOP_NAME = process.env.NEXT_PUBLIC_SHOP_NAME ?? "Osrob Motors";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SHOP_NAME} | Auto Parts Available Now`,
  description: `Browse the parts currently in stock at ${SHOP_NAME} and contact us on WhatsApp to buy.`,
  applicationName: SHOP_NAME,
  icons: {
    icon: "/osrob-motors.jpg",
    shortcut: "/osrob-motors.jpg",
    apple: "/osrob-motors.jpg",
  },
  openGraph: {
    type: "website",
    siteName: SHOP_NAME,
    title: `${SHOP_NAME} | Auto Parts Available Now`,
    description: `Browse the parts currently in stock at ${SHOP_NAME} and contact us on WhatsApp to buy.`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f6f6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      style={{
        ["--font-archivo" as string]: "Archivo",
        ["--font-inter" as string]: "Inter",
      }}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
