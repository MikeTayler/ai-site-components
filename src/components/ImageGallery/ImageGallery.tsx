import "./ImageGallery.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type ImageGalleryVariant = "grid" | "masonry" | "lightbox";

export interface ImageGalleryItem {
  alt: string;
  caption?: string;
}

export interface ImageGalleryContent {
  heading?: string;
  items: ImageGalleryItem[];
}

export interface ImageGallerySettings {
  maxWidth?: "narrow" | "wide" | "full";
}

export interface ImageGalleryProps {
  variant: ImageGalleryVariant;
  content: ImageGalleryContent;
  settings?: ImageGallerySettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<ImageGallerySettings> = {
  maxWidth: "wide",
};

export default function ImageGallery(props: ImageGalleryProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, items } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  return (
    <section
      className={["imageGallery", `imageGallery--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-max-width={settings.maxWidth}
    >
      <div className="imageGallery_inner">
        {heading ? (
          <h2 className="imageGallery_heading" data-content-path={p("content.heading")}>
            {heading}
          </h2>
        ) : null}
        <ul className="imageGallery_list">
          {items.map((item, i) => (
            <li key={i} className="imageGallery_item">
              <div
                className="imageGallery_placeholder"
                role="img"
                aria-label={item.alt}
                data-content-path={p(`content.items[${i}].alt`)}
              />
              {item.caption ? (
                <p
                  className="imageGallery_caption"
                  data-content-path={p(`content.items[${i}].caption`)}
                >
                  {item.caption}
                </p>
              ) : null}
              {variant === "lightbox" ? (
                <button
                  type="button"
                  className="imageGallery_lightboxBtn"
                  disabled
                  aria-disabled="true"
                >
                  View
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
