import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export default defineConfig({
  name: "ogyaNtomPrayerArmy",
  title: "Ogya Ntom Prayer Army Studio",
  projectId: getRequiredEnv("SANITY_STUDIO_PROJECT_ID"),
  dataset: getRequiredEnv("SANITY_STUDIO_DATASET"),
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
