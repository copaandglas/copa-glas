import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema } from "@/app/lib/schema";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  shareTitle: "Privacy Policy",
  description: "Privacy Policy for Copa + Glas Studio — how we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }])} />
      {children}
    </>
  );
}
