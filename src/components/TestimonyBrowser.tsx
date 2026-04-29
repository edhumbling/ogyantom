"use client";

import { useMemo, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export type TestimonyEntry = {
  name: string;
  title: string;
  highlight: string;
  content: string[];
};

type TestimonyBrowserProps = {
  testimonies: TestimonyEntry[];
};

const desktopPageSize = 6;
const mobilePageSize = 2;

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

type TestimonySetProps = TestimonyBrowserProps & {
  pageSize: number;
};

function TestimonySet({ testimonies, pageSize }: TestimonySetProps) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(testimonies.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pagedItems = useMemo(
    () => testimonies.slice(safePage * pageSize, safePage * pageSize + pageSize),
    [safePage, pageSize, testimonies],
  );
  const showPagination = testimonies.length > pageSize;
  const firstVisible = safePage * pageSize + 1;
  const lastVisible = Math.min(testimonies.length, safePage * pageSize + pagedItems.length);

  const goPrevious = () => {
    setPage((current) => (current === 0 ? pageCount - 1 : current - 1));
  };
  const goNext = () => {
    setPage((current) => (current + 1) % pageCount);
  };

  return (
    <>
      {showPagination ? (
        <div className="testimony-pagination-bar">
          <span>
            {firstVisible}-{lastVisible} of {testimonies.length}
          </span>
          <div>
            <button type="button" onClick={goPrevious} aria-label="Previous testimonies">
              <CaretLeft size={17} weight="bold" />
            </button>
            <button type="button" onClick={goNext} aria-label="Next testimonies">
              <CaretRight size={17} weight="bold" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="testimony-card-grid">
        {pagedItems.map((item, index) => (
          <article key={`${item.name}-${item.title}`} className="testimony-story-card">
            <div className="testimony-story-card-head">
              <span className="testimony-ledger-number">
                {String(safePage * pageSize + index + 1).padStart(2, "0")}
              </span>
              <span className="testimony-pill">{item.highlight}</span>
            </div>
            <h3>{item.title}</h3>
            <p>&quot;{item.content[0]}&quot;</p>
            <footer>
              <span>{initials(item.name)}</span>
              <strong>{item.name}</strong>
            </footer>
          </article>
        ))}
      </div>
    </>
  );
}

export function TestimonyBrowser({ testimonies }: TestimonyBrowserProps) {
  if (testimonies.length === 0) return null;

  return (
    <div className="testimony-browser">
      <div className="testimony-browser-desktop">
        <TestimonySet testimonies={testimonies} pageSize={desktopPageSize} />
      </div>
      <div className="testimony-browser-mobile">
        <TestimonySet testimonies={testimonies} pageSize={mobilePageSize} />
      </div>
    </div>
  );
}
