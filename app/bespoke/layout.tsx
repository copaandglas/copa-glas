import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke & Commissions",
  description: "Commission a bespoke mirror or lighting piece with Copa + Glas. Every piece can be scaled, finished, or wholly reconceived in copper and hand-cut glass.",
  openGraph: {
    type: "website",
    siteName: "Copa + Glas",
    locale: "en_GB",
    title: "Bespoke & Commissions — Copa + Glas",
    description: "Commission a bespoke mirror or lighting piece with Copa + Glas. Every piece can be scaled, finished, or wholly reconceived in copper and hand-cut glass.",
    url: "/bespoke",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted mirrors and lighting in copper and glass, East London" }],
  },
};

export default function BespokeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
