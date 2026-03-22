import type { MetadataRoute } from "next";

import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { getSiteUrl, isSupabaseConfigured } from "@/lib/env";
import { createSupabasePublicClient } from "@/lib/supabase/public";

const staticRoutes = ["", "/about", "/contact", "/study-log"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    changeFrequency: route === "" ? "weekly" : "monthly",
    lastModified: new Date(),
    priority: route === "" ? 1 : route === "/study-log" ? 0.9 : 0.7,
    url: `${baseUrl}${route}`,
  }));

  if (!isSupabaseConfigured()) {
    return entries;
  }

  const repo = createSupabaseStudyLogRepository(createSupabasePublicClient());
  const logs = await repo.listPublic({});

  return [
    ...entries,
    ...logs.map((log) => ({
      changeFrequency: "weekly" as const,
      lastModified: new Date(log.updatedAt),
      priority: 0.8,
      url: `${baseUrl}/study-log/${log.slug}`,
    })),
  ];
}
