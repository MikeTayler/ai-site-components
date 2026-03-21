import "./CTABanner.css";
import type { ReactNode } from "react";
import { SiteImage } from "@site/image";
import { joinPath } from "../../lib/joinPath.js";

export type CTABannerVariant = "inline" | "full-width" | "with-image";

export interface CTABannerCta {
  label: string;
  href: string;
}

export interface CTABannerImage {
  src: string;
  alt: string;
  focalPoint?: { x: number; y: number };
  width?: number;
  height?: number;
}

export interface CTABannerContent {
  heading: string;
  subheading?: string;
  cta?: CTABannerCta;
  /** Shown in the `with-image` variant */
  image?: CTABannerImage;
}

export type CTABannerBackground = "primary" | "accent" | "neutral" | "background";

export interface CTABannerSettings {
  background?: CTABannerBackground;
}

export interface CTABannerProps {
  variant: CTABannerVariant;
  content: CTABannerContent;
  settings?: CTABannerSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<CTABannerSettings> = {
  background: "accent",
};

export default function CTABanner(props: CTABannerProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, subheading, cta, image } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  const inner = (
    <div className="ctaBanner_text">
      <h2 className="ctaBanner_heading" data-content-path={p("content.heading")}>
        {heading}
      </h2>
      {subheading ? (
        <p className="ctaBanner_sub" data-content-path={p("content.subheading")}>
          {subheading}
        </p>
      ) : null}
      {cta ? (
        <a className="ctaBanner_btn" href={cta.href} data-content-path={p("content.cta.label")}>
          {cta.label}
        </a>
      ) : null}
    </div>
  );

  return (
    <section
      className={["ctaBanner", `ctaBanner--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-bg={settings.background}
    >
      <div className="ctaBanner_inner">
        {variant === "with-image" ? (
          <>
            {inner}
            <div className="ctaBanner_visual ctaBanner_visual--media">
              <SiteImage
                src={image?.src ?? ""}
                alt={image?.alt ?? heading}
                focalPoint={image?.focalPoint}
                width={image?.width}
                height={image?.height}
                fill
                sizeContext="cta"
                contentPathPrefix={p("content.image")}
              />
            </div>
          </>
        ) : (
          inner
        )}
      </div>
    </section>
  );
}
