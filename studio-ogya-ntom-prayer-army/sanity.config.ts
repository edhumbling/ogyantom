import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "9nov35lb";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "ogyaNtomPrayerArmy",
  title: "Ogya Ntom Prayer Army Studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
