import { faqSections } from "@/app/lib/faqs";
import { products } from "@/app/lib/products";
import { CONTACT, SITE_URL, absoluteUrl } from "@/app/lib/site";

export const dynamic = "force-static";

// A plain-text summary of the studio for AI assistants and answer engines,
// following the llms.txt convention (https://llmstxt.org).
export function GET() {
  const pieces = products
    .map(
      (p) =>
        `- [${p.name}](${absoluteUrl(`/product/${p.slug}`)}): ${p.tagline} Category: ${p.collectionCategory.label}. Materials: ${p.material}. Dimensions: ${p.dimensions.cm}. Price: ${p.price}${p.priceGBP !== undefined ? " including VAT" : ""}. Lead time: ${p.leadTime}.`,
    )
    .join("\n");

  const faqs = faqSections
    .flatMap((section) => section.faqs)
    .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
    .join("\n\n");

  const body = `# Copa + Glas

> Copa + Glas is an East London design studio making handcrafted mirrors and lighting in solid copper and hand-cut glass. Founded in 2021 by master craftsman Anthony McCarty and creative director Bradley McWhinney, the studio makes every piece to order, by hand, using a copper-section glazing technique introduced by the Luxfer Prism Company in 1897 and later developed by Frank Lloyd Wright.

Key facts:

- Studio: Copa + Glas (also written Copa + Glas Studio, Copa and Glas), East London, England. Founded 2021.
- Founders: Anthony McCarty (Master Craftsman, working in architectural copper and glass since 1980) and Bradley McWhinney (Creative Director).
- What it makes: mirrors, wall lights, limited editions of ten, artist collaborations, and bespoke and architectural commissions.
- Materials: solid, hand-formed copper; hand-cut silvered glass; art glass.
- Ordering: by enquiry. 50% deposit to confirm, balance on completion. Standard lead time 6 to 8 weeks.
- Delivery: UK delivery includes installation; international shipping is available.
- Contact: ${CONTACT.email}, ${CONTACT.telephoneDisplay}. Instagram: ${CONTACT.instagram}

## Collection

${pieces}

## Pages

- [Collection](${absoluteUrl("/collection")}): Mirrors, lighting, and limited editions.
- [Mirrors](${absoluteUrl("/mirrors")}): The Rotation, Mondrian, and Fibonacci mirrors.
- [Lighting](${absoluteUrl("/lighting")}): The Aura Wall Light and sculptural lighting made to order.
- [Limited Editions](${absoluteUrl("/limited-editions")}): Works limited to ten worldwide, numbered and certificated.
- [Collaborations](${absoluteUrl("/collaborative")}): Pieces made in partnership with artists and designers.
- [Bespoke](${absoluteUrl("/bespoke")}): How to commission a bespoke mirror, light, or architectural installation.
- [Trade & Specification](${absoluteUrl("/trade-specification")}): The trade programme for interior designers, architects, and hospitality practices.
- [Origins](${absoluteUrl("/origins")}): The history of the technique, from the Luxfer Prism Company (1897) to Frank Lloyd Wright.
- [Archive](${absoluteUrl("/archive")}): Four decades of commissions, including Big Ben, the Natural History Museum, and Hotel Café Royal.
- [About](${absoluteUrl("/about")}): The studio and its founders.
- [Questions](${absoluteUrl("/faq")}): Prices, dimensions, editions, commissions, delivery, and care.
- [Terms of Sale](${absoluteUrl("/terms")}): Lead times, payment, delivery, returns, tolerances, and care.
- [Contact](${absoluteUrl("/contact")}): Enquiries and commissions.

## Questions and answers

${faqs}

## Optional

- [Privacy Policy](${absoluteUrl("/privacy")})
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
