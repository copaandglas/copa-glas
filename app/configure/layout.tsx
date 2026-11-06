import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Your Own",
  description:
    "Choose the glass for your Copa + Glas work, made to order by hand in our East London workshop. Begin with the Aura Wall Light: art glass held in hand-formed copper.",
  robots: { index: false, follow: false },
};

export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
