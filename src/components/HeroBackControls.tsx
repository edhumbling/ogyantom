"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";

const heroSelector = ".home-hero, .testimony-hero, .prayer-command";
const scrollStoragePrefix = "ogya-scroll:";

function scrollKey(pathname: string) {
  if (typeof window === "undefined") {
    return pathname;
  }

  return `${pathname}${window.location.search}`;
}

function saveScrollPosition(pathname: string) {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(
    `${scrollStoragePrefix}${scrollKey(pathname)}`,
    String(Math.max(0, Math.round(window.scrollY))),
  );
}

export function HeroBackControls() {
  const pathname = usePathname();
  const router = useRouter();
  const [hero, setHero] = useState<HTMLElement | null>(null);
  const showBackButton = pathname !== "/";

  const key = useMemo(() => scrollKey(pathname), [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.history.scrollRestoration = "manual";

    const restoreScroll = () => {
      if (window.location.hash) {
        return;
      }

      const saved = sessionStorage.getItem(`${scrollStoragePrefix}${key}`);
      if (saved) {
        window.scrollTo(0, Number(saved));
      }
    };

    const frame = window.requestAnimationFrame(() => {
      window.setTimeout(restoreScroll, 40);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      saveScrollPosition(pathname);
    };
  }, [key, pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saveCurrent = () => saveScrollPosition(pathname);
    const saveOnLinkClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a[href]");
      if (!link) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        if (url.origin === window.location.origin) {
          saveCurrent();
        }
      } catch {
        return;
      }
    };

    window.addEventListener("beforeunload", saveCurrent);
    window.addEventListener("pagehide", saveCurrent);
    document.addEventListener("click", saveOnLinkClick, { capture: true });

    return () => {
      window.removeEventListener("beforeunload", saveCurrent);
      window.removeEventListener("pagehide", saveCurrent);
      document.removeEventListener("click", saveOnLinkClick, { capture: true });
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const updateHero = () => {
      setHero(document.querySelector<HTMLElement>(heroSelector));
    };

    updateHero();
    const observer = new MutationObserver(updateHero);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  if (!hero || !showBackButton) {
    return null;
  }

  return createPortal(
    <button
      type="button"
      className="hero-back-button"
      onClick={() => {
        saveScrollPosition(pathname);
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
    >
      <ArrowLeft size={16} weight="bold" aria-hidden="true" />
      <span>Back</span>
    </button>,
    hero,
  );
}
