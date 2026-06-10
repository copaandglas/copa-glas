import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Collection",
  description: "The Copa + Glas collection — mirrors, lighting, and limited editions. Each piece hand-made to order in our East London workshop.",
  openGraph: {
    type: "website",
    siteName: "Copa + Glas",
    locale: "en_GB",
    title: "The Collection — Copa + Glas",
    description: "The Copa + Glas collection — mirrors, lighting, and limited editions. Each piece hand-made to order in our East London workshop.",
    url: "/collection",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted mirrors and lighting in copper and glass, East London" }],
  },
};

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
