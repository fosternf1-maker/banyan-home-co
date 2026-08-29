"use client";

import { useEffect } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOutLux(t: number) {
  return 1 - (1 - t) ** 3;
}

function scrollToElement(element: HTMLElement) {
  const padding =
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
    80;
  const target =
    element.getBoundingClientRect().top + window.scrollY - padding;
  const start = window.scrollY;
  const distance = target - start;

  if (Math.abs(distance) < 2 || prefersReducedMotion()) {
    window.scrollTo(0, target);
    return;
  }

  const duration = Math.min(1080, Math.max(520, Math.abs(distance) * 0.42));
  const started = performance.now();

  function frame(now: number) {
    const t = Math.min(1, (now - started) / duration);
    window.scrollTo(0, start + distance * easeOutLux(t));
    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function markArrived(element: HTMLElement) {
  if (prefersReducedMotion()) return;
  element.classList.add("is-arrived");
  window.setTimeout(() => element.classList.remove("is-arrived"), 1400);
}

export function PageMotion() {
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const supportsViewTimeline = CSS.supports("animation-timeline: view()");
    let observer: IntersectionObserver | undefined;

    function revealFallback() {
      observer?.disconnect();
      if (reducedQuery.matches || supportsViewTimeline) return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.remove("will-rise");
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
      );

      document.querySelectorAll(".rise").forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          node.classList.add("is-in");
        } else {
          node.classList.add("will-rise");
          observer?.observe(node);
        }
      });
    }

    revealFallback();
    reducedQuery.addEventListener("change", revealFallback);

    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.length < 2) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", href);
      scrollToElement(target);
      markArrived(target);
    }

    document.addEventListener("click", onClick);

    if (window.location.hash) {
      const hashed = document.getElementById(window.location.hash.slice(1));
      if (hashed) {
        window.requestAnimationFrame(() => markArrived(hashed));
      }
    }

    return () => {
      document.removeEventListener("click", onClick);
      reducedQuery.removeEventListener("change", revealFallback);
      observer?.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
