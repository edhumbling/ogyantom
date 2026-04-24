import { createClient } from "next-sanity";
import { sanityConfig } from "./env";

export const client = createClient(sanityConfig);

export async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {},
  fallback: T,
): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return fallback;
  }
}
