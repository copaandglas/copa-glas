import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Sale | Copa + Glas Studio",
  description:
    "Terms of sale for Copa + Glas handmade mirrors, lighting, and bespoke commissions. Lead times, payment, delivery, inspection, and returns.",
  openGraph: {
    type: "website",
    siteName: "Copa + Glas",
    locale: "en_GB",
    title: "Terms of Sale — Copa + Glas",
    description: "Terms of sale for Copa + Glas handmade mirrors, lighting, and bespoke commissions. Lead times, payment, delivery, inspection, and returns.",
    url: "/terms",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted mirrors and lighting in copper and glass, East London" }],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
