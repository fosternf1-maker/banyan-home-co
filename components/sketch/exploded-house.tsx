"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HousePlate } from "@/components/sketch/house-plate";
import {
  sketchIntro,
  sketchLayers,
  type SketchLayerId,
} from "@/lib/sketch";

type Mode = "scroll" | "simple" | "static";

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function readMode(): Mode {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "static";
  }
  if (window.matchMedia("(max-width: 959px)").matches) {
    return "simple";
  }
  return "scroll";
}

export function ExplodedHouse() {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startY: number; startProgress: number } | null>(
    null,
  );
  const [mode, setMode] = useState<Mode>("scroll");
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<SketchLayerId>(sketchLayers[0].id);

  const applyProgress = useCallback((next: number) => {
    const value = clamp(next);
    const index = Math.min(
      sketchLayers.length - 1,
      Math.max(0, Math.round(value * (sketchLayers.length - 1))),
    );
    setProgress(value);
    setActiveId(sketchLayers[index].id);
  }, []);

  useEffect(() => {
    const updateMode = () => {
      const next = readMode();
      setMode(next);
      if (next !== "scroll") {
        setProgress(1);
      }
    };

    updateMode();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = window.matchMedia("(max-width: 959px)");
    motion.addEventListener("change", updateMode);
    width.addEventListener("change", updateMode);
    return () => {
      motion.removeEventListener("change", updateMode);
      width.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    if (mode !== "scroll") return;

    let frame = 0;
    function measure() {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const nav =
        document.querySelector(".site-nav")?.getBoundingClientRect().height ??
        70;
      const range = Math.max(1, rect.height - window.innerHeight);
      const next = clamp((nav - rect.top) / range);
      applyProgress(next);
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode, applyProgress]);

  const active =
    sketchLayers.find((layer) => layer.id === activeId) ?? sketchLayers[0];
  const explode = mode === "scroll" ? progress : 1;
  const hint =
    mode === "static"
      ? sketchIntro.staticHint
      : mode === "simple"
        ? sketchIntro.simpleHint
        : sketchIntro.scrollHint;

  function goTo(id: SketchLayerId) {
    setActiveId(id);
    if (mode !== "scroll") return;
    const target = document.getElementById(`sketch-step-${id}`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onPointerDown(event: React.PointerEvent<HTMLElement>) {
    if (mode !== "scroll") return;
    if (event.button !== 0) return;
    dragRef.current = { startY: event.clientY, startProgress: progress };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (mode !== "scroll" || !dragRef.current) return;
    const delta = (dragRef.current.startY - event.clientY) / window.innerHeight;
    applyProgress(dragRef.current.startProgress + delta * 1.15);
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  return (
    <div
      ref={stageRef}
      className={`sketch-stage sketch-stage--${mode}`}
    >
      {mode === "scroll"
        ? sketchLayers.map((layer, index) => (
            <div
              key={layer.id}
              id={`sketch-step-${layer.id}`}
              className="sketch-sentinel"
              style={{ top: `${(index / Math.max(1, sketchLayers.length - 1)) * 100}%` }}
            />
          ))
        : null}

      <div className="wrap sketch-stage__sticky">
        <figure
          className="sketch-plate"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <HousePlate
            activeId={activeId}
            explode={explode}
            onSelect={goTo}
          />
          <figcaption className="sketch-plate__caption">
            South Tampa bungalow · architectural plate
          </figcaption>
        </figure>

        <div className="sketch-spec" aria-live="polite">
          <p className="sketch-spec__index">
            {active.index} / {sketchLayers.length}
          </p>
          <h2>{active.title}</h2>
          <p className="sketch-spec__name">{active.name}</p>
          <p className="sketch-spec__body">{active.body}</p>
          <p className="sketch-spec__detail">
            <span>{active.name}</span>
            <span>{active.detail}</span>
          </p>
          <ol className="sketch-layers">
            {sketchLayers.map((layer) =>
              mode === "scroll" ? (
                <li key={layer.id}>
                  <a
                    href={`#sketch-step-${layer.id}`}
                    aria-current={layer.id === activeId}
                    onClick={() => setActiveId(layer.id)}
                  >
                    <span>{layer.index}</span>
                    <span>{layer.name}</span>
                  </a>
                </li>
              ) : (
                <li key={layer.id}>
                  <button
                    type="button"
                    aria-current={layer.id === activeId}
                    onClick={() => goTo(layer.id)}
                  >
                    <span>{layer.index}</span>
                    <span>{layer.name}</span>
                  </button>
                </li>
              ),
            )}
          </ol>
          <p className="sketch-hero__hint" style={{ color: "var(--color-ink-3)" }}>
            {hint}
          </p>
        </div>
      </div>
    </div>
  );
}
