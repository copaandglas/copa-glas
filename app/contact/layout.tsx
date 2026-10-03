import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { ORG_ID, breadcrumbSchema, webPageSchema } from "@/app/lib/schema";

const description =
  "Contact Copa + Glas Studio in East London. Enquire about a mirror or light, begin a bespoke commission, or make a trade or press enquiry.";

export const metadata = pageMetadata({
  title: "Contact the Studio",
  shareTitle: "Contact",
  description,
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            type: "ContactPage",
            path: "/contact",
            name: "Contact Copa + Glas",
            description,
            extra: { mainEntity: { "@id": ORG_ID } },
          }),
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
        ]}
      />
      {children}
    </>
  );
}
