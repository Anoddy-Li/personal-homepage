import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";

import { profile } from "@/config/profile";
import { getSiteUrl } from "@/lib/env";
import "./globals.css";

const bodyFont = Noto_Sans_SC({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  fallback: ["PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "sans-serif"],
});

const headingFont = Noto_Serif_SC({
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  fallback: ["Songti SC", "STSong", "Source Han Serif SC", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: profile.siteTitle,
    template: `%s | ${profile.name}`,
  },
  description: profile.siteDescription,
  openGraph: {
    description: profile.siteDescription,
    locale: profile.locale,
    siteName: profile.siteTitle,
    title: profile.siteTitle,
    type: "website",
    url: getSiteUrl(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={profile.locale}
      className={`${bodyFont.variable} ${headingFont.variable} h-full bg-background antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
