import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Your Own | Copa + Glas Studio",
  description:
    "Commission Copa + Glas pieces made once, for the rooms they belong in. Begin with the Aura wall light — iridescent glass at the heart of hand-formed copper.",
  robots: { index: false, follow: false },
};

export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
