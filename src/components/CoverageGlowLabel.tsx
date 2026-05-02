"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

type CoverageTheme = {
  color: string;
  matched: boolean;
};

const defaultTheme: CoverageTheme = {
  color: "#cfb45f",
  matched: false,
};

const timezoneThemes: Record<string, CoverageTheme> = {
  "Africa/Accra": { color: "#ff7a1a", matched: true },
  "Africa/Johannesburg": { color: "#34f5a4", matched: true },
  "America/Anchorage": { color: "#34f5a4", matched: true },
  "America/Chicago": { color: "#34f5a4", matched: true },
  "America/Denver": { color: "#34f5a4", matched: true },
  "America/Detroit": { color: "#34f5a4", matched: true },
  "America/Halifax": { color: "#34f5a4", matched: true },
  "America/Los_Angeles": { color: "#34f5a4", matched: true },
  "America/New_York": { color: "#34f5a4", matched: true },
  "America/Phoenix": { color: "#34f5a4", matched: true },
  "America/Toronto": { color: "#34f5a4", matched: true },
  "America/Vancouver": { color: "#34f5a4", matched: true },
  "Europe/Amsterdam": { color: "#cfb45f", matched: true },
  "Europe/Berlin": { color: "#cfb45f", matched: true },
  "Europe/London": { color: "#34f5a4", matched: true },
  "Europe/Stockholm": { color: "#cfb45f", matched: true },
};

const regionThemes: Record<string, CoverageTheme> = {
  CA: { color: "#34f5a4", matched: true },
  DE: { color: "#cfb45f", matched: true },
  GB: { color: "#34f5a4", matched: true },
  GH: { color: "#ff7a1a", matched: true },
  NL: { color: "#cfb45f", matched: true },
  SE: { color: "#cfb45f", matched: true },
  US: { color: "#34f5a4", matched: true },
  ZA: { color: "#34f5a4", matched: true },
};

function detectCoverageTheme(): CoverageTheme {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneTheme = timezoneThemes[timeZone];

  if (timezoneTheme) {
    return timezoneTheme;
  }

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const region = languages
    .map((language) => language.split("-")[1]?.toUpperCase())
    .find((value): value is string => Boolean(value));

  return region ? regionThemes[region] ?? defaultTheme : defaultTheme;
}

type CoverageGlowLabelProps = {
  label?: string;
};

export function CoverageGlowLabel({ label = "Global Prayer Coverage" }: CoverageGlowLabelProps) {
  const [theme, setTheme] = useState<CoverageTheme>(defaultTheme);

  useEffect(() => {
    setTheme(detectCoverageTheme());
  }, []);

  return (
    <span
      className="coverage-glow-label"
      data-coverage-match={theme.matched ? "true" : "false"}
      style={{ "--coverage-glow": theme.color } as CSSProperties}
    >
      <span className="coverage-glow-ping" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
