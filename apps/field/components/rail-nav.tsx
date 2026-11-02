"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dispatch" },
  { href: "/homes", label: "Homes" },
] as const;

export function RailNav() {
  const pathname = usePathname();

  return (
    <nav className="rail__nav" aria-label="Field record">
      {links.map((link) => {
        const on =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={on ? "rail__link rail__link--on" : "rail__link"}
            aria-current={on ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
