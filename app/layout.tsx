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
  metadataBase: new URL("https://www.copaandglas.com"),
  title: {
    default: "Copa + Glas — Handcrafted Copper & Glass Mirrors, East London",
    template: "%s — Copa + Glas",
  },
  description: "East London design studio specialising in handcrafted mirrors and lighting in copper and glass. Each piece made to order in our workshop.",
  openGraph: {
    type: "website",
    siteName: "Copa + Glas",
    locale: "en_GB",
    url: "https://www.copaandglas.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted copper and glass mirrors, East London" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@copaandglas",
    title: "Copa + Glas — Handcrafted Copper & Glass Mirrors, East London",
    description: "East London design studio specialising in handcrafted mirrors and lighting in copper and glass. Each piece made to order in our workshop.",
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
