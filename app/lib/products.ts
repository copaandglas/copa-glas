export interface ProductImage {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
  bg?: string;
}

export interface ProductData {
  slug: string;
  designer: string;
  name: string;
  size: string;
  tagline: string;
  description: string;
  provenance: string;
  material: string;
  dimensions: { cm: string; inches: string };
  finish: string;
  leadTime: string;
  price: string;
  /** Listed price in GBP, tax included. Omitted for pieces priced on request. */
  priceGBP?: number;
  images: ProductImage[];
  collectionCategory: { href: string; label: string };
  seo: { title: string; description: string; ogImage: string };
}

export const products: ProductData[] = [
  {
    slug: "rotation-mirror",
    designer: "Copa + Glas Studio",
    name: "Rotation Mirror",
    size: "",
    tagline: "Twenty-six hand-cut facets set in solid copper.",
    description: `The Rotation mirror is a foundational piece for the studio, exploring the tension between rigid geometry and fragmented light. Comprising twenty-six hand-cut glass facets, each pane is meticulously set within a slender frame of solid, hand-formed copper.

The result is a subtle, shifting perspective, a refractive depth that intensifies as one moves through the space. It is a piece designed not just to reflect an interior, but to articulate the light within it.`,
    provenance: `Hand-formed in our East London workshop, the Rotation series has been commissioned for architectural environments of note, including the Burberry flagship on Regent Street.`,
    material: "Solid copper; hand-cut silvered glass",
    dimensions: { cm: "97cm Diameter", inches: "38.2in Diameter" },
    finish: "Copper hand-finished in the studio",
    leadTime: "6–8 weeks",
    price: "£6,000.00",
    priceGBP: 6000,
    images: [
      { src: "/rotation-mirror.png", alt: "Rotation Mirror — a round mirror of twenty-six hand-cut glass facets set in solid copper" },
      { src: "/rotation-mirror-close-1.png", alt: "Rotation Mirror, detail of the hand-cut glass facets and copper sections" },
      { src: "/rotation-mirror-close-2.png", alt: "Rotation Mirror, close view of the hand-formed copper frame" },
    ],
    collectionCategory: { href: "/mirrors", label: "Mirrors" },
    seo: {
      title: "Rotation Mirror: Round Copper & Glass Mirror",
      description: "Twenty-six hand-cut glass facets set within solid, hand-formed copper — 97cm diameter. Made to order in our East London workshop. From £6,000.",
      ogImage: "/og-rotation-mirror.jpg",
    },
  },
  {
    slug: "mondrian-mirror",
    designer: "Copa + Glas Studio",
    name: "The Mondrian Mirror",
    size: "",
    tagline: "A composition of rectilinear panes, held in a grid of hand-formed copper.",
    description: `The Mondrian mirror is a tall vertical composition of hand-cut silvered glass divided by a slender grid of solid, hand-formed copper, an homage to rectilinear abstraction, brought into three dimensions for the wall.

Each pane sits within its own frame; the interplay of line and reflection reads differently from every angle in the room.`,
    provenance: `Made to order in our East London workshop, where each joint is formed and fitted by hand.`,
    material: "Solid copper; hand-cut silvered glass",
    dimensions: { cm: "69.5 × 100.5cm", inches: "27.4 × 39.6in" },
    finish: "Copper hand-finished in the studio",
    leadTime: "6–8 weeks",
    price: "£8,500.00",
    priceGBP: 8500,
    images: [
      { src: "/mondrian-mirror.png", alt: "The Mondrian Mirror — hand-cut silvered glass panes divided by a grid of solid copper" },
      { src: "/Mondrianclose.jpg", alt: "The Mondrian Mirror, detail of the copper grid and silvered glass panes" },
      { src: "/mondrianclose2.jpg", alt: "The Mondrian Mirror, close view of a hand-formed copper joint" },
    ],
    collectionCategory: { href: "/mirrors", label: "Mirrors" },
    seo: {
      title: "The Mondrian Mirror: Copper & Glass Grid Mirror",
      description: "A tall vertical composition of hand-cut silvered glass divided by a slender grid of solid, hand-formed copper. 69.5 × 100.5cm. From £8,500.",
      ogImage: "/og-mondrian-mirror.jpg",
    },
  },
  {
    slug: "fibonacci-mirror",
    designer: "Copa + Glas Studio",
    name: "Fibonacci Mirror",
    size: "",
    tagline: "A spiralling study in proportion, drawn from nature's own geometry.",
    description: `The Fibonacci mirror explores proportion through nested squares, a spiralling geometry drawn from the golden ratio, resolved in hand-cut silvered glass and slender lines of solid, hand-formed copper.

Each panel catches light differently, so the composition shifts subtly as you move through the room.`,
    provenance: `Made to order in our East London workshop, where each joint is cut by hand.`,
    material: "Solid copper; hand-cut silvered glass",
    dimensions: { cm: "65 × 90cm", inches: "25.6 × 35.4in" },
    finish: "Copper hand-finished in the studio",
    leadTime: "6–8 weeks",
    price: "£5,500.00",
    priceGBP: 5500,
    images: [
      { src: "/fibonacci-mirror-mantel.png", alt: "Fibonacci Mirror — nested squares of hand-cut silvered glass and solid copper, shown above a mantel" },
      { src: "/fibonacciclose1.jpg", alt: "Fibonacci Mirror, detail of the nested glass panels and copper lines" },
      { src: "/Fibonacciclose2.jpg", alt: "Fibonacci Mirror, close view of the hand-cut copper joints" },
    ],
    collectionCategory: { href: "/mirrors", label: "Mirrors" },
    seo: {
      title: "Fibonacci Mirror: Golden Ratio Copper & Glass Mirror",
      description: "Nested squares drawn from the golden ratio, resolved in hand-cut silvered glass and slender lines of solid copper. 65 × 90cm. From £5,500.",
      ogImage: "/og-fibonacci-mirror.jpg",
    },
  },
  {
    slug: "frank-lloyd-wright-mirror",
    designer: "Copa + Glas Studio",
    name: "The Frank Lloyd Wright Mirror",
    size: "",
    tagline: "An architectural homage, prairie geometries in silvered glass and copper.",
    description: `A tall vertical mirror in the spirit of Prairie School geometry, a disciplined grid of hand-formed copper holds clear silvered glass alongside panels of coloured and iridescent art glass, with a broad central field for the room to settle into.

Commissioned feeling, architectural scale, and craft detail in a single piece.`,
    provenance: `Limited to ten pieces worldwide. Each mirror is assembled and finished by hand in our East London workshop.`,
    material: "Solid copper; hand-cut silvered and art glass",
    dimensions: { cm: "31.5 × 91cm", inches: "12.4 × 35.8in" },
    finish: "Copper hand-finished in the studio",
    leadTime: "6–8 weeks",
    price: "Price on request",
    images: [
      { src: "/frank-lloyd-wright-mirror-main.jpg", alt: "The Frank Lloyd Wright Mirror — a tall Prairie School grid of copper, silvered glass and art glass", objectFit: "contain" },
      { src: "/frank-lloyd-wright-mirror.png", alt: "The Frank Lloyd Wright Mirror, view of the copper grid and coloured art glass panels" },
      { src: "/frank-lloyd-wright-plate.jpg", alt: "Copper provenance plate engraved Copa + Glas, Frank Lloyd Wright Mirror, Edition 1 of 10" },
    ],
    collectionCategory: { href: "/limited-editions", label: "Limited Editions" },
    seo: {
      title: "The Frank Lloyd Wright Mirror: Limited Edition of 10",
      description: "A Prairie School-inspired grid of hand-formed copper holding silvered and iridescent art glass. Limited to 10 worldwide. Price on request.",
      ogImage: "/og-frank-lloyd-wright-mirror.jpg",
    },
  },
  {
    slug: "rotation-confetti-mirror",
    designer: "Copa + Glas Studio",
    name: "The Rotation Confetti Mirror",
    size: "",
    tagline: "A celebratory reimagining of the Rotation, scattered, refracted colour.",
    description: `A celebratory reimagining of the Rotation, twenty-six hand-cut glass facets, set within solid, hand-formed copper, with refracted colour.

Assembled and finished to order in our East London workshop.`,
    provenance: `Limited to ten pieces worldwide. Each mirror is finished by hand in our East London workshop.`,
    material: "Solid copper; hand-cut silvered and art glass",
    dimensions: { cm: "97cm Diameter", inches: "38.2in Diameter" },
    finish: "Copper hand-finished in the studio",
    leadTime: "6–8 weeks",
    price: "Price on request",
    images: [
      { src: "/rotation-confetti-mirror.png", alt: "The Rotation Confetti Mirror — a round copper mirror with facets of silvered and coloured art glass" },
      { src: "/mirror-thumbnail.png", alt: "The Rotation Confetti Mirror, detail of an iridescent art glass facet set in copper" },
      { src: "/rotation-confetti-plaque.jpg", alt: "Copper provenance plate engraved Copa + Glas, Rotation Confetti Mirror, Edition 1 of 10" },
    ],
    collectionCategory: { href: "/limited-editions", label: "Limited Editions" },
    seo: {
      title: "The Rotation Confetti Mirror: Limited Edition of 10",
      description: "A celebratory reimagining of the Rotation — twenty-six hand-cut glass facets in refracted colour, set in solid copper. Limited to 10 worldwide. Price on request.",
      ogImage: "/og-rotation-confetti-mirror.jpg",
    },
  },
  {
    slug: "aura-wall-light",
    designer: "Copa + Glas Studio",
    name: "Aura Wall Light",
    size: "",
    tagline: "A customisable object — copper and glass configured for the room it will inhabit.",
    description: `The Aura wall light is a composition of hand-formed copper and hand-finished glass, drawn into the glow of a room. Scale, proportion, glass finish, and colour are shaped to the space it lives in.

The piece shown was made for a private commission: a solid copper frame with tinted glass, 50 × 65cm. At its centre, a single pane of vibrant coloured art glass, beautifully harmonious with the brushed copper frame. Each Aura is made once, to the room it belongs in.

Each Aura is a bespoke object — scale, finish, and configuration are resolved in conversation with the studio.`,
    provenance: `Made to order in our East London workshop, each Aura is assembled and finished by hand before leaving the studio.`,
    material: "Solid copper frame; hand-finished glass",
    dimensions: { cm: "50 × 65cm (piece shown)", inches: "19.7 × 25.6in (piece shown)" },
    finish: "Copper hand-finished in the studio. Glass specified to commission.",
    leadTime: "Made to order",
    price: "Price on application",
    images: [
      { src: "/aura-wall-light.png", alt: "Aura Wall Light — a copper-framed wall light with a central pane of amber art glass, lit above a console table" },
    ],
    collectionCategory: { href: "/lighting", label: "Lighting" },
    seo: {
      title: "Aura Wall Light: Bespoke Copper & Glass Sconce",
      description: "A bespoke copper and glass wall light made to your commission — scale, finish, and configuration resolved in conversation with the studio.",
      ogImage: "/og-aura-wall-light.jpg",
    },
  },
  {
    slug: "three-geishas",
    designer: "Lucy Williams",
    name: "Three Geishas",
    size: "",
    tagline: "A collaboration with artist Lucy Williams in copper, Welsh slate, and a limited-edition photographic print.",
    description: `A collaborative piece, created in partnership with the incredibly talented artist Lucy Williams.

Lucy uses a unique photographic print process, producing limited-edition works with subtle, nostalgic imagery through naturally occurring bleeds and chemical reactions.

In place of traditional mirror and art glass, we worked with Welsh slate. Lucy has Welsh heritage; her parents were from Wales, and the slate symbolises that connection for her. The result is a beautifully distinctive and characterful piece.`,
    provenance: `In collaboration with Lucy Williams. Features a limited-edition photographic print and is assembled and finished by hand in our East London workshop.`,
    material: "Solid copper; Welsh slate; limited-edition photographic print",
    dimensions: { cm: "41 × 45.5cm", inches: "16.1 × 17.9in" },
    finish: "Copper hand-finished in the studio",
    leadTime: "Made to order",
    price: "POA",
    images: [
      { src: "/copaxlucywilliams.jpg", alt: "Three Geishas — a Lucy Williams photographic print framed in solid copper and Welsh slate, on the workshop bench" },
    ],
    collectionCategory: { href: "/collaborative", label: "Collaborations" },
    seo: {
      title: "Three Geishas, a Collaboration with Lucy Williams",
      description: "A collaborative piece with artist Lucy Williams — solid copper, Welsh slate, and a limited-edition photographic print. Made to order.",
      ogImage: "/og-three-geishas.jpg",
    },
  },
];

export const productSlugs = products.map((p) => p.slug);

export function getProduct(slug: string | undefined): ProductData | null {
  return products.find((p) => p.slug === slug) ?? null;
}

export function productsInCategory(href: string): ProductData[] {
  return products.filter((p) => p.collectionCategory.href === href);
}
