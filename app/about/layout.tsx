import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Copa + Glas — an East London design studio making handcrafted mirrors and lighting in copper and hand-cut glass.",
  openGraph: {
    title: "About — Copa + Glas",
    description: "The story of Copa + Glas — an East London design studio making handcrafted mirrors and lighting in copper and hand-cut glass.",
    url: "/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted copper and glass mirrors, East London" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
