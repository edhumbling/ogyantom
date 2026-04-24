import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const { projectId, dataset } = client.config();

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
