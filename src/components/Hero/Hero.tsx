import "./Hero.css";
import type { ReactNode } from "react";
import { SiteImage } from "@site/image";
import { joinPath } from "../../lib/joinPath.js";

/** JSON / registry variant names (kebab-case in page JSON). */
export type HeroVariant = "centered" | "split" | "full-bleed" | "video";

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroImage {
  src: string;
  alt: string;
  focalPoint?: { x: number; y: number };
  width?: number;
  height?: number;
}

export interface HeroContent {
  heading: string;
  subheading?: string;
  cta?: HeroCta;
  /** Used by `video` variant — embed URL or direct .mp4/.webm URL */
  videoUrl?: string;
  posterImageUrl?: string;
  /** Optional hero visual for `split` (and similar) layouts */
  image?: HeroImage;
}

export type HeroBackground = "primary" | "neutral" | "background" | "accent";
export type HeroSpacing = "compact" | "normal" | "relaxed";
export type HeroMaxWidth = "narrow" | "wide" | "full";

export interface HeroSettings {
  spacing?: HeroSpacing;
  background?: HeroBackground;
  maxWidth?: HeroMaxWidth;
}

export interface HeroProps {
  variant: HeroVariant;
  /** At minimum `heading` is required; other fields are optional. */
  content: HeroContent;
  settings?: HeroSettings;
  className?: string;
  /** Prepended to `data-content-path` for the visual editor (e.g. `pages.home.sections[0]`). */
  contentPathPrefix?: string;
}

const defaultSettings: Required<HeroSettings> = {
  spacing: "normal",
  background: "background",
  maxWidth: "wide",
};

function isVideoFileUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

function VideoMedia({ url, poster }: { url: string; poster?: string }): ReactNode {
  if (isVideoFileUrl(url)) {
    return (
      <div className="hero_videoWrap">
        <video className="hero_video" controls playsInline src={url} poster={poster} />
      </div>
    );
  }
  return (
    <div className="hero_videoWrap">
      <iframe
        className="hero_videoFrame"
        src={url}
        title="Hero video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default function Hero(props: HeroProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, subheading, cta, videoUrl, posterImageUrl, image } = content;

  const spacing = settings.spacing;
  const bg = settings.background;
  const maxWidth = settings.maxWidth;

  const p = (segment: string) => joinPath(contentPathPrefix, segment);

  const rootClass = [
    "hero",
    (variant === "centered" || variant === "full-bleed") && "hero_centered",
    variant === "full-bleed" && "hero_fullBleed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const innerClass = [
    "hero_inner",
    variant === "split" || variant === "video" ? "hero_split" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const textBlock = (
    <div className="hero_text">
      <h1 className="hero_heading" data-content-path={p("content.heading")}>
        {heading}
      </h1>
      {subheading ? (
        <p className="hero_subheading" data-content-path={p("content.subheading")}>
          {subheading}
        </p>
      ) : null}
      {cta ? (
        <a className="hero_cta" href={cta.href} data-content-path={p("content.cta.label")}>
          {cta.label}
        </a>
      ) : null}
    </div>
  );

  const visualPlaceholder = <div className="hero_visual" aria-hidden />;

  let body: ReactNode;

  if (variant === "split") {
    body = (
      <>
        {textBlock}
        <div className={`hero_visual hero_visual--media`}>
          <SiteImage
            src={image?.src ?? ""}
            alt={image?.alt ?? "Hero visual"}
            focalPoint={image?.focalPoint}
            width={image?.width}
            height={image?.height}
            fill
            sizeContext="hero"
            contentPathPrefix={p("content.image")}
          />
        </div>
      </>
    );
  } else if (variant === "video") {
    body = (
      <>
        {textBlock}
        {videoUrl ? <VideoMedia url={videoUrl} poster={posterImageUrl} /> : visualPlaceholder}
      </>
    );
  } else {
    body = textBlock;
  }

  return (
    <section className={rootClass} data-spacing={spacing} data-bg={bg} data-variant={variant}>
      <div className={innerClass} data-max-width={maxWidth}>
        {body}
      </div>
    </section>
  );
}
