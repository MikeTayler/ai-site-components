import "./SiteFooter.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type SiteFooterVariant = "simple" | "multi-column" | "newsletter";

export interface SiteFooterLink {
  label: string;
  href: string;
}

export interface SiteFooterColumn {
  heading?: string;
  links: SiteFooterLink[];
}

export interface SiteFooterContent {
  copyrightText: string;
  tagline?: string;
  columns?: SiteFooterColumn[];
  newsletterHeading?: string;
  newsletterPlaceholder?: string;
}

export type SiteFooterBackground = "neutral" | "background" | "primary";

export interface SiteFooterSettings {
  background?: SiteFooterBackground;
}

export interface SiteFooterProps {
  variant: SiteFooterVariant;
  content: SiteFooterContent;
  settings?: SiteFooterSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<SiteFooterSettings> = {
  background: "neutral",
};

export default function SiteFooter(props: SiteFooterProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const {
    copyrightText,
    tagline,
    columns = [],
    newsletterHeading,
    newsletterPlaceholder,
  } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  const newsletterBlock =
    variant === "newsletter" && newsletterHeading ? (
      <div className="siteFooter_newsletter">
        <p
          className="siteFooter_newsletterTitle"
          data-content-path={p("content.newsletterHeading")}
        >
          {newsletterHeading}
        </p>
        <form
          className="siteFooter_newsletterForm"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Newsletter signup"
        >
          <input
            className="siteFooter_input"
            type="email"
            name="email"
            placeholder={newsletterPlaceholder ?? "Email address"}
            aria-label={newsletterPlaceholder ?? "Email address"}
          />
          <button type="submit" className="siteFooter_submit">
            Subscribe
          </button>
        </form>
      </div>
    ) : null;

  const columnsBlock =
    (variant === "multi-column" || variant === "newsletter") && columns.length > 0 ? (
      <div className="siteFooter_grid">
        {columns.map((col, ci) => (
          <div key={ci} className="siteFooter_column">
            {col.heading ? (
              <h3
                className="siteFooter_columnTitle"
                data-content-path={p(`content.columns[${ci}].heading`)}
              >
                {col.heading}
              </h3>
            ) : null}
            <ul className="siteFooter_linkList">
              {col.links.map((link, li) => (
                <li key={`${link.href}-${li}`}>
                  <a
                    className="siteFooter_link"
                    href={link.href}
                    data-content-path={p(`content.columns[${ci}].links[${li}].label`)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <footer
      className={["siteFooter", `siteFooter--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-bg={settings.background}
    >
      <div className="siteFooter_inner">
        {newsletterBlock}
        {columnsBlock}
        <div className="siteFooter_bottom">
          {tagline ? (
            <p className="siteFooter_tagline" data-content-path={p("content.tagline")}>
              {tagline}
            </p>
          ) : null}
          <p className="siteFooter_copy" data-content-path={p("content.copyrightText")}>
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
