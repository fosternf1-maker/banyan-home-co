"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Wordmark } from "@/components/wordmark";
import { navLinks, site } from "@/lib/site";

export function SiteNav() {
  const pathname = usePathname();
  const onSketch = pathname.startsWith("/sketch");
  const links = onSketch
    ? [{ href: "/", label: "The site" }]
    : navLinks;
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverHero(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        detailsRef.current?.removeAttribute("open");
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tone = overHero && !open ? "dark" : "light";

  function closeMenu() {
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <header className={`site-nav site-nav--${tone}${open ? " is-open" : ""}`}>
      <div className="wrap site-nav__inner">
        <Wordmark size="sm" href={onSketch ? "/" : "#top"} />
        <nav className="site-nav__links" aria-label="Primary">
          {links.map((link) =>
            link.href.startsWith("/") ? (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ),
          )}
        </nav>
        <div className="site-nav__end">
          <ButtonLink
            href={site.auditMailto}
            variant={tone === "dark" ? "primary" : "ink"}
            className="site-nav__cta"
          >
            Book the audit
          </ButtonLink>
          <details
            ref={detailsRef}
            className="site-nav__mobile"
            onToggle={(event) => {
              setOpen(event.currentTarget.open);
            }}
          >
            <summary className="site-nav__menu">
              <span className="site-nav__menu-open">Menu</span>
              <span className="site-nav__menu-close">Close</span>
            </summary>
            <div id="mobile-nav" className="site-nav__drawer">
              <nav aria-label="Mobile">
                {links.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link key={link.href} href={link.href} onClick={closeMenu}>
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.href} href={link.href} onClick={closeMenu}>
                      {link.label}
                    </a>
                  ),
                )}
                <a href={site.phoneHref} onClick={closeMenu}>
                  {site.phoneDisplay}
                </a>
                <ButtonLink href={site.auditMailto} variant="ink">
                  Book your home health audit
                </ButtonLink>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
