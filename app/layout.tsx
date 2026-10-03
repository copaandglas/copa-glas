import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/app/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/app/lib/schema";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/app/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL),
  title: {
    default: "Copa + Glas — Handcrafted Mirrors & Lighting, East London",
    template: "%s — Copa + Glas",
  },
  description: "An East London studio making mirrors and lighting in copper and hand-cut glass. Each piece drawn from a century-old craft tradition and made to order.",
  applicationName: SITE_NAME,
  authors: [{ name: "Copa + Glas Studio", url: SITE_URL }],
  creator: "Copa + Glas Studio",
  publisher: "Copa + Glas Studio",
  category: "Design",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
  // Title, description, and image are left unset so each page's Open Graph
  // values are used for its Twitter card too.
  twitter: {
    card: "summary_large_image",
    site: "@copaandglas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
