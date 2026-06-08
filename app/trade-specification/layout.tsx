import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade & Specification",
  description: "Trade enquiries and specification information for Copa + Glas Studio. We work with interior designers, architects, and specification professionals.",
  openGraph: {
    title: "Trade & Specification — Copa + Glas",
    description: "Trade enquiries and specification information for Copa + Glas Studio. We work with interior designers, architects, and specification professionals.",
    url: "/trade-specification",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted copper and glass mirrors, East London" }],
  },
};

export default function TradeSpecificationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
