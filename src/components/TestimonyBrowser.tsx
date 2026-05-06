"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowSquareOut, CaretLeft, CaretRight, PlayCircle, X } from "@phosphor-icons/react";
import { AutoScrollRail } from "@/components/AutoScrollRail";
import { SanityImage } from "@/components/SanityImage";
import type { SanityImage as SanityImageType } from "@/sanity/types";

export type TestimonyEntry = {
  name: string;
  title: string;
  highlight: string;
  content: string[];
  images?: SanityImageType[];
  videoUrl?: string;
};

type TestimonyBrowserProps = {
  testimonies: TestimonyEntry[];
};

const desktopPageSize = 10;
const mobilePageSize = 10;

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

type TestimonySetProps = TestimonyBrowserProps & {
  carousel?: boolean;
  pageSize: number;
};

type ActiveTestimony = {
  item: TestimonyEntry;
  number: number;
};

function TestimonySet({ carousel = false, testimonies, pageSize }: TestimonySetProps) {
  const [page, setPage] = useState(0);
  const [activeTestimony, setActiveTestimony] = useState<ActiveTestimony | null>(null);
  const closeActiveTestimony = useCallback(() => setActiveTestimony(null), []);
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
      {carousel ? (
        <AutoScrollRail
          ariaLabel="testimonies"
          className="testimony-card-grid testimony-card-rail"
        >
          {pagedItems.map((item, index) => (
            <TestimonyCard
              item={item}
              key={`${item.name}-${item.title}`}
              number={safePage * pageSize + index + 1}
              onOpen={() => setActiveTestimony({ item, number: safePage * pageSize + index + 1 })}
            />
          ))}
        </AutoScrollRail>
      ) : (
        <div className="testimony-card-grid">
          {pagedItems.map((item, index) => (
            <TestimonyCard
              item={item}
              key={`${item.name}-${item.title}`}
              number={safePage * pageSize + index + 1}
              onOpen={() => setActiveTestimony({ item, number: safePage * pageSize + index + 1 })}
            />
          ))}
        </div>
      )}

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

      {activeTestimony ? (
        <TestimonyModal
          item={activeTestimony.item}
          number={activeTestimony.number}
          onClose={closeActiveTestimony}
        />
      ) : null}
    </>
  );
}

function TestimonyCard({
  item,
  number,
  onOpen,
}: {
  item: TestimonyEntry;
  number: number;
  onOpen: () => void;
}) {
  const hasVideo = Boolean(item.videoUrl);
  const detailLabel = hasVideo ? "Watch testimony" : "Read full testimony";

  return (
    <article className="testimony-story-card">
      <div className="testimony-story-card-head">
        <span className="testimony-ledger-number">
          {String(number).padStart(2, "0")}
        </span>
        <span className="testimony-pill">{item.highlight}</span>
      </div>
      <h3>{item.title}</h3>
      <p>&quot;{item.content[0]}&quot;</p>
      <div className="testimony-detail">
        <button type="button" className="testimony-detail-trigger" onClick={onOpen}>
          <span>{detailLabel}</span>
          <CaretRight size={16} weight="bold" aria-hidden="true" />
        </button>
      </div>
      <footer>
        <span>{initials(item.name)}</span>
        <strong>{item.name}</strong>
      </footer>
    </article>
  );
}

function TestimonyMediaAndCopy({ item }: { item: TestimonyEntry }) {
  const hasImages = Boolean(item.images?.length);
  const hasMedia = hasImages || Boolean(item.videoUrl);

  return (
    <div className={hasMedia ? "testimony-detail-body testimony-detail-body-with-media" : "testimony-detail-body"}>
      {item.videoUrl ? <VideoTestimonyPreview url={item.videoUrl} title={item.title} /> : null}
      {hasImages ? (
        <div
          className="testimony-image-gallery"
          data-count={item.images?.length}
          aria-label={`${item.title} testimony pictures`}
        >
          {item.images?.map((image, index) => (
            <figure className="testimony-image-frame" key={image.asset?._ref || index}>
              <SanityImage
                image={image}
                altFallback={`${item.title} testimony picture ${index + 1}`}
                width={520}
                height={390}
              />
            </figure>
          ))}
        </div>
      ) : null}
      <div className="testimony-detail-copy">
        {item.content.map((paragraph, index) => (
          <p key={`${item.title}-${index}`}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function TestimonyModal({
  item,
  number,
  onClose,
}: {
  item: TestimonyEntry;
  number: number;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLElement>(null);
  const titleId = `testimony-modal-title-${number}`;

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modalRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (!firstFocusable || !lastFocusable) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      if (document.activeElement === modalRef.current) {
        event.preventDefault();
        (event.shiftKey ? lastFocusable : firstFocusable).focus();
      } else if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="testimony-modal-layer">
      <button
        type="button"
        className="testimony-modal-backdrop"
        aria-label="Close testimony"
        onClick={onClose}
        tabIndex={-1}
      />
      <section
        ref={modalRef}
        className="testimony-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="testimony-modal-head">
          <div>
            <p className="testimony-kicker testimony-kicker-dark">
              Testimony {String(number).padStart(2, "0")}
            </p>
            <h2 id={titleId}>{item.title}</h2>
            <p>{item.highlight}</p>
          </div>
          <button type="button" className="testimony-modal-close" onClick={onClose} aria-label="Close testimony">
            <X size={20} weight="bold" aria-hidden="true" />
          </button>
        </header>

        <TestimonyMediaAndCopy item={item} />

        <footer className="testimony-modal-footer">
          <span>{initials(item.name)}</span>
          <strong>{item.name}</strong>
        </footer>
      </section>
    </div>
  );
}

function getVideoPreview(url: string) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsedUrl.pathname.split("/").filter(Boolean)[0];
      if (id) {
        return {
          provider: "YouTube",
          embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
          thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
      }
    }

    if (host.includes("youtube.com")) {
      const id =
        parsedUrl.searchParams.get("v") ||
        parsedUrl.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)?.[1];
      if (id) {
        return {
          provider: "YouTube",
          embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
          thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
      }
    }

    if (host.includes("vimeo.com")) {
      const id = parsedUrl.pathname.match(/\/(?:video\/)?(\d+)/)?.[1];
      if (id) {
        return {
          provider: "Vimeo",
          embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1`,
        };
      }
    }

    if (host.includes("tiktok.com")) {
      const id = parsedUrl.pathname.match(/\/video\/(\d+)/)?.[1];
      return {
        provider: "TikTok",
        embedUrl: id ? `https://www.tiktok.com/embed/v2/${id}` : undefined,
      };
    }

    if (host.includes("instagram.com")) {
      return { provider: "Instagram" };
    }

    if (host.includes("facebook.com") || host.includes("fb.watch")) {
      return { provider: "Facebook" };
    }

    return { provider: "Video" };
  } catch {
    return { provider: "Video" };
  }
}

function VideoTestimonyPreview({ title, url }: { title: string; url: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const preview = getVideoPreview(url);
  const canPlayInline = Boolean(preview.embedUrl);

  if (isPlaying && preview.embedUrl) {
    return (
      <div className="testimony-video-player">
        <iframe
          src={preview.embedUrl}
          title={`${title} video testimony`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (!canPlayInline) {
    return (
      <a
        className="testimony-video-preview testimony-video-preview-link"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <span className="testimony-video-preview-art" aria-hidden="true">
          <PlayCircle size={46} weight="fill" />
        </span>
        <span className="testimony-video-preview-copy">
          <span>{preview.provider} video testimony</span>
          <strong>{title}</strong>
          <small>Open the original video platform</small>
        </span>
        <ArrowSquareOut size={19} weight="bold" aria-hidden="true" />
      </a>
    );
  }

  return (
    <button
      type="button"
      className="testimony-video-preview"
      onClick={() => setIsPlaying(true)}
      aria-label={`Play ${title} video testimony`}
    >
      {preview.thumbnailUrl ? (
        <span
          className="testimony-video-thumbnail"
          style={{ backgroundImage: `url(${preview.thumbnailUrl})` }}
          aria-hidden="true"
        />
      ) : null}
      <span className="testimony-video-preview-art" aria-hidden="true">
        <PlayCircle size={52} weight="fill" />
      </span>
      <span className="testimony-video-preview-copy">
        <span>{preview.provider} video testimony</span>
        <strong>{title}</strong>
        <small>Play in browser</small>
      </span>
    </button>
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
        <TestimonySet carousel testimonies={testimonies} pageSize={mobilePageSize} />
      </div>
    </div>
  );
}
