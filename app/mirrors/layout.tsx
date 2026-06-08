import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mirrors",
  description: "Handcrafted copper and glass mirrors by Copa + Glas Studio — the Rotation, Mondrian, and Fibonacci mirrors, made to order in East London.",
  openGraph: {
    title: "Mirrors — Copa + Glas",
    description: "Handcrafted copper and glass mirrors by Copa + Glas Studio — the Rotation, Mondrian, and Fibonacci mirrors, made to order in East London.",
    url: "/mirrors",
    images: [{ url: "/rotation-mirror.png", width: 1200, height: 1500, alt: "The Rotation Mirror by Copa + Glas" }],
  },
};

export default function MirrorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
