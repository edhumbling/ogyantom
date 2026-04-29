import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { hasSanityConfig, sanityDataset, sanityProjectId } from "./env";

export const urlFor = (source: SanityImageSource) =>
  hasSanityConfig
    ? createImageUrlBuilder({ projectId: sanityProjectId, dataset: sanityDataset }).image(source)
    : null;
