import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema } from "@/app/lib/schema";

export const metadata = pageMetadata({
  title: "The Private List",
  shareTitle: "The Private List",
  description:
    "New Copa + Glas editions are offered to the private list before they are announced, each limited to ten. Join for first offer and visits to the East London workshop.",
  path: "/private-list",
});

export default function PrivateListLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Private list", path: "/private-list" }])} />
      {children}
    </>
  );
}
