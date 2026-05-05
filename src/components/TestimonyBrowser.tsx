"use client";

import { useMemo, useState } from "react";
import { ArrowSquareOut, CaretDown, CaretLeft, CaretRight, PlayCircle } from "@phosphor-icons/react";
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

const desktopPageSize = 12;
const mobilePageSize = 6;

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

function TestimonySet({ carousel = false, testimonies, pageSize }: TestimonySetProps) {
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
            />
          ))}
        </div>
      )}
    </>
  );
}

function TestimonyCard({
  item,
  number,
}: {
  item: TestimonyEntry;
  number: number;
}) {
  const hasImages = Boolean(item.images?.length);
  const hasVideo = Boolean(item.videoUrl);
  const hasMedia = hasImages || hasVideo;
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
      <details className="testimony-detail">
        <summary>
          <span>{detailLabel}</span>
          <CaretDown size={16} weight="bold" aria-hidden="true" />
        </summary>
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
      </details>
      <footer>
        <span>{initials(item.name)}</span>
        <strong>{item.name}</strong>
      </footer>
    </article>
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
