"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
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
};

type SanityCardGridProps = {
  items: SanityCardGridItem[];
  ariaLabel: string;
};

const desktopPageSize = 12;
const mobilePageSize = 6;

function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(mobilePageSize);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const syncPageSize = () => {
      setPageSize(media.matches ? desktopPageSize : mobilePageSize);
    };

    syncPageSize();
    media.addEventListener("change", syncPageSize);

    return () => {
      media.removeEventListener("change", syncPageSize);
    };
  }, []);

  return pageSize;
}

export function SanityCardGrid({ ariaLabel, items }: SanityCardGridProps) {
  const pageSize = useResponsivePageSize();
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageStart = safePage * pageSize;
  const pageItems = useMemo(
    () => items.slice(pageStart, pageStart + pageSize),
    [items, pageSize, pageStart],
  );
  const showPagination = items.length > pageSize;
  const firstVisible = items.length ? pageStart + 1 : 0;
  const lastVisible = Math.min(items.length, pageStart + pageItems.length);

  const goPrevious = () => {
    setPage(Math.max(0, safePage - 1));
  };

  const goNext = () => {
    setPage(Math.min(pageCount - 1, safePage + 1));
  };

  return (
    <div className="sanity-card-browser" aria-label={ariaLabel}>
      {showPagination ? (
        <div className="sanity-card-pagination" aria-label={`${ariaLabel} pagination`}>
          <span>
            {firstVisible}-{lastVisible} of {items.length}
          </span>
          <div>
            <button
              type="button"
              onClick={goPrevious}
              disabled={safePage === 0}
              aria-label={`Previous ${ariaLabel}`}
            >
              <CaretLeft size={17} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={safePage === pageCount - 1}
              aria-label={`Next ${ariaLabel}`}
            >
              <CaretRight size={17} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="sanity-square-grid">
        {pageItems.map((item, index) => {
          const content = (
            <>
              <div className="sanity-square-cover">
                <SanityImage
                  image={item.cover}
                  altFallback={item.title}
                  width={900}
                  height={900}
                  priority={safePage === 0 && index < 4}
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
            <Link key={item.id} href={item.href} className="sanity-square-card">
              {content}
            </Link>
          ) : (
            <article key={item.id} className="sanity-square-card">
              {content}
            </article>
          );
        })}
      </div>
    </div>
  );
}
