import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "ogyaNtomPrayerArmy",
  title: "Ogya Ntom Prayer Army Studio",
  projectId: "9nov35lb",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
