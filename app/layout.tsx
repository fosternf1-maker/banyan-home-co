import type { Metadata, Viewport } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { PageMotion } from "@/components/page-motion";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.documentTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [...site.keywords],
  openGraph: {
    title: site.documentTitle,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.documentTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1714",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full">
        <JsonLd />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <PageMotion />
        <SiteNav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
