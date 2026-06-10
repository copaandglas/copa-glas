import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lighting",
  description: "Handcrafted copper and glass wall lights by Copa + Glas Studio — sculptural lighting made to order in East London.",
  openGraph: {
    type: "website",
    siteName: "Copa + Glas",
    locale: "en_GB",
    title: "Lighting — Copa + Glas",
    description: "Handcrafted copper and glass wall lights by Copa + Glas Studio — sculptural lighting made to order in East London.",
    url: "/lighting",
    images: [{ url: "/og-aura-wall-light.jpg", width: 1200, height: 1200, alt: "Aura Wall Light by Copa + Glas" }],
  },
};

export default function LightingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
