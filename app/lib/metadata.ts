import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/app/lib/site";

type OgImage = { url: string; width: number; height: number; alt: string };

/**
 * Per-route metadata. `title` is the search title (the root layout appends
 * " — Copa + Glas"); `shareTitle` is the shorter name used on social cards.
 */
export function pageMetadata({
  title,
  shareTitle,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  shareTitle: string;
  description: string;
  path: string;
  image?: OgImage;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_GB",
      title: `${shareTitle} — ${SITE_NAME}`,
      description,
      url: path,
      images: [image],
    },
  };
}
