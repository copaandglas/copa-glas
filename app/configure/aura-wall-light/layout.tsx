import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aura Wall Light — Make Your Own | Copa + Glas Studio",
  description:
    "Choose your glass finish for the Aura wall light — hand-formed copper and a single pane of iridescent art glass, made once for the room it belongs in.",
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
        href="/corella-orange.png"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
