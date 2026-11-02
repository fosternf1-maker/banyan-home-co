import type { Metadata, Viewport } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import { BanyanMark } from "@/components/banyan-mark";
import { RailNav } from "@/components/rail-nav";
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
  title: {
    default: "Dispatch",
    template: "%s · Banyan field",
  },
  description:
    "Demo field record for Banyan Home Co. Fictional South Tampa houses, member visits, and equipment history.",
  robots: { index: false, follow: false },
  applicationName: "Banyan field",
};

export const viewport: Viewport = {
  themeColor: "#0E1714",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <div className="shell">
          <aside className="rail">
            <Link className="rail__brand" href="/">
              <BanyanMark className="rail__mark" title="Banyan Home Co." />
              <span>
                <span className="rail__name">Banyan</span>
                <span className="rail__co">Field record</span>
              </span>
            </Link>
            <RailNav />
            <p className="rail__fine">
              Demo only. Four fictional houses. No members, no payments, no live trades.
            </p>
          </aside>
          <div className="shell__main" id="content">
            {children}
            <footer className="colophon">
              <p>
                Dispatch, visits, and equipment history adapted from{" "}
                <a href="https://github.com/clawnify/OpenFieldService">OpenFieldService</a>
                , MIT, © 2026 Clawnify. The marketing site is a separate app.
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
