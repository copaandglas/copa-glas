import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { productsInCategory } from "@/app/lib/products";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/app/lib/schema";

const description =
  "Collaborative works by Copa + Glas — pieces made in partnership with artists and makers who share our material language.";

export const metadata = pageMetadata({
  title: "Artist Collaborations",
  shareTitle: "Collaborations",
  description,
  path: "/collaborative",
});

export default function CollaborativeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", path: "/collaborative", name: "Copa + Glas Collaborations", description }),
          itemListSchema("Copa + Glas Collaborations", productsInCategory("/collaborative")),
          breadcrumbSchema([{ name: "Collaborations", path: "/collaborative" }]),
        ]}
      />
      {children}
    </>
  );
}
