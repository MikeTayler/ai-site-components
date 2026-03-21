import "./TextContent.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type TextContentVariant = "single-column" | "two-column" | "with-sidebar";

export interface TextContentContent {
  heading?: string;
  paragraphs: string[];
  asideTitle?: string;
  asideParagraphs?: string[];
}

export interface TextContentSettings {
  maxWidth?: "narrow" | "wide" | "full";
}

export interface TextContentProps {
  variant: TextContentVariant;
  content: TextContentContent;
  settings?: TextContentSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<TextContentSettings> = {
  maxWidth: "wide",
};

export default function TextContent(props: TextContentProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, paragraphs, asideTitle, asideParagraphs = [] } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  const main = (
    <div className="textContent_main">
      {heading ? (
        <h2 className="textContent_heading" data-content-path={p("content.heading")}>
          {heading}
        </h2>
      ) : null}
      {paragraphs.map((para, i) => (
        <p key={i} className="textContent_para" data-content-path={p(`content.paragraphs[${i}]`)}>
          {para}
        </p>
      ))}
    </div>
  );

  const showAside =
    variant === "with-sidebar" && (Boolean(asideTitle) || asideParagraphs.length > 0);

  const aside = showAside ? (
    <aside className="textContent_aside" aria-label="Sidebar">
      {asideTitle ? (
        <h3 className="textContent_asideTitle" data-content-path={p("content.asideTitle")}>
          {asideTitle}
        </h3>
      ) : null}
      {asideParagraphs.map((para, i) => (
        <p
          key={i}
          className="textContent_para"
          data-content-path={p(`content.asideParagraphs[${i}]`)}
        >
          {para}
        </p>
      ))}
    </aside>
  ) : null;

  return (
    <section
      className={["textContent", `textContent--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-max-width={settings.maxWidth}
    >
      <div className="textContent_inner">
        {main}
        {aside}
      </div>
    </section>
  );
}
