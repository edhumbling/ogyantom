"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { contactDetails, navItems } from "@/lib/site";
import { LogoMark } from "./LogoMark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[60] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-panel mx-auto max-w-7xl rounded-[2rem] px-4 py-3 text-[#08140f] transition-all duration-[400ms] ease-out">
          <div className="flex items-center justify-between gap-4">
            <LogoMark />

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={"rounded-full px-4 py-3 text-sm font-bold transition duration-[400ms] ease-out " + (
                      active
                        ? "border border-[#0b2b1c] bg-[#0b2b1c] text-white shadow-[0_14px_30px_rgba(7,18,13,0.18)]"
                        : "text-[#21372c] hover:bg-white/[0.52]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              className="hidden h-12 items-center rounded-full bg-[#cfb45f] px-5 text-sm font-bold text-[#07120d] transition duration-[400ms] ease-out hover:bg-[#e2ca78] active:scale-[0.98] sm:inline-flex"
            >
              Send Prayer Request
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d3a27] text-[#cfb45f] transition duration-[400ms] ease-out active:scale-[0.97] lg:hidden relative z-[70] shadow-lg"
            >
              <List size={26} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Overlay Menu */}
      <div
        className={"fixed inset-0 z-[80] flex flex-col bg-[#07120d] text-[#f8faf7] transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden " + (
          open ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex items-center justify-between px-8 pt-7 sm:px-10">
          <div className="text-white">
            <LogoMark />
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition duration-[400ms] ease-out hover:bg-white/20 active:scale-[0.97]"
          >
            <X size={24} weight="bold" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 pb-32 overflow-y-auto">
          <nav className="flex flex-col items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-5xl lg:text-7xl font-display font-light text-white hover:text-[var(--gold)] transition duration-[400ms] ease-out"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-20 flex flex-col items-center justify-center gap-4">
            <Link 
              href="/contact" 
              onClick={() => setOpen(false)} 
              className="flex h-14 items-center justify-center rounded-full bg-[var(--gold)] px-8 text-sm font-bold text-[#07120d] transition duration-[400ms] ease-out hover:bg-white active:scale-95"
            >
              Send Prayer Request
            </Link>
            <a href={`mailto:${contactDetails.email}`} className="text-white/60 hover:text-white transition duration-[300ms]">
              {contactDetails.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
