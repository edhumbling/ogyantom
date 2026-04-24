"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactDetails, navItems } from "@/lib/site";
import { LogoMark } from "./LogoMark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] border-b border-white/10 bg-[#07120d]/96 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-15 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-10">
          <div className="min-w-0">
            <LogoMark />
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "border-b px-0 py-3 text-sm font-bold uppercase tracking-[0.16em] transition duration-[180ms] ease-out " +
                    (active
                      ? "border-[#cfb45f] text-white"
                      : "border-transparent text-white/72 hover:border-white/24 hover:text-white")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/contact" className="site-button-primary text-sm uppercase tracking-[0.16em]">
              Send Prayer Request
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/14 bg-white/5 text-[#cfb45f] transition duration-[150ms] ease-out active:scale-[0.97] lg:hidden"
          >
            <List size={22} weight="bold" />
          </button>
        </div>
      </header>

      <div
        className={
          "fixed inset-0 z-[80] lg:hidden " + (open ? "pointer-events-auto" : "pointer-events-none")
        }
      >
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={() => setOpen(false)}
          className={
            "absolute inset-0 bg-[#030604]/70 transition-opacity duration-[220ms] ease-out " +
            (open ? "opacity-100" : "opacity-0")
          }
        />

        <aside
          className={
            "absolute inset-x-0 top-[3.75rem] bottom-0 flex flex-col border-t border-white/10 bg-[#07120d] text-white transition-transform duration-[220ms] ease-out sm:top-16 " +
            (open ? "translate-y-0" : "-translate-y-3")
          }
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
            <LogoMark compact />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/14 bg-white/5 text-white transition duration-[150ms] ease-out active:scale-[0.97]"
            >
              <X size={22} weight="bold" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={
                    "border-b border-white/8 px-1 py-4 text-[0.95rem] font-bold uppercase tracking-[0.16em] transition duration-[150ms] ease-out sm:text-lg " +
                    (active
                      ? "border-[#cfb45f] text-[#cfb45f]"
                      : "text-white/82 hover:text-white")
                  }
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-auto grid gap-3 pt-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="site-button-primary w-full text-sm uppercase tracking-[0.16em]"
              >
                Send Prayer Request
              </Link>
              <a
                href={`mailto:${contactDetails.email}`}
                className="border border-white/10 px-4 py-4 text-sm text-white/72 transition duration-[150ms] ease-out hover:text-white break-all"
              >
                {contactDetails.email}
              </a>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
