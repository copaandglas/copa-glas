import type { MetadataRoute } from "next";

const BASE = "https://copaandglas.com";

const productSlugs = [
  "rotation-mirror",
  "mondrian-mirror",
  "fibonacci-mirror",
  "frank-lloyd-wright-mirror",
  "rotation-confetti-mirror",
  "aura-wall-light",
  "three-geishas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/collection`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/mirrors`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/lighting`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/limited-editions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/collaborative`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/bespoke`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/origins`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/archive`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/trade-specification`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE}/product/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
