"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ArrowRight, MagnifyingGlass, X } from "@phosphor-icons/react";
import { SanityImage } from "@/components/SanityImage";
import type { SanityImage as SanityImageType } from "@/sanity/types";

const mobilePageSize = 10;
const desktopPageSize = 20;

export type SanityCardGridItem = {
  id: string;
  href?: string;
  title: string;
  eyebrow: string;
  summary?: string;
  meta?: string;
  actionLabel: string;
  cover?: SanityImageType;
  searchText?: string;
};

type SanityCardGridProps = {
  items: SanityCardGridItem[];
  ariaLabel: string;
  search: {
    basePath: string;
    label: string;
    placeholder: string;
    query: string;
    resultLabel: string;
    totalCount: number;
    quickSearches?: string[];
  };
  pagination: {
    page: number;
  };
};

function normalizeSearch(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 80);
}

function matchesSearch(item: SanityCardGridItem, query: string) {
  const terms = normalizeSearch(query).toLowerCase().split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return true;
  }

  const haystack = [
    item.title,
    item.eyebrow,
    item.summary,
    item.meta,
    item.searchText,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return terms.every((term) => haystack.includes(term));
}

function PaginationControls({
  ariaLabel,
  onPageChange,
  page,
  pageCount,
}: {
  ariaLabel: string;
  onPageChange: (page: number) => void;
  page: number;
  pageCount: number;
}) {
  if (pageCount <= 1) return null;

  return (
    <nav className="sanity-card-pagination" aria-label={`${ariaLabel} pagination`}>
      <span>
        Page {page} of {pageCount}
      </span>
      <div>
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label={`Previous page of ${ariaLabel}`}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          aria-label={`Next page of ${ariaLabel}`}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

export function SanityCardGrid({
  ariaLabel,
  items,
  pagination,
  search,
}: SanityCardGridProps) {
  const [query, setQuery] = useState(search.query);
  const deferredQuery = useDeferredValue(query);
  const [page, setPage] = useState(Math.max(1, pagination.page));
  const [pageSize, setPageSize] = useState(mobilePageSize);

  const filteredItems = useMemo(
    () => items.filter((item) => matchesSearch(item, deferredQuery)),
    [deferredQuery, items],
  );
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  const pageItems = filteredItems.slice(start, start + pageSize);
  const activeQuery = normalizeSearch(deferredQuery);
  const showSearchEmpty = filteredItems.length === 0 && activeQuery;
  const inputId = `${ariaLabel.replace(/\s+/g, "-")}-search`;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncPageSize = () => {
      setPageSize(mediaQuery.matches ? desktopPageSize : mobilePageSize);
    };

    syncPageSize();
    mediaQuery.addEventListener("change", syncPageSize);

    return () => {
      mediaQuery.removeEventListener("change", syncPageSize);
    };
  }, []);

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    const normalizedQuery = normalizeSearch(query);

    if (normalizedQuery) params.set("q", normalizedQuery);
    if (safePage > 1) params.set("page", String(safePage));

    const suffix = params.toString();
    const nextUrl = suffix ? `${search.basePath}?${suffix}` : search.basePath;

    if (`${window.location.pathname}${window.location.search}` !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [query, safePage, search.basePath]);

  return (
    <div className="sanity-card-browser" aria-label={ariaLabel}>
      <form
        className="sanity-search-bar"
        action={search.basePath}
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="sr-only" htmlFor={inputId}>
          {search.label}
        </label>
        <MagnifyingGlass size={18} weight="bold" aria-hidden="true" />
        <input
          id={inputId}
          name="q"
          type="search"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder={search.placeholder}
          autoComplete="off"
          spellCheck={false}
        />
        {query ? (
          <button
            type="button"
            aria-label={`Clear ${search.label}`}
            className="sanity-search-clear"
            onClick={() => updateQuery("")}
          >
            <X size={16} weight="bold" aria-hidden="true" />
          </button>
        ) : null}
      </form>

      {search.quickSearches?.length ? (
        <div className="sanity-quick-searches" aria-label={`Quick ${search.label}`}>
          <button type="button" onClick={() => updateQuery("")} data-active={!normalizeSearch(query)}>
            All
          </button>
          {search.quickSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => updateQuery(term)}
              data-active={normalizeSearch(query).toLowerCase() === term.toLowerCase()}
            >
              {term}
            </button>
          ))}
        </div>
      ) : null}

      <p className="sanity-search-status" aria-live="polite">
        {activeQuery
          ? `${filteredItems.length} ${search.resultLabel} for "${activeQuery}"`
          : `${items.length} ${search.resultLabel}`}
      </p>

      <PaginationControls
        ariaLabel={ariaLabel}
        page={safePage}
        pageCount={pageCount}
        onPageChange={setPage}
      />

      {showSearchEmpty ? (
        <div className="sanity-search-empty">
          <p>No {search.resultLabel} matched this search.</p>
          <button type="button" onClick={() => updateQuery("")}>
            View all {search.resultLabel}
          </button>
        </div>
      ) : null}

      <div className="sanity-square-grid" aria-label={ariaLabel}>
        {pageItems.map((item, index) => {
          const content = (
            <>
              <div className="sanity-square-cover">
                <SanityImage
                  image={item.cover}
                  altFallback={item.title}
                  width={900}
                  height={900}
                  priority={safePage === 1 && index < 4}
                />
                <div className="sanity-square-cover-shade" />
              </div>

              <div className="sanity-square-content">
                <p>{item.eyebrow}</p>
                <h2>{item.title}</h2>
                {item.summary ? <span>{item.summary}</span> : null}
                {item.meta ? <small>{item.meta}</small> : null}
                {item.href ? (
                  <strong>
                    {item.actionLabel}
                    <ArrowRight size={17} weight="bold" aria-hidden="true" />
                  </strong>
                ) : null}
              </div>
            </>
          );

          return item.href ? (
            <Link key={item.id} href={item.href} className="sanity-square-card" data-search-index={item.searchText}>
              {content}
            </Link>
          ) : (
            <article key={item.id} className="sanity-square-card" data-search-index={item.searchText}>
              {content}
            </article>
          );
        })}
      </div>

      <PaginationControls
        ariaLabel={ariaLabel}
        page={safePage}
        pageCount={pageCount}
        onPageChange={setPage}
      />
    </div>
  );
}
