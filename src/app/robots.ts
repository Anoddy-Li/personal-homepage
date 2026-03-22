import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    host: siteUrl,
    rules: [
      {
        allow: "/",
        userAgent: "*",
      },
      {
        disallow: ["/admin", "/login", "/api"],
        userAgent: "*",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
