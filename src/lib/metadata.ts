import type { Metadata } from "next";

import { profile } from "@/config/profile";
import { getSiteUrl } from "@/lib/env";

export function buildMetadata({
  description,
  noIndex = false,
  path = "/",
  title,
}: {
  description: string;
  noIndex?: boolean;
  path?: string;
  title: string;
}): Metadata {
  const url = new URL(path, getSiteUrl()).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      locale: profile.locale,
      siteName: profile.siteTitle,
      type: "website",
      url,
    },
    robots: noIndex
      ? {
          follow: false,
          index: false,
        }
      : undefined,
    twitter: {
      card: "summary_large_image",
      description,
      title,
    },
  };
}
