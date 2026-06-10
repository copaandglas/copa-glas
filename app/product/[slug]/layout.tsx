import type { Metadata } from "next";

const productMeta: Record<string, { title: string; description: string; ogImage: string }> = {
  "rotation-mirror": {
    title: "Rotation Mirror",
    description: "Twenty-six hand-cut glass facets set within solid, hand-formed copper — 97cm diameter. Made to order in our East London workshop. From £6,000.",
    ogImage: "/og-rotation-mirror.jpg",
  },
  "mondrian-mirror": {
    title: "The Mondrian Mirror",
    description: "A tall vertical composition of hand-cut silvered glass divided by a slender grid of solid, hand-formed copper. 69.5 × 100.5cm. From £8,500.",
    ogImage: "/og-mondrian-mirror.jpg",
  },
  "fibonacci-mirror": {
    title: "Fibonacci Mirror",
    description: "Nested rectangles drawn from the golden ratio, resolved in hand-cut silvered glass and slender lines of solid copper. 65 × 90cm. From £5,500.",
    ogImage: "/og-fibonacci-mirror.jpg",
  },
  "frank-lloyd-wright-mirror": {
    title: "The Frank Lloyd Wright Mirror",
    description: "A Prairie School-inspired grid of hand-formed copper holding silvered and iridescent art glass. Limited to 10 worldwide. Price on request.",
    ogImage: "/og-frank-lloyd-wright-mirror.jpg",
  },
  "rotation-confetti-mirror": {
    title: "The Rotation Confetti Mirror",
    description: "A celebratory reimagining of the Rotation — twenty-six hand-cut glass facets in refracted colour, set in solid copper. Limited to 10 worldwide. Price on request.",
    ogImage: "/og-rotation-confetti-mirror.jpg",
  },
  "aura-wall-light": {
    title: "Aura Wall Light",
    description: "A bespoke copper and glass wall light made to your commission — scale, finish, and configuration resolved in conversation with the studio.",
    ogImage: "/og-aura-wall-light.jpg",
  },
  "three-geishas": {
    title: "Three Geishas",
    description: "A collaborative piece with artist Lucy Williams — solid copper, Welsh slate, and photographic print. Made to order.",
    ogImage: "/og-three-geishas.jpg",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = productMeta[slug];
  if (!meta) return {};

  const ogImageEntry = { url: meta.ogImage, width: 1200, height: 1200, alt: meta.title };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      type: "website",
      siteName: "Copa + Glas",
      locale: "en_GB",
      title: `${meta.title} — Copa + Glas`,
      description: meta.description,
      url: `/product/${slug}`,
      images: [ogImageEntry],
    },
    twitter: {
      card: "summary_large_image",
      site: "@copaandglas",
      title: `${meta.title} — Copa + Glas`,
      description: meta.description,
      images: [meta.ogImage],
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
