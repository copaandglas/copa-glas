import { CONTACT, SITE_NAME, SITE_URL, absoluteUrl } from "@/app/lib/site";
import type { ProductData } from "@/app/lib/products";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const ANTHONY_ID = `${SITE_URL}/about#anthony-mccarty`;
const BRADLEY_ID = `${SITE_URL}/about#bradley-mcwhinney`;

const anthony = {
  "@type": "Person",
  "@id": ANTHONY_ID,
  name: "Anthony McCarty",
  jobTitle: "Co-founder and Master Craftsman",
  description:
    "Master craftsman working in architectural copper and glass since 1980. Past commissions include conservation work on Big Ben, the Natural History Museum, and the lightwell at Hotel Café Royal, London.",
  worksFor: { "@id": ORG_ID },
  knowsAbout: ["Architectural glazing", "Stained glass", "Copper-section glazing", "Glass restoration"],
};

const bradley = {
  "@type": "Person",
  "@id": BRADLEY_ID,
  name: "Bradley McWhinney",
  jobTitle: "Co-founder and Creative Director",
  worksFor: { "@id": ORG_ID },
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: ["Copa + Glas Studio", "Copa and Glas", "Copa & Glas"],
    url: SITE_URL,
    logo: absoluteUrl("/copa-monogram-black.png"),
    image: absoluteUrl("/og-image.jpg"),
    description:
      "Copa + Glas is an East London design studio making handcrafted mirrors and lighting in solid copper and hand-cut glass. Every piece is made to order by hand, using a copper-section glazing technique first developed by the Luxfer Prism Company in 1897.",
    slogan: "Hand cut glass. Hand formed copper. Made to order.",
    foundingDate: "2021",
    founder: [anthony, bradley],
    email: CONTACT.email,
    telephone: CONTACT.telephone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "England",
      addressCountry: "GB",
    },
    areaServed: "Worldwide",
    sameAs: [CONTACT.instagram],
    knowsAbout: [
      "Handcrafted mirrors",
      "Copper and glass lighting",
      "Bespoke mirror commissions",
      "Architectural glazing",
      "Copper-section glazing",
      "Luxfer prism glass",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT.email,
      telephone: CONTACT.telephone,
      availableLanguage: "English",
      areaServed: "Worldwide",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: "Copa + Glas Studio",
    url: SITE_URL,
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function webPageSchema({
  type = "WebPage",
  path,
  name,
  description,
  extra,
}: {
  type?: string;
  path: string;
  name: string;
  description: string;
  extra?: Record<string, unknown>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-GB",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...extra,
  };
}

export function productSchema(product: ProductData) {
  const url = absoluteUrl(`/product/${product.slug}`);
  const limitedEdition = product.collectionCategory.href === "/limited-editions";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description.replace(/\n\n/g, " "),
    url,
    image: product.images.map((img) => absoluteUrl(img.src)),
    category: product.collectionCategory.label,
    material: product.material,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    countryOfOrigin: { "@type": "Country", name: "United Kingdom" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Dimensions", value: `${product.dimensions.cm} (${product.dimensions.inches})` },
      { "@type": "PropertyValue", name: "Finish", value: product.finish },
      { "@type": "PropertyValue", name: "Lead time", value: product.leadTime },
      { "@type": "PropertyValue", name: "Designer", value: product.designer },
      { "@type": "PropertyValue", name: "Made in", value: "East London, England" },
      ...(limitedEdition
        ? [{ "@type": "PropertyValue", name: "Edition", value: "Limited to ten worldwide, numbered and certificated" }]
        : []),
    ],
    // Pieces priced on request carry no Offer: an Offer without a price is invalid.
    ...(product.priceGBP !== undefined && {
      offers: {
        "@type": "Offer",
        url,
        price: product.priceGBP.toFixed(2),
        priceCurrency: "GBP",
        availability: "https://schema.org/MadeToOrder",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": ORG_ID },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: product.priceGBP.toFixed(2),
          priceCurrency: "GBP",
          valueAddedTaxIncluded: true,
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "GB",
          returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
          merchantReturnLink: absoluteUrl("/terms#returns"),
        },
      },
    }),
  };
}

export function itemListSchema(name: string, items: ProductData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: product.name,
      url: absoluteUrl(`/product/${product.slug}`),
      image: absoluteUrl(product.images[0].src),
    })),
  };
}

export function serviceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
