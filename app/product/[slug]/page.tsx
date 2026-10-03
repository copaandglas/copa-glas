import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/JsonLd";
import { getProduct, productSlugs } from "@/app/lib/products";
import { breadcrumbSchema, productSchema } from "@/app/lib/schema";
import ProductView from "./ProductView";

type Props = { params: Promise<{ slug: string }> };

// Only the pieces in the collection exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const { title, description, ogImage } = product.seo;

  return {
    title,
    description,
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      type: "website",
      siteName: "Copa + Glas",
      locale: "en_GB",
      title: `${product.name} — Copa + Glas`,
      description,
      url: `/product/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 1200, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Collection", path: "/collection" },
            { name: product.collectionCategory.label, path: product.collectionCategory.href },
            { name: product.name, path: `/product/${slug}` },
          ]),
        ]}
      />
      <ProductView product={product} />
    </>
  );
}
