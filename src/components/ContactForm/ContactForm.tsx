import "./ContactForm.css";
import type { ReactNode } from "react";
import { joinPath } from "../../lib/joinPath.js";

export type ContactFormVariant = "simple" | "with-map" | "split";

export interface ContactFormContent {
  heading: string;
  description?: string;
  submitLabel?: string;
  nameLabel?: string;
  emailLabel?: string;
  messageLabel?: string;
}

export interface ContactFormSettings {
  maxWidth?: "narrow" | "wide" | "full";
}

export interface ContactFormProps {
  variant: ContactFormVariant;
  content: ContactFormContent;
  settings?: ContactFormSettings;
  className?: string;
  contentPathPrefix?: string;
}

const defaultSettings: Required<ContactFormSettings> = {
  maxWidth: "wide",
};

export default function ContactForm(props: ContactFormProps): ReactNode {
  const { variant, content, className, contentPathPrefix = "" } = props;
  const settings = { ...defaultSettings, ...(props.settings ?? {}) };
  const {
    heading,
    description,
    submitLabel = "Send",
    nameLabel = "Name",
    emailLabel = "Email",
    messageLabel = "Message",
  } = content;
  const p = (s: string) => joinPath(contentPathPrefix, s);

  const form = (
    <form
      className="contactForm_form"
      onSubmit={(e) => e.preventDefault()}
      aria-labelledby="contactForm-heading"
    >
      <h2
        id="contactForm-heading"
        className="contactForm_heading"
        data-content-path={p("content.heading")}
      >
        {heading}
      </h2>
      {description ? (
        <p className="contactForm_desc" data-content-path={p("content.description")}>
          {description}
        </p>
      ) : null}
      <label className="contactForm_label">
        <span data-content-path={p("content.nameLabel")}>{nameLabel}</span>
        <input className="contactForm_input" type="text" name="name" autoComplete="name" />
      </label>
      <label className="contactForm_label">
        <span data-content-path={p("content.emailLabel")}>{emailLabel}</span>
        <input className="contactForm_input" type="email" name="email" autoComplete="email" />
      </label>
      <label className="contactForm_label">
        <span data-content-path={p("content.messageLabel")}>{messageLabel}</span>
        <textarea className="contactForm_textarea" name="message" rows={5} />
      </label>
      <button
        type="submit"
        className="contactForm_submit"
        data-content-path={p("content.submitLabel")}
      >
        {submitLabel}
      </button>
    </form>
  );

  const mapPlaceholder =
    variant === "with-map" || variant === "split" ? (
      <div className="contactForm_map" role="presentation" aria-hidden />
    ) : null;

  return (
    <section
      className={["contactForm", `contactForm--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-max-width={settings.maxWidth}
    >
      <div className="contactForm_inner">
        {form}
        {mapPlaceholder}
      </div>
    </section>
  );
}
