import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReferralMarker from "@/app/components/ReferralMarker";
import { getProduct } from "@/app/lib/products";
import ProductView from "@/app/product/[slug]/ProductView";

// Destination of the QR code in the House of Estila window. It shows the
// copper tone Rotation at its own path so scans can be counted in analytics
// and enquiries traced to the window. Kept out of search and the sitemap.
export const metadata: Metadata = {
  title: "Rotation Mirror in Copper Tone",
  description: "The Rotation in copper tone glass, on view at House of Estila, Clerkenwell.",
  robots: { index: false, follow: true },
};

export default function EstilaPage() {
  const product = getProduct("rotation-mirror-copper-tone");
  if (!product) notFound();

  return (
    <>
      <ReferralMarker referral="estila" />
      <ProductView product={product} />
    </>
  );
}
