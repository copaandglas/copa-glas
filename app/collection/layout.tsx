import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Collection",
  description: "The Copa + Glas collection — mirrors, lighting, and limited editions. Each piece hand-made to order in our East London workshop.",
  openGraph: {
    title: "The Collection — Copa + Glas",
    description: "The Copa + Glas collection — mirrors, lighting, and limited editions. Each piece hand-made to order in our East London workshop.",
    url: "/collection",
    images: [{ url: "/heroimage.png", width: 1200, height: 630, alt: "Copa + Glas Studio" }],
  },
};

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
