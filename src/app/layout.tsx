import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";

import { profile } from "@/config/profile";
import { getSiteUrl } from "@/lib/env";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Newsreader({
  variable: "--font-heading",
  subsets: ["latin"],
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
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
