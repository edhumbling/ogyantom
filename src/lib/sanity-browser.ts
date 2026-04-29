import type { SanityCardGridItem } from "@/components/SanityCardGrid";

export const sanityListPageSize = 8;

export type ListSearchParams = {
  page: number;
  query: string;
};

type RawSearchParams = Record<string, string | string[] | undefined> | undefined;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function normalizeListSearchParams(params: RawSearchParams): ListSearchParams {
  const query = (firstParam(params?.q) ?? "").trim().slice(0, 80);
  const rawPage = Number.parseInt(firstParam(params?.page) ?? "1", 10);

  return {
    page: Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1,
    query,
  };
}

export function buildSearchIndex(parts: Array<string | string[] | undefined | null>) {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .filter((part): part is string => Boolean(part))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function filterSanityCards(items: SanityCardGridItem[], query: string) {
  if (!query) return items;

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  return items.filter((item) => {
    const haystack = buildSearchIndex([
      item.title,
      item.eyebrow,
      item.summary,
      item.meta,
      item.searchText,
    ]).toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}

export function paginateSanityCards(
  items: SanityCardGridItem[],
  page: number,
  pageSize = sanityListPageSize,
) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;

  return {
    page: safePage,
    pageCount,
    pageItems: items.slice(start, start + pageSize),
  };
}
