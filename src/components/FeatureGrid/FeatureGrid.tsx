import "./FeatureGrid.css";
import type { ReactNode } from "react";
import { SiteImage } from "@site/image";
import { joinPath } from "../../lib/joinPath.js";

export type FeatureGridVariant = "three-column" | "two-column-images" | "alternating";

export interface FeatureGridImage {
  src: string;
  alt: string;
  focalPoint?: { x: number; y: number };
  width?: number;
  height?: number;
}

export interface FeatureGridItem {
  title: string;
  description?: string;
  image?: FeatureGridImage;
}

export interface FeatureGridContent {
  heading: string;
  items: FeatureGridItem[];
}

export type FeatureGridMaxWidth = "narrow" | "wide" | "full";

export interface FeatureGridSettings {
  maxWidth?: FeatureGridMaxWidth;
}

export interface FeatureGridProps {
  variant: FeatureGridVariant;
  content: FeatureGridContent;
  settings?: FeatureGridSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<FeatureGridSettings> = {
  maxWidth: "wide",
};

export default function FeatureGrid(props: FeatureGridProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, items } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  return (
    <section
      className={["featureGrid", `featureGrid--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-max-width={settings.maxWidth}
    >
      <div className="featureGrid_inner">
        <h2 className="featureGrid_heading" data-content-path={p("content.heading")}>
          {heading}
        </h2>
        <ul className="featureGrid_list">
          {items.map((item, i) => (
            <li key={i} className="featureGrid_item">
              {(variant === "two-column-images" || variant === "alternating") && (
                <div className="featureGrid_visual featureGrid_visual--media">
                  <SiteImage
                    src={item.image?.src ?? ""}
                    alt={item.image?.alt ?? item.title}
                    focalPoint={item.image?.focalPoint}
                    width={item.image?.width}
                    height={item.image?.height}
                    fill
                    sizeContext="card"
                    contentPathPrefix={p(`content.items[${i}].image`)}
                  />
                </div>
              )}
              <div className="featureGrid_text">
                <h3
                  className="featureGrid_title"
                  data-content-path={p(`content.items[${i}].title`)}
                >
                  {item.title}
                </h3>
                {item.description ? (
                  <p
                    className="featureGrid_desc"
                    data-content-path={p(`content.items[${i}].description`)}
                  >
                    {item.description}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
