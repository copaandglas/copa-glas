import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/configure/", "/api/"],
      },
    ],
    sitemap: "https://www.copaandglas.com/sitemap.xml",
    host: "https://www.copaandglas.com",
  };
}
