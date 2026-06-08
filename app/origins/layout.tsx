import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origins",
  description: "The story behind Copa + Glas — a glazing tradition rooted in the Luxfer Prism Company of 1897 and the copper-section technique transformed by Frank Lloyd Wright.",
  openGraph: {
    title: "Origins — Copa + Glas",
    description: "The story behind Copa + Glas — a glazing tradition rooted in the Luxfer Prism Company of 1897 and the copper-section technique transformed by Frank Lloyd Wright.",
    url: "/origins",
    images: [{ url: "/luxferdoors.jpeg", width: 1200, height: 1500, alt: "Archival Luxfer prism glazing" }],
  },
};

export default function OriginsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
