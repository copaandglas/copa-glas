import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { productsInCategory } from "@/app/lib/products";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/app/lib/schema";

const description =
  "Limited edition mirrors by Copa + Glas Studio — each work limited to ten worldwide, numbered and certificated.";

export const metadata = pageMetadata({
  title: "Limited Edition Mirrors in Copper & Art Glass",
  shareTitle: "Limited Editions",
  description,
  path: "/limited-editions",
  image: { url: "/og-rotation-confetti-mirror.jpg", width: 1200, height: 1200, alt: "The Rotation Confetti Mirror by Copa + Glas" },
});

export default function LimitedEditionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", path: "/limited-editions", name: "Copa + Glas Limited Editions", description }),
          itemListSchema("Copa + Glas Limited Editions", productsInCategory("/limited-editions")),
          breadcrumbSchema([
            { name: "Collection", path: "/collection" },
            { name: "Limited Editions", path: "/limited-editions" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
