import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";

export default function HurricaneLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div className="hurr-no-print">
        <SiteFooter />
      </div>
    </>
  );
}
