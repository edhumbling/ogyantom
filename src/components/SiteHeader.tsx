"use client";

import Link from "next/link";
import { ArrowRight, FacebookLogo, List, TiktokLogo, WhatsappLogo, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { contactDetails, navItems } from "@/lib/site";
import { LogoMark } from "./LogoMark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const desktopNavItems = navItems.filter(
    (item) => item.href !== "/contact" && item.href !== "/support",
  );
  const mobileNavItems = navItems.filter((item) => item.href !== "/support");

  const closeMenu = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    window.setTimeout(() => {
      const closeButton = menuRef.current?.querySelector<HTMLElement>(".mobile-menu-close");
      closeButton?.focus();
    }, 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, open]);

  return (
    <>
      <header className="mobile-header-bar">
        <div className="header-rail mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-6 lg:px-10">
          <div className="header-brand min-w-0">
            <LogoMark showSlogan={false} />
          </div>

          <nav className="header-nav ml-auto hidden items-center lg:flex" aria-label="Primary navigation">
            {desktopNavItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "header-nav-link font-sans " +
                    (active
                      ? "header-nav-link-active"
                      : "text-white/74")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/prayer-request"
              className={
                "header-nav-link nav-prayer-link font-sans " +
                (pathname === "/prayer-request" ? "header-nav-link-active" : "text-white/74")
              }
            >
              Prayer Request
            </Link>
            <Link href="/support" className="site-button-primary nav-support-button">
              <span>Give / Support</span>
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </Link>
          </nav>

          <button
            ref={triggerRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-site-menu"
            onClick={() => setOpen((value) => !value)}
            className="mobile-menu-trigger rounded-md lg:hidden"
          >
            {open ? <X size={21} weight="bold" /> : <List size={21} weight="bold" />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            type="button"
            aria-label="Close menu backdrop"
            onClick={closeMenu}
            className="mobile-menu-backdrop absolute inset-0 opacity-100"
          />

          <div
            ref={menuRef}
            id="mobile-site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile site menu"
            className="mobile-menu-panel mobile-menu-panel-open relative overflow-y-auto text-white opacity-100"
          >
            <nav className="mobile-menu-nav mx-auto flex max-w-7xl flex-col px-3 py-4 sm:px-6">
              <div className="mobile-menu-topline">
                <LogoMark showSlogan={false} />
                <button
                  type="button"
                  className="mobile-menu-close"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <X size={17} weight="bold" aria-hidden="true" />
                </button>
              </div>
              <p className="mobile-menu-kicker">Fire here! Fire there!</p>
              {mobileNavItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={
                      "mobile-menu-row " +
                      (active
                        ? "mobile-menu-row-active"
                        : "")
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mobile-menu-actions mt-2 grid gap-2 border-t border-white/10 pt-4">
                <Link
                  href="/prayer-request"
                  onClick={closeMenu}
                  className="mobile-glow-action mobile-glow-action-prayer"
                >
                  <span>Request Prayer</span>
                  <ArrowRight size={15} weight="bold" aria-hidden="true" />
                </Link>
                <Link
                  href="/support"
                  onClick={closeMenu}
                  className="mobile-glow-action mobile-glow-action-support"
                >
                  <span>Give / Support</span>
                  <ArrowRight size={15} weight="bold" aria-hidden="true" />
                </Link>
              </div>
              <div
                className="mobile-menu-socials"
                role="group"
                aria-labelledby="mobile-menu-socials-heading"
              >
                <p id="mobile-menu-socials-heading">Watchman Opanin Thomas</p>
                <div>
                  <a href={contactDetails.whatsapp} onClick={closeMenu} aria-label="Message Watchman Opanin Thomas on WhatsApp">
                    <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                  <a href={contactDetails.tiktok} target="_blank" rel="noreferrer" onClick={closeMenu} aria-label="Open Watchman Opanin Thomas on TikTok">
                    <TiktokLogo size={16} weight="bold" aria-hidden="true" />
                    <span>TikTok</span>
                  </a>
                  <a href={contactDetails.facebook} target="_blank" rel="noreferrer" onClick={closeMenu} aria-label="Open Watchman Opanin Thomas on Facebook">
                    <FacebookLogo size={16} weight="bold" aria-hidden="true" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
