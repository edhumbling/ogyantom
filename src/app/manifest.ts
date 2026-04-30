import type { MetadataRoute } from "next";
import {
  SITE_DESCRIPTION,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
} from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#03180f",
    theme_color: "#052616",
    categories: ["faith", "community", "lifestyle"],
    icons: [
      {
        src: SITE_LOGO_PATH,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
