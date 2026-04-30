"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { FloatingActions } from "./FloatingActions";
import { HeroBackControls } from "./HeroBackControls";
import { PrayerAssistant } from "./PrayerAssistant";

const headerlessRoutePrefixes = ["/support/give"];

type SiteChromeProps = {
  children: ReactNode;
  footer: ReactNode;
  header: ReactNode;
};

export function SiteChrome({ children, footer, header }: SiteChromeProps) {
  const pathname = usePathname();
  const useFocusedChrome = headerlessRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (useFocusedChrome) {
    return children;
  }

  return (
    <>
      {header}
      <HeroBackControls />
      {children}
      <FloatingActions />
      <PrayerAssistant />
      {footer}
    </>
  );
}
