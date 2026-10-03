import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/app/lib/schema";

const description =
  "The Copa + Glas trade programme for interior designers, architects, and hospitality practices — preferential pricing, a named studio contact, and bespoke specification support.";

export const metadata = pageMetadata({
  title: "Trade Programme for Designers & Architects",
  shareTitle: "Trade & Specification",
  description,
  path: "/trade-specification",
});

export default function TradeSpecificationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: "Copa + Glas trade and specification programme", description, path: "/trade-specification" }),
          breadcrumbSchema([{ name: "Trade & Specification", path: "/trade-specification" }]),
        ]}
      />
      {children}
    </>
  );
}
