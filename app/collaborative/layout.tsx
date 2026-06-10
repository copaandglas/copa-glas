import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaborations",
  description: "Collaborative works by Copa + Glas — pieces made in partnership with artists and makers who share our material language.",
  openGraph: {
    type: "website",
    siteName: "Copa + Glas",
    locale: "en_GB",
    title: "Collaborations — Copa + Glas",
    description: "Collaborative works by Copa + Glas — pieces made in partnership with artists and makers who share our material language.",
    url: "/collaborative",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted mirrors and lighting in copper and glass, East London" }],
  },
};

export default function CollaborativeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
