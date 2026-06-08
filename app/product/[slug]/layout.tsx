import type { Metadata } from "next";

const productMeta: Record<string, { title: string; description: string; image: string; width: number; height: number }> = {
  "rotation-mirror": {
    title: "Rotation Mirror",
    description: "Twenty-six hand-cut glass facets set within solid, hand-formed copper — 97cm diameter. Made to order in our East London workshop. From £6,000.",
    image: "/rotation-mirror.png",
    width: 1024,
    height: 1024,
  },
  "mondrian-mirror": {
    title: "The Mondrian Mirror",
    description: "A tall vertical composition of hand-cut silvered glass divided by a slender grid of solid, hand-formed copper. 69.5 × 100.5cm. From £8,500.",
    image: "/mondrian-mirror.png",
    width: 768,
    height: 1024,
  },
  "fibonacci-mirror": {
    title: "Fibonacci Mirror",
    description: "Nested rectangles drawn from the golden ratio, resolved in hand-cut silvered glass and slender lines of solid copper. 65 × 90cm. From £5,500.",
    image: "/fibonacci-mirror-mantel.png",
    width: 827,
    height: 1024,
  },
  "frank-lloyd-wright-mirror": {
    title: "The Frank Lloyd Wright Mirror",
    description: "A Prairie School-inspired grid of hand-formed copper holding silvered and iridescent art glass. Limited to 10 worldwide. Price on request.",
    image: "/frank-lloyd-wright-mirror.png",
    width: 819,
    height: 1024,
  },
  "rotation-confetti-mirror": {
    title: "The Rotation Confetti Mirror",
    description: "A celebratory reimagining of the Rotation — twenty-six hand-cut glass facets in refracted colour, set in solid copper. Limited to 10 worldwide. Price on request.",
    image: "/rotation-confetti-mirror.png",
    width: 721,
    height: 1024,
  },
  "aura-wall-light": {
    title: "Aura Wall Light",
    description: "A bespoke copper and glass wall light made to your commission — scale, finish, and configuration resolved in conversation with the studio.",
    image: "/aura-wall-light.png",
    width: 741,
    height: 1024,
  },
  "three-geishas": {
    title: "Three Geishas",
    description: "A collaborative piece with artist Lucy Williams — solid copper, Welsh slate, and photographic print. Made to order.",
    image: "/copaxlucywilliams.jpg",
    width: 1200,
    height: 1600,
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

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} — Copa + Glas`,
      description: meta.description,
      url: `/product/${slug}`,
      images: [{ url: meta.image, width: meta.width, height: meta.height, alt: meta.title }],
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
