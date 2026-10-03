import { CONTACT } from "@/app/lib/site";
import { products, productsInCategory } from "@/app/lib/products";

export interface Faq {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

export interface FaqSection {
  title: string;
  faqs: Faq[];
}

function list(items: string[]): string {
  if (items.length <= 2) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

const gbp = (value: number) => `£${value.toLocaleString("en-GB")}`;
const named = (name: string) => (name.startsWith("The ") ? `the ${name.slice(4)}` : `the ${name}`);

// Prices, sizes, and edition names are read from the product data so these
// answers cannot drift from the product pages.
const priced = products
  .filter((p) => p.priceGBP !== undefined)
  .sort((a, b) => a.priceGBP! - b.priceGBP!);
const mirrors = productsInCategory("/mirrors");
const editions = productsInCategory("/limited-editions");

export const faqSections: FaqSection[] = [
  {
    title: "The Studio",
    faqs: [
      {
        question: "What is Copa + Glas?",
        answer:
          "Copa + Glas is an East London design studio making mirrors and lighting by hand in solid copper and hand-cut glass. It was founded in 2021 by master craftsman Anthony McCarty and creative director Bradley McWhinney. Nothing is made in advance; each piece is made for the client who commissions it.",
        link: { href: "/about", label: "About the studio" },
      },
      {
        question: "Where are Copa + Glas pieces made?",
        answer:
          "Every piece is made by hand in our East London workshop. Nothing is produced in volume or held in stock.",
      },
      {
        question: "Who makes the work?",
        answer:
          "Each piece is made under the direction of Anthony McCarty, our co-founder and Master Craftsman, who has worked in architectural copper and glass since 1980. His past commissions include conservation work on Big Ben, restoration at the Natural History Museum, and more than one thousand handmade copper and glass screens for the lightwell at Hotel Café Royal on Regent Street.",
        link: { href: "/archive", label: "The archive" },
      },
      {
        question: "What is the technique behind the work?",
        answer:
          "Each piece is composed of hand-cut glass panes held within a framework of slim, solid copper sections. The method was introduced by the Luxfer Prism Company in 1897 and later developed by Frank Lloyd Wright in his Prairie Style art glass windows. Copa + Glas carries the same technique forward in hand-cut and ground mirrored glass.",
        link: { href: "/origins", label: "Origins" },
      },
    ],
  },
  {
    title: "The Works",
    faqs: [
      {
        question: "What is the price of a Copa + Glas mirror?",
        answer: `The mirrors of the collection are priced from ${gbp(priced[0].priceGBP!)}: ${list(
          priced.map((p) => `${named(p.name)} at ${gbp(p.priceGBP!)}`),
        )}, inclusive of VAT. Limited editions, the Aura Wall Light, and commissioned works are priced on request. Delivery is quoted individually.`,
        link: { href: "/mirrors", label: "The mirrors" },
      },
      {
        question: "What are the dimensions of the mirrors?",
        answer: `${list(
          mirrors.map((p) => `${named(p.name)} is ${p.dimensions.cm.replace("cm Diameter", "cm in diameter")}`),
        ).replace(/^t/, "T")}. Any piece may be rescaled or reconfigured as a commission.`,
      },
      {
        question: "How are the limited editions produced and authenticated?",
        answer: `Each edition is limited to ten works worldwide. Every work is individually numbered, signed by our Master Craftsman, and accompanied by a certificate of authenticity on cotton rag paper and a copper provenance plate fixed to the backing board. Once an edition is complete it is not remade. The present editions are ${list(
          editions.map((p) => named(p.name)),
        )}.`,
        link: { href: "/limited-editions", label: "The limited editions" },
      },
      {
        question: "Is each piece unique?",
        answer:
          "In its detail, yes. The glass is cut and ground by hand and the copper formed by hand, so each piece carries slight variation in tone and surface. Where iridescent or art glass is used, every panel is unique, and no two works are identical in colour or in the way they hold light. We regard this as a mark of authenticity.",
      },
    ],
  },
  {
    title: "Commissioning",
    faqs: [
      {
        question: "How is a piece acquired?",
        answer: `Every acquisition begins with a conversation. Enquiries may be made from the page of any piece, through the contact page, or by writing to ${CONTACT.email}; each receives a personal reply, typically within two working days. A deposit of 50% confirms the commission and the making begins. The balance is due on completion, before the piece leaves the studio.`,
        link: { href: "/contact", label: "Contact the studio" },
      },
      {
        question: "How long does a piece take to make?",
        answer:
          "Pieces from the collection take six to eight weeks from confirmation and receipt of deposit. Bespoke commissions, architectural projects, and limited editions may take longer; a lead time is confirmed at the outset.",
      },
      {
        question: "Does the studio undertake bespoke commissions?",
        answer:
          "Yes. Any piece may be scaled, finished, or wholly reconceived in copper and hand-cut glass. A commission begins with a conversation about the space and its light; material samples and drawings are then prepared for approval, and the work is made by hand in our East London workshop. We work with private clients, interior designers, and architects.",
        link: { href: "/bespoke", label: "Bespoke" },
      },
    ],
  },
  {
    title: "Delivery & Installation",
    faqs: [
      {
        question: "How are pieces delivered and installed?",
        answer:
          "Within the United Kingdom, every piece is delivered and installed by our own specialist team, on a date arranged directly with you, Monday to Friday.",
      },
      {
        question: "Does the studio deliver internationally?",
        answer:
          "Yes. Works are dispatched from East London in protective packaging, with specialist handling to the address you specify. Installation arrangements vary by country and are confirmed at the point of enquiry. Local import duties and taxes are not included in listed prices and rest with the client.",
      },
      {
        question: "Can a piece be returned?",
        answer:
          "As each piece is made for the client who commissions it, we are unable to accept the return of a work that is no longer wanted. Should a piece arrive damaged or prove defective, it will be repaired or replaced at no cost, provided we are told within 48 hours of delivery.",
        link: { href: "/terms", label: "Terms of sale" },
      },
    ],
  },
  {
    title: "Care",
    faqs: [
      {
        question: "Is a piece suitable for a bathroom, or for outdoors?",
        answer:
          "No. The work is made for dry interiors only. It should not be placed outdoors, in bathrooms or wet rooms, or against a damp wall: humidity and condensation will in time damage the copper, the glass backing, and the silvering.",
      },
      {
        question: "How should a piece be cared for?",
        answer:
          "With a dry cloth, and nothing else. Chemical cleaners, glass sprays, liquids, and metal polishes should never be used. Copper is a living material and will develop its own patina over time; we consider this part of the character of the work.",
      },
    ],
  },
  {
    title: "Trade",
    faqs: [
      {
        question: "Does the studio work with interior designers and architects?",
        answer:
          "Yes. A small trade programme offers registered interior designers, architects, and hospitality practices preferential terms, a named contact at the studio, bespoke specification support, a full image library, and ex-VAT invoicing. There is no minimum order. Each application is reviewed personally and answered within two working days.",
        link: { href: "/trade-specification", label: "Trade & Specification" },
      },
    ],
  },
];

export const allFaqs: Faq[] = faqSections.flatMap((section) => section.faqs);
