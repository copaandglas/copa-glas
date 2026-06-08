import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lighting",
  description: "Handcrafted copper and glass wall lights by Copa + Glas Studio — sculptural lighting made to order in East London.",
  openGraph: {
    title: "Lighting — Copa + Glas",
    description: "Handcrafted copper and glass wall lights by Copa + Glas Studio — sculptural lighting made to order in East London.",
    url: "/lighting",
    images: [{ url: "/aura-wall-light.png", width: 1200, height: 1500, alt: "Aura Wall Light by Copa + Glas" }],
  },
};

export default function LightingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
