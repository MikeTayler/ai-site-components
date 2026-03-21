import "./Testimonials.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type TestimonialsVariant = "cards" | "featured" | "carousel";

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
}

export interface TestimonialsContent {
  heading?: string;
  items: TestimonialItem[];
}

export interface TestimonialsSettings {
  maxWidth?: "narrow" | "wide" | "full";
}

export interface TestimonialsProps {
  variant: TestimonialsVariant;
  content: TestimonialsContent;
  settings?: TestimonialsSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<TestimonialsSettings> = {
  maxWidth: "wide",
};

export default function Testimonials(props: TestimonialsProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, items } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  const list = (
    <ul
      className={[
        "testimonials_list",
        variant === "carousel" && "testimonials_list--carousel",
        variant === "featured" && "testimonials_list--featured",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className={[
            "testimonials_card",
            variant === "featured" && i === 0 && "testimonials_card--featured",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <blockquote
            className="testimonials_quote"
            data-content-path={p(`content.items[${i}].quote`)}
          >
            {item.quote}
          </blockquote>
          <cite className="testimonials_cite">
            <span
              className="testimonials_author"
              data-content-path={p(`content.items[${i}].author`)}
            >
              {item.author}
            </span>
            {item.role ? (
              <span className="testimonials_role" data-content-path={p(`content.items[${i}].role`)}>
                {item.role}
              </span>
            ) : null}
          </cite>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className={["testimonials", `testimonials--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-max-width={settings.maxWidth}
    >
      <div className="testimonials_inner">
        {heading ? (
          <h2 className="testimonials_heading" data-content-path={p("content.heading")}>
            {heading}
          </h2>
        ) : null}
        {list}
      </div>
    </section>
  );
}
