import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.copaandglas.com"),
  title: {
    default: "Copa + Glas — Handcrafted Mirrors & Lighting, East London",
    template: "%s — Copa + Glas",
  },
  description: "An East London studio making mirrors and lighting in copper and hand-cut glass. Each piece drawn from a century-old craft tradition and made to order.",
  openGraph: {
    type: "website",
    siteName: "Copa + Glas",
    locale: "en_GB",
    url: "https://www.copaandglas.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted mirrors and lighting in copper and glass, East London" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@copaandglas",
    title: "Copa + Glas — Handcrafted Mirrors & Lighting, East London",
    description: "An East London studio making mirrors and lighting in copper and hand-cut glass. Each piece drawn from a century-old craft tradition and made to order.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
