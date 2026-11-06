import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aura Wall Light — Make Your Own",
  description:
    "Choose the glass for your Aura Wall Light: a single pane of Luminous art glass held in hand-formed copper, made to order in our East London workshop.",
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
        Preload the default glass swatch (Corella Orange) so it is ready
        the moment the configurator mounts, with no visible loading delay.
      */}
      <link
        rel="preload"
        as="image"
        href="/corella-orange.jpg"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
