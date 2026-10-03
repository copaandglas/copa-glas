import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { productsInCategory } from "@/app/lib/products";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/app/lib/schema";

const description =
  "Handcrafted copper and glass wall lights by Copa + Glas Studio — sculptural lighting made to order in East London.";

export const metadata = pageMetadata({
  title: "Handmade Copper & Glass Wall Lights",
  shareTitle: "Lighting",
  description,
  path: "/lighting",
  image: { url: "/og-aura-wall-light.jpg", width: 1200, height: 1200, alt: "Aura Wall Light by Copa + Glas" },
});

export default function LightingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", path: "/lighting", name: "Copa + Glas Lighting", description }),
          itemListSchema("Copa + Glas Lighting", productsInCategory("/lighting")),
          breadcrumbSchema([
            { name: "Collection", path: "/collection" },
            { name: "Lighting", path: "/lighting" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
