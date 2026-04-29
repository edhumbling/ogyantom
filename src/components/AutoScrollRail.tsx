"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type AutoScrollRailProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
};

export function AutoScrollRail({
  ariaLabel,
  children,
  className = "",
}: AutoScrollRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1);
  const pausedRef = useRef(false);
  const pointerInsideRef = useRef(false);
  const pointerHeldRef = useRef(false);
  const focusWithinRef = useRef(false);
  const [paused, setPaused] = useState(false);

  const syncPausedState = useCallback(() => {
    const nextPaused =
      pointerInsideRef.current ||
      pointerHeldRef.current ||
      focusWithinRef.current;

    pausedRef.current = nextPaused;
    setPaused(nextPaused);
  }, []);

  const moveByPage = useCallback((direction: -1 | 1) => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: direction * rail.clientWidth * 0.78,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      return;
    }

    let frame = 0;
    let previousTime = performance.now();

    const tick = (time: number) => {
      const rail = railRef.current;
      const elapsed = Math.min(time - previousTime, 48);
      previousTime = time;

      if (rail && !pausedRef.current) {
        const maxScroll = rail.scrollWidth - rail.clientWidth;

        if (maxScroll > 1) {
          if (rail.scrollLeft >= maxScroll - 1) {
            directionRef.current = -1;
          } else if (rail.scrollLeft <= 1) {
            directionRef.current = 1;
          }

          rail.scrollLeft += directionRef.current * elapsed * 0.018;
        }
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="auto-scroll-shell"
      onPointerEnter={() => {
        pointerInsideRef.current = true;
        syncPausedState();
      }}
      onPointerLeave={() => {
        pointerInsideRef.current = false;
        pointerHeldRef.current = false;
        syncPausedState();
      }}
      onPointerDown={() => {
        pointerHeldRef.current = true;
        syncPausedState();
      }}
      onPointerUp={() => {
        pointerHeldRef.current = false;
        syncPausedState();
      }}
      onPointerCancel={() => {
        pointerHeldRef.current = false;
        syncPausedState();
      }}
      onFocusCapture={() => {
        focusWithinRef.current = true;
        syncPausedState();
      }}
      onBlurCapture={() => {
        focusWithinRef.current = false;
        syncPausedState();
      }}
      data-paused={paused ? "true" : "false"}
    >
      <button
        type="button"
        className="auto-scroll-arrow auto-scroll-arrow-left"
        aria-label={`Scroll ${ariaLabel} left`}
        onClick={() => moveByPage(-1)}
      >
        <CaretLeft size={20} weight="bold" aria-hidden="true" />
      </button>

      <div ref={railRef} className={`home-card-rail hide-scrollbar ${className}`} aria-label={ariaLabel}>
        {children}
      </div>

      <button
        type="button"
        className="auto-scroll-arrow auto-scroll-arrow-right"
        aria-label={`Scroll ${ariaLabel} right`}
        onClick={() => moveByPage(1)}
      >
        <CaretRight size={20} weight="bold" aria-hidden="true" />
      </button>
    </div>
  );
}
