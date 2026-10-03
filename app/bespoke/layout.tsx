import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/app/lib/schema";

const description =
  "Commission a bespoke mirror or lighting piece with Copa + Glas. Every piece can be scaled, finished, or wholly reconceived in copper and hand-cut glass.";

export const metadata = pageMetadata({
  title: "Bespoke Mirrors & Lighting Commissions",
  shareTitle: "Bespoke & Commissions",
  description,
  path: "/bespoke",
});

export default function BespokeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Bespoke mirror and lighting commissions",
            description:
              "Bespoke mirrors, lighting, and architectural copper and glass work, designed and made by hand in East London for private clients, interior designers, and architects. Each commission is led by master craftsman Anthony McCarty.",
            path: "/bespoke",
          }),
          breadcrumbSchema([{ name: "Bespoke", path: "/bespoke" }]),
        ]}
      />
      {children}
    </>
  );
}
