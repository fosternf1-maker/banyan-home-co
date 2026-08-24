import type { Metadata, Viewport } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
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
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "Banyan Home Co",
    "Tampa home management",
    "home maintenance membership",
    "Hyde Park",
    "Palma Ceia",
    "South Tampa",
    "Davis Islands",
    "Bayshore",
  ],
  openGraph: {
    title: site.name,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
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
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <PageMotion />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
