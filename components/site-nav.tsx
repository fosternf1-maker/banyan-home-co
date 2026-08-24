"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { Wordmark } from "@/components/wordmark";
import { navLinks, site } from "@/lib/site";

export function SiteNav() {
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);

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
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tone = overHero && !open ? "dark" : "light";

  return (
    <header className={`site-nav site-nav--${tone}${open ? " is-open" : ""}`}>
      <div className="wrap site-nav__inner">
        <Wordmark size="sm" />
        <nav className="site-nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="site-nav__end">
          <ButtonLink
            href={site.auditMailto}
            variant={tone === "dark" ? "primary" : "ink"}
            className="site-nav__cta"
          >
            Book the audit
          </ButtonLink>
          <button
            type="button"
            className="site-nav__menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className="site-nav__drawer"
        style={{ display: open ? "block" : "none" }}
      >
        <nav className="wrap" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={site.phoneHref} onClick={() => setOpen(false)}>
            {site.phoneDisplay}
          </a>
          <ButtonLink href={site.auditMailto} variant="ink">
            Book your home health audit
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
