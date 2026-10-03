import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { ORG_ID, breadcrumbSchema, webPageSchema } from "@/app/lib/schema";

const description =
  "Founded in 2021 by master craftsman Anthony McCarty and Bradley McWhinney, Copa + Glas is an East London studio making mirrors and lighting in copper and hand-cut glass.";

export const metadata = pageMetadata({
  title: "About the Studio & Its Founders",
  shareTitle: "About",
  description,
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            type: "AboutPage",
            path: "/about",
            name: "About Copa + Glas",
            description,
            extra: { mainEntity: { "@id": ORG_ID } },
          }),
          breadcrumbSchema([{ name: "About", path: "/about" }]),
        ]}
      />
      {children}
    </>
  );
}
