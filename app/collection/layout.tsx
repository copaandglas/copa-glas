import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { products } from "@/app/lib/products";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/app/lib/schema";

const description =
  "The Copa + Glas collection — mirrors, lighting, and limited editions. Each piece hand-made to order in our East London workshop.";

export const metadata = pageMetadata({
  title: "Collection: Copper & Glass Mirrors and Lighting",
  shareTitle: "The Collection",
  description,
  path: "/collection",
});

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", path: "/collection", name: "The Copa + Glas Collection", description }),
          itemListSchema("The Copa + Glas Collection", products),
          breadcrumbSchema([{ name: "Collection", path: "/collection" }]),
        ]}
      />
      {children}
    </>
  );
}
