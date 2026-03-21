import "./FAQAccordion.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type FAQAccordionVariant = "simple" | "grouped";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQGroup {
  title: string;
  items: FAQItem[];
}

export interface FAQAccordionContent {
  heading?: string;
  faqs?: FAQItem[];
  groups?: FAQGroup[];
}

export interface FAQAccordionSettings {
  maxWidth?: "narrow" | "wide" | "full";
}

export interface FAQAccordionProps {
  variant: FAQAccordionVariant;
  content: FAQAccordionContent;
  settings?: FAQAccordionSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<FAQAccordionSettings> = {
  maxWidth: "wide",
};

export default function FAQAccordion(props: FAQAccordionProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const { heading, faqs = [], groups = [] } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  const simpleList = (
    <div className="faqAccordion_list">
      {faqs.map((item, i) => (
        <details key={i} className="faqAccordion_details">
          <summary
            className="faqAccordion_summary"
            data-content-path={p(`content.faqs[${i}].question`)}
          >
            {item.question}
          </summary>
          <div className="faqAccordion_answer" data-content-path={p(`content.faqs[${i}].answer`)}>
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );

  const groupedList = (
    <div className="faqAccordion_groups">
      {groups.map((group, gi) => (
        <section key={gi} className="faqAccordion_group">
          <h3
            className="faqAccordion_groupTitle"
            data-content-path={p(`content.groups[${gi}].title`)}
          >
            {group.title}
          </h3>
          {group.items.map((item, ii) => (
            <details key={ii} className="faqAccordion_details">
              <summary
                className="faqAccordion_summary"
                data-content-path={p(`content.groups[${gi}].items[${ii}].question`)}
              >
                {item.question}
              </summary>
              <div
                className="faqAccordion_answer"
                data-content-path={p(`content.groups[${gi}].items[${ii}].answer`)}
              >
                {item.answer}
              </div>
            </details>
          ))}
        </section>
      ))}
    </div>
  );

  return (
    <section
      className={["faqAccordion", `faqAccordion--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-max-width={settings.maxWidth}
    >
      <div className="faqAccordion_inner">
        {heading ? (
          <h2 className="faqAccordion_heading" data-content-path={p("content.heading")}>
            {heading}
          </h2>
        ) : null}
        {variant === "grouped" ? groupedList : simpleList}
      </div>
    </section>
  );
}
