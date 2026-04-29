"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

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
      {children}
      {footer}
    </>
  );
}
