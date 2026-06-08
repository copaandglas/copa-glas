import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Copa + Glas Studio. Enquire about a piece, begin a commission, or visit us in East London.",
  openGraph: {
    title: "Contact — Copa + Glas",
    description: "Get in touch with Copa + Glas Studio. Enquire about a piece, begin a commission, or visit us in East London.",
    url: "/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted mirrors and lighting in copper and glass, East London" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
