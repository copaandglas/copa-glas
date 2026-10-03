import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Applies to every crawler, including AI and answer-engine crawlers
        // (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended).
        // /configure is kept out of search by its noindex tag, which crawlers
        // can only see if they are allowed to fetch the page.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
