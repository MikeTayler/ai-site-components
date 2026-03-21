import "./Stats.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type StatsVariant = "counter-row" | "featured" | "with-icons";

export interface StatItem {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface StatsContent {
  heading?: string;
  items: StatItem[];
}

export interface StatsSettings {
  maxWidth?: "narrow" | "wide" | "full";
}

export interface StatsProps {
  variant: StatsVariant;
  content: StatsContent;
  settings?: StatsSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<StatsSettings> = {
  maxWidth: "wide",
};

export default function Stats(props: StatsProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, items } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  return (
    <section
      className={["stats", `stats--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-max-width={settings.maxWidth}
    >
      <div className="stats_inner">
        {heading ? (
          <h2 className="stats_heading" data-content-path={p("content.heading")}>
            {heading}
          </h2>
        ) : null}
        <ul className="stats_list">
          {items.map((item, i) => (
            <li key={i} className="stats_item">
              {variant === "with-icons" ? <span className="stats_icon" aria-hidden /> : null}
              <div className="stats_values">
                <span className="stats_value">
                  {item.prefix ? (
                    <span
                      className="stats_affix"
                      data-content-path={p(`content.items[${i}].prefix`)}
                    >
                      {item.prefix}
                    </span>
                  ) : null}
                  <span data-content-path={p(`content.items[${i}].value`)}>{item.value}</span>
                  {item.suffix ? (
                    <span
                      className="stats_affix"
                      data-content-path={p(`content.items[${i}].suffix`)}
                    >
                      {item.suffix}
                    </span>
                  ) : null}
                </span>
                <span className="stats_label" data-content-path={p(`content.items[${i}].label`)}>
                  {item.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
