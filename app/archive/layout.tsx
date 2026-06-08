import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive",
  description: "The Copa + Glas archive — a record of commissions, installations, and studio work past and present.",
  openGraph: {
    title: "Archive — Copa + Glas",
    description: "The Copa + Glas archive — a record of commissions, installations, and studio work past and present.",
    url: "/archive",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Copa + Glas Studio — handcrafted mirrors and lighting in copper and glass, East London" }],
  },
};

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
