import { createClient } from "next-sanity";
import { hasSanityConfig, sanityConfig } from "./env";

export const client = hasSanityConfig ? createClient(sanityConfig) : null;

export const writeClient =
  hasSanityConfig && process.env.SANITY_API_WRITE_TOKEN
    ? createClient({
        ...sanityConfig,
        token: process.env.SANITY_API_WRITE_TOKEN,
        useCdn: false,
      })
    : null;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {},
  fallback: T,
): Promise<T> {
  if (!client) {
    return fallback;
  }

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return fallback;
  }
}
