import JsonLd from "@/app/components/JsonLd";
import { allFaqs } from "@/app/lib/faqs";
import { pageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/app/lib/schema";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  shareTitle: "Questions",
  description:
    "Notes for collectors and clients of Copa + Glas — prices, dimensions, limited editions, commissions, delivery, and the care of copper and glass.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[faqSchema(allFaqs), breadcrumbSchema([{ name: "Questions", path: "/faq" }])]} />
      {children}
    </>
  );
}
