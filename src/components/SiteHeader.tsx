"use client";

import Link from "next/link";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactDetails, navItems } from "@/lib/site";
import { LogoMark } from "./LogoMark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const desktopNavItems = navItems.filter((item) => item.href !== "/contact");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="mobile-header-bar">
        <div className="header-rail mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-6 lg:px-10">
          <div className="header-brand min-w-0">
            <LogoMark shortTitle showSlogan={false} />
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
            <Link href="/contact" className="site-button-primary nav-prayer-button">
              <span>Prayer Request</span>
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="mobile-menu-trigger rounded-md lg:hidden"
          >
            {open ? <X size={21} weight="bold" /> : <List size={21} weight="bold" />}
          </button>
        </div>
      </header>

      <div
        className={
          "fixed inset-x-0 bottom-0 top-14 z-50 lg:hidden sm:top-16 " +
          (open ? "pointer-events-auto" : "pointer-events-none")
        }
      >
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={() => setOpen(false)}
          className={
            "absolute inset-0 bg-[#030604]/72 transition-opacity duration-[180ms] ease-out " +
            (open ? "opacity-100" : "opacity-0")
          }
        />

        <div
          className={
            "relative max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-white/10 bg-[#07120d] text-white shadow-[0_24px_60px_rgba(3,6,4,0.32)] transition duration-[180ms] ease-out sm:max-h-[calc(100dvh-4rem)] " +
            (open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0")
          }
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-3 py-4 sm:px-6">
            <p className="border-b border-white/10 px-1 pb-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#cfb45f]">
              Prayer here, Prayer there
            </p>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={
                    "mobile-menu-row rounded-md px-2 " +
                    (active
                      ? "border-[#cfb45f] text-[#cfb45f]"
                      : "text-white/82 hover:bg-white/6 hover:text-white")
                  }
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-2 grid gap-2 border-t border-white/10 pt-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="site-button-primary min-h-12 w-full rounded-md text-sm sm:text-sm"
              >
                Send Prayer Request
              </Link>
              <a
                href={`mailto:${contactDetails.email}`}
                className="rounded-md border border-white/12 bg-white/4 px-4 py-3 text-xs text-white/72 transition duration-[150ms] ease-out hover:border-[#cfb45f]/55 hover:text-white break-all sm:text-sm"
              >
                {contactDetails.email}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
