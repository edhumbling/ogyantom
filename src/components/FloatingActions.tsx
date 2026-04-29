"use client";

import Image from "next/image";
import { ArrowUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { contactDetails } from "@/lib/site";

function shouldShowScrollTop() {
  if (typeof window === "undefined") {
    return false;
  }

  const pageIsScrollable =
    document.documentElement.scrollHeight > window.innerHeight * 1.45;

  return pageIsScrollable && window.scrollY > Math.max(420, window.innerHeight * 0.7);
}

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setShowScrollTop(shouldShowScrollTop());
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="floating-action-stack" aria-label="Quick actions">
      <button
        type="button"
        className={`floating-scroll-top ${showScrollTop ? "floating-scroll-top-visible" : ""}`}
        aria-label="Scroll to top"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={22} weight="bold" aria-hidden="true" />
      </button>

      <a
        href={contactDetails.whatsapp}
        className="floating-whatsapp"
        aria-label="Message Watchman Opanin Thomas on WhatsApp"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/brand/whatsapp-logo.svg"
          alt=""
          width={38}
          height={38}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
