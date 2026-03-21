import "./SiteHeader.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type SiteHeaderVariant = "centered" | "left-aligned" | "transparent" | "sticky";

export interface SiteHeaderNavLink {
  label: string;
  href: string;
}

export interface SiteHeaderContent {
  siteTitle: string;
  navLinks: SiteHeaderNavLink[];
  cta?: { label: string; href: string };
}

export type SiteHeaderBackground = "background" | "neutral" | "primary" | "transparent";
export type SiteHeaderMaxWidth = "narrow" | "wide" | "full";

export interface SiteHeaderSettings {
  background?: SiteHeaderBackground;
  maxWidth?: SiteHeaderMaxWidth;
}

export interface SiteHeaderProps {
  variant: SiteHeaderVariant;
  content: SiteHeaderContent;
  settings?: SiteHeaderSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<SiteHeaderSettings> = {
  background: "background",
  maxWidth: "wide",
};

export default function SiteHeader(props: SiteHeaderProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { siteTitle, navLinks, cta } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  const rootClass = [
    "siteHeader",
    `siteHeader--${variant}`,
    (variant === "transparent" || settings.background === "transparent") &&
      "siteHeader--bgTransparent",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={rootClass}
      data-variant={variant}
      data-max-width={settings.maxWidth}
      data-bg={settings.background}
    >
      <div className="siteHeader_inner">
        <a className="siteHeader_brand" href="/" data-content-path={p("content.siteTitle")}>
          {siteTitle}
        </a>
        <nav className="siteHeader_nav" aria-label="Primary">
          <ul className="siteHeader_navList">
            {navLinks.map((link, i) => (
              <li key={`${link.href}-${i}`} className="siteHeader_navItem">
                <a
                  className="siteHeader_link"
                  href={link.href}
                  data-content-path={p(`content.navLinks[${i}].label`)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {cta ? (
          <a className="siteHeader_cta" href={cta.href} data-content-path={p("content.cta.label")}>
            {cta.label}
          </a>
        ) : null}
      </div>
    </header>
  );
}
