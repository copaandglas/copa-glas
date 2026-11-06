import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema } from "@/app/lib/schema";

export const metadata = pageMetadata({
  title: "The Private List",
  shareTitle: "The Private List",
  description:
    "Members of the Copa + Glas private list hear of new editions before they are announced. Each edition is limited to ten, and made by hand in our East London workshop.",
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
