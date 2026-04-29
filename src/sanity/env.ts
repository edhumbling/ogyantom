function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    return "";
  }

  return value;
}

export const sanityProjectId = getRequiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
export const sanityDataset = getRequiredEnv("NEXT_PUBLIC_SANITY_DATASET");

export const sanityConfig = {
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-04-24",
  useCdn: true,
};

export const hasSanityConfig = Boolean(sanityProjectId && sanityDataset);
