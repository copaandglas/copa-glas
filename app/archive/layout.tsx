import JsonLd from "@/app/components/JsonLd";
import { pageMetadata } from "@/app/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/app/lib/schema";

const description =
  "A visual record of four decades of making — Big Ben, the Natural History Museum, Hotel Café Royal — and the workshop of master craftsman Anthony McCarty.";

export const metadata = pageMetadata({
  title: "Archive: Four Decades of Architectural Glass",
  shareTitle: "Archive",
  description,
  path: "/archive",
  image: { url: "/og-archive.jpg", width: 1200, height: 1200, alt: "Anthony on the face of Big Ben — Copa + Glas" },
});

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", path: "/archive", name: "The Copa + Glas Archive", description }),
          breadcrumbSchema([{ name: "Archive", path: "/archive" }]),
        ]}
      />
      {children}
    </>
  );
}
