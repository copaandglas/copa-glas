import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { productsInCategory } from "@/app/lib/products";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/app/lib/schema";

const description =
  "Handcrafted copper and glass mirrors by Copa + Glas Studio — the Rotation, Mondrian, and Fibonacci mirrors, made to order in East London.";

export const metadata = pageMetadata({
  title: "Handmade Copper & Glass Mirrors",
  shareTitle: "Mirrors",
  description,
  path: "/mirrors",
  image: { url: "/og-rotation-mirror.jpg", width: 1200, height: 1200, alt: "The Rotation Mirror by Copa + Glas" },
});

export default function MirrorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", path: "/mirrors", name: "Copa + Glas Mirrors", description }),
          itemListSchema("Copa + Glas Mirrors", productsInCategory("/mirrors")),
          breadcrumbSchema([
            { name: "Collection", path: "/collection" },
            { name: "Mirrors", path: "/mirrors" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
