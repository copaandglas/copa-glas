import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema } from "@/app/lib/schema";

export const metadata = pageMetadata({
  title: "Terms of Sale",
  shareTitle: "Terms of Sale",
  description:
    "Terms of sale for Copa + Glas handmade mirrors, lighting, and bespoke commissions. Lead times, payment, delivery, inspection, and returns.",
  path: "/terms",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Terms of Sale", path: "/terms" }])} />
      {children}
    </>
  );
}
