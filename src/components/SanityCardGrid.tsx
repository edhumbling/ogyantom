import Link from "next/link";
import { ArrowRight, CaretLeft, CaretRight, MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import { AutoScrollRail } from "@/components/AutoScrollRail";
import { SanityImage } from "@/components/SanityImage";
import type { SanityImage as SanityImageType } from "@/sanity/types";

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
  };
  pagination: {
    page: number;
    pageCount: number;
  };
};

function pageHref(basePath: string, query: string, page: number) {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));

  const suffix = params.toString();
  return suffix ? `${basePath}?${suffix}` : basePath;
}

function PaginationControls({
  ariaLabel,
  basePath,
  page,
  pageCount,
  query,
}: {
  ariaLabel: string;
  basePath: string;
  page: number;
  pageCount: number;
  query: string;
}) {
  if (pageCount <= 1) return null;

  return (
    <nav className="sanity-card-pagination" aria-label={`${ariaLabel} pagination`}>
      <span>
        Page {page} of {pageCount}
      </span>
      <div>
        {page > 1 ? (
          <Link href={pageHref(basePath, query, page - 1)} aria-label={`Previous ${ariaLabel}`}>
            <CaretLeft size={17} weight="bold" aria-hidden="true" />
          </Link>
        ) : (
          <span aria-hidden="true" className="sanity-card-pagination-disabled">
            <CaretLeft size={17} weight="bold" />
          </span>
        )}
        {page < pageCount ? (
          <Link href={pageHref(basePath, query, page + 1)} aria-label={`Next ${ariaLabel}`}>
            <CaretRight size={17} weight="bold" aria-hidden="true" />
          </Link>
        ) : (
          <span aria-hidden="true" className="sanity-card-pagination-disabled">
            <CaretRight size={17} weight="bold" />
          </span>
        )}
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
  const showSearchEmpty = search.totalCount === 0 && search.query;

  return (
    <div className="sanity-card-browser" aria-label={ariaLabel}>
      <form className="sanity-search-bar" action={search.basePath} role="search">
        <label className="sr-only" htmlFor={`${ariaLabel.replace(/\s+/g, "-")}-search`}>
          {search.label}
        </label>
        <MagnifyingGlass size={18} weight="bold" aria-hidden="true" />
        <input
          id={`${ariaLabel.replace(/\s+/g, "-")}-search`}
          name="q"
          type="search"
          defaultValue={search.query}
          placeholder={search.placeholder}
          autoComplete="off"
          spellCheck={false}
        />
        {search.query ? (
          <Link href={search.basePath} aria-label={`Clear ${search.label}`} className="sanity-search-clear">
            <X size={16} weight="bold" aria-hidden="true" />
          </Link>
        ) : null}
        <button type="submit">Search</button>
      </form>

      <p className="sanity-search-status" aria-live="polite">
        {search.query
          ? `${search.totalCount} ${search.resultLabel} for "${search.query}"`
          : `${search.totalCount} ${search.resultLabel}`}
      </p>

      <PaginationControls
        ariaLabel={ariaLabel}
        basePath={search.basePath}
        page={pagination.page}
        pageCount={pagination.pageCount}
        query={search.query}
      />

      {showSearchEmpty ? (
        <div className="sanity-search-empty">
          <p>No {search.resultLabel} matched this search.</p>
          <Link href={search.basePath}>View all {search.resultLabel}</Link>
        </div>
      ) : null}

      <AutoScrollRail
        ariaLabel={ariaLabel}
        className="sanity-square-grid sanity-square-rail"
      >
        {items.map((item, index) => {
          const content = (
            <>
              <div className="sanity-square-cover">
                <SanityImage
                  image={item.cover}
                  altFallback={item.title}
                  width={900}
                  height={900}
                  priority={pagination.page === 1 && index < 4}
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
      </AutoScrollRail>

      <PaginationControls
        ariaLabel={ariaLabel}
        basePath={search.basePath}
        page={pagination.page}
        pageCount={pagination.pageCount}
        query={search.query}
      />
    </div>
  );
}
