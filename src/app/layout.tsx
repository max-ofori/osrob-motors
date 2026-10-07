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
const HOME_TITLE = `Auto Parts & Car Parts in Accra | ${SHOP_NAME}`;
const HOME_DESCRIPTION = `Shop auto parts and car parts in Accra, Ghana. Browse available replacement parts at ${SHOP_NAME} on Spintex Road and contact us on WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: [
    "auto parts Accra",
    "car parts Accra",
    "auto spare parts Ghana",
    "replacement car parts",
    "Osrob Motors",
    "Spintex Road",
  ],
  applicationName: SHOP_NAME,
  icons: {
    icon: "/osrob-motors.jpg",
    shortcut: "/osrob-motors.jpg",
    apple: "/osrob-motors.jpg",
  },
  openGraph: {
    type: "website",
    siteName: SHOP_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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
