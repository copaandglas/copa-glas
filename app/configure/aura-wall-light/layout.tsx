import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aura Wall Light — Make Your Own",
  description:
    "Choose the glass for your Aura Wall Light: a single pane of luminous art glass held in hand-formed copper, made to order in our East London workshop.",
  robots: { index: false, follow: false },
};

export default function AuraWallLightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*
        Preload the default glass (Corella Orange, lit) so the light is
        drawn the moment the configurator mounts.
      */}
      <link
        rel="preload"
        as="image"
        href="/aura-glass/amber-on.webp"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
