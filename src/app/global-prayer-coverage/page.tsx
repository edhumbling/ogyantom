import type { Metadata } from "next";
import { GlobalPrayerCoverageMap } from "@/components/GlobalPrayerCoverageMap";

export const metadata: Metadata = {
  title: "Global Prayer Coverage",
  description:
    "An interactive OpenFreeMap view of Ogya Ntom Prayer Army global prayer coverage across Ghana, Canada, the UK, USA, Holland, Sweden, South Africa, Germany, and more incoming locations.",
  alternates: {
    canonical: "/global-prayer-coverage",
  },
};

export default function GlobalPrayerCoveragePage() {
  return <GlobalPrayerCoverageMap />;
}
