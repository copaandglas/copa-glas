import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Limited Editions",
  description: "Limited edition mirrors by Copa + Glas Studio — each work limited to ten worldwide, numbered and certificated.",
  openGraph: {
    title: "Limited Editions — Copa + Glas",
    description: "Limited edition mirrors by Copa + Glas Studio — each work limited to ten worldwide, numbered and certificated.",
    url: "/limited-editions",
    images: [{ url: "/rotation-confetti-mirror.png", width: 1200, height: 1500, alt: "The Rotation Confetti Mirror by Copa + Glas" }],
  },
};

export default function LimitedEditionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
