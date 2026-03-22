import "./SiteHeader.css";
import type { ReactNode } from "react";
import { SiteImage } from "@site/image";
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
  /** Brand logos: `light` = for dark surfaces (e.g. primary header); `dark` = for light surfaces. */
  logo?: { light: string; dark: string };
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

function logoSrcForBackground(
  logo: { light: string; dark: string },
  bg: SiteHeaderBackground,
): string {
  if (bg === "primary") return logo.light;
  return logo.dark;
}

export default function SiteHeader(props: SiteHeaderProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { siteTitle, navLinks, cta, logo } = content;
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
          {logo ? (
            <SiteImage
              src={logoSrcForBackground(logo, settings.background)}
              alt={siteTitle}
              width={200}
              height={53}
              sizeContext="thumbnail"
              sizes="200px"
              className="siteHeader_logo"
              objectFit="contain"
              priority
            />
          ) : (
            siteTitle
          )}
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
