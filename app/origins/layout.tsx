import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/app/lib/schema";

const description =
  "The story behind Copa + Glas — a glazing tradition rooted in the Luxfer Prism Company of 1897 and the copper-section technique transformed by Frank Lloyd Wright.";

export const metadata = pageMetadata({
  title: "Origins: Luxfer Prism Glazing & Frank Lloyd Wright",
  shareTitle: "Origins",
  description,
  path: "/origins",
  image: { url: "/og-origins.jpg", width: 1200, height: 1200, alt: "The Luxfer Prism Company door, 16 — the glazing tradition behind Copa + Glas" },
});

export default function OriginsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/origins",
            name: "Origins: the glazing tradition behind Copa + Glas",
            description,
            extra: {
              mentions: [
                { "@type": "Organization", name: "Luxfer Prism Company", foundingDate: "1897" },
                { "@type": "Person", name: "Frank Lloyd Wright", sameAs: "https://en.wikipedia.org/wiki/Frank_Lloyd_Wright" },
              ],
            },
          }),
          breadcrumbSchema([{ name: "Origins", path: "/origins" }]),
        ]}
      />
      {children}
    </>
  );
}
