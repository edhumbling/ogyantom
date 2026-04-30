"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type AutoScrollRailProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  shellClassName?: string;
};

export function AutoScrollRail({
  ariaLabel,
  children,
  className = "",
  shellClassName = "",
}: AutoScrollRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1);
  const pausedRef = useRef(false);
  const pointerInsideRef = useRef(false);
  const pointerHeldRef = useRef(false);
  const focusWithinRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [isMobileRail, setIsMobileRail] = useState(false);

  const syncPausedState = useCallback(() => {
    const nextPaused =
      pointerInsideRef.current ||
      pointerHeldRef.current ||
      focusWithinRef.current;

    pausedRef.current = nextPaused;
    setPaused(nextPaused);
  }, []);

  const pauseTemporarily = useCallback((duration = 2000) => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    pausedRef.current = true;
    setPaused(true);
    resumeTimerRef.current = window.setTimeout(() => {
      resumeTimerRef.current = null;
      syncPausedState();
    }, duration);
  }, [syncPausedState]);

  const moveByPage = useCallback((direction: -1 | 1) => {
    const rail = railRef.current;

    if (!rail || isMobileRail) {
      return;
    }

    pauseTemporarily(2600);
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.78,
      behavior: "smooth",
    });
  }, [isMobileRail, pauseTemporarily]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const updateMobileState = () => setIsMobileRail(mobileQuery.matches);

    updateMobileState();
    mobileQuery.addEventListener("change", updateMobileState);

    return () => mobileQuery.removeEventListener("change", updateMobileState);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches || isMobileRail) {
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

          rail.scrollLeft += directionRef.current * elapsed * 0.008;
        }
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isMobileRail]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`auto-scroll-shell ${shellClassName}`}
      onPointerEnter={() => {
        if (isMobileRail) {
          return;
        }

        pointerInsideRef.current = true;
        syncPausedState();
      }}
      onPointerLeave={() => {
        if (isMobileRail) {
          return;
        }

        pointerInsideRef.current = false;
        pointerHeldRef.current = false;
        syncPausedState();
      }}
      onPointerDown={() => {
        if (isMobileRail) {
          return;
        }

        pointerHeldRef.current = true;
        if (resumeTimerRef.current) {
          window.clearTimeout(resumeTimerRef.current);
          resumeTimerRef.current = null;
        }
        syncPausedState();
      }}
      onPointerUp={() => {
        if (isMobileRail) {
          return;
        }

        pointerHeldRef.current = false;
        pauseTemporarily(2400);
      }}
      onPointerCancel={() => {
        if (isMobileRail) {
          return;
        }

        pointerHeldRef.current = false;
        pauseTemporarily(1600);
      }}
      onFocusCapture={() => {
        if (isMobileRail) {
          return;
        }

        focusWithinRef.current = true;
        syncPausedState();
      }}
      onBlurCapture={() => {
        if (isMobileRail) {
          return;
        }

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

      <div
        ref={railRef}
        className={`home-card-rail hide-scrollbar ${className}`}
        aria-label={ariaLabel}
      >
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
