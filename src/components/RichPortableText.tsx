import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { urlFor } from "@/sanity/image";
import type {
  Event,
  PhilanthropyUpdate,
  Post,
  SanityImage as SanityImageType,
  SanityMediaEmbed,
  SanityMediaFile,
} from "@/sanity/types";

type RichPortableTextProps = {
  value?: Event["body"] | PhilanthropyUpdate["body"] | Post["body"];
  emptyText: string;
};

type LinkValue = {
  href?: string;
  openInNewTab?: boolean;
};

function getVideoEmbedUrl(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v") || url.pathname.split("/embed/")[1];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (url.hostname.includes("vimeo.com")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    return value;
  } catch {
    return value;
  }
}

function isDirectVideoUrl(value?: string) {
  return Boolean(value?.match(/\.(mp4|webm|ogg)(\?.*)?$/i));
}

function isDirectAudioUrl(value?: string) {
  return Boolean(value?.match(/\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i));
}

function ImageBlock({ value }: { value: SanityImageType }) {
  const imageUrl = urlFor(value)?.width(1280).height(760).fit("max").url();

  if (!imageUrl) return null;

  return (
    <figure className="rich-media">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#07120d]">
        <Image
          src={imageUrl}
          alt={value.alt || value.caption || "Content image"}
          fill
          sizes="(min-width: 1024px) 820px, 100vw"
          className="object-cover"
        />
      </div>
      {value.caption ? <figcaption>{value.caption}</figcaption> : null}
    </figure>
  );
}

function VideoEmbedBlock({ value }: { value: SanityMediaEmbed }) {
  const embedUrl = getVideoEmbedUrl(value.url);

  if (!embedUrl) return null;

  if (isDirectVideoUrl(embedUrl)) {
    return (
      <figure className="rich-media">
        <video controls preload="metadata" src={embedUrl} />
        {value.caption ? <figcaption>{value.caption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure className="rich-media">
      <iframe
        src={embedUrl}
        title={value.title || "Embedded video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      {value.caption ? <figcaption>{value.caption}</figcaption> : null}
    </figure>
  );
}

function VideoFileBlock({ value }: { value: SanityMediaFile }) {
  const source = value.asset?.url;

  if (!source) return null;

  return (
    <figure className="rich-media">
      {value.title ? <p className="rich-media-title">{value.title}</p> : null}
      <video controls preload="metadata" src={source} />
      {value.caption ? <figcaption>{value.caption}</figcaption> : null}
    </figure>
  );
}

function AudioBlock({ value }: { value: SanityMediaEmbed | SanityMediaFile }) {
  const isFile = value._type === "audioFile";
  const source = isFile ? value.asset?.url : (value as SanityMediaEmbed).url;

  if (!source) return null;

  if (!isDirectAudioUrl(source) && !isFile) {
    return (
      <figure className="rich-media rich-media-audio">
        {value.title ? <p className="rich-media-title">{value.title}</p> : null}
        <a href={source} target="_blank" rel="noreferrer">
          Open audio
        </a>
        {value.caption ? <figcaption>{value.caption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure className="rich-media rich-media-audio">
      {value.title ? <p className="rich-media-title">{value.title}</p> : null}
      <audio controls preload="metadata" src={source} />
      {value.caption ? <figcaption>{value.caption}</figcaption> : null}
    </figure>
  );
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const link = value as LinkValue | undefined;
      const openInNewTab = link?.openInNewTab ?? true;

      if (!link?.href) return <>{children}</>;

      return (
        <a
          href={link.href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => <ImageBlock value={value as SanityImageType} />,
    videoEmbed: ({ value }) => <VideoEmbedBlock value={value as SanityMediaEmbed} />,
    videoFile: ({ value }) => <VideoFileBlock value={value as SanityMediaFile} />,
    audioEmbed: ({ value }) => <AudioBlock value={value as SanityMediaEmbed} />,
    audioFile: ({ value }) => <AudioBlock value={value as SanityMediaFile} />,
  },
};

export function RichPortableText({ value, emptyText }: RichPortableTextProps) {
  if (!value?.length) {
    return <p>{emptyText}</p>;
  }

  return <PortableText value={value as TypedObject[]} components={components} />;
}
