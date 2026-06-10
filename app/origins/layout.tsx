import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origins",
  description: "The story behind Copa + Glas — a glazing tradition rooted in the Luxfer Prism Company of 1897 and the copper-section technique transformed by Frank Lloyd Wright.",
  openGraph: {
    type: "website",
    siteName: "Copa + Glas",
    locale: "en_GB",
    title: "Origins — Copa + Glas",
    description: "The story behind Copa + Glas — a glazing tradition rooted in the Luxfer Prism Company of 1897 and the copper-section technique transformed by Frank Lloyd Wright.",
    url: "/origins",
    images: [{ url: "/og-origins.jpg", width: 1200, height: 1200, alt: "The Luxfer Prism Company door, 16 — the glazing tradition behind Copa + Glas" }],
  },
};

export default function OriginsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
