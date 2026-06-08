import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaborations",
  description: "Collaborative works by Copa + Glas — pieces made in partnership with artists and makers who share our material language.",
  openGraph: {
    title: "Collaborations — Copa + Glas",
    description: "Collaborative works by Copa + Glas — pieces made in partnership with artists and makers who share our material language.",
    url: "/collaborative",
    images: [{ url: "/heroimage.png", width: 1200, height: 630, alt: "Copa + Glas Studio" }],
  },
};

export default function CollaborativeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
