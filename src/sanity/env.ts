function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const sanityConfig = {
  projectId: getRequiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: getRequiredEnv("NEXT_PUBLIC_SANITY_DATASET"),
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-04-24",
  useCdn: true,
};
