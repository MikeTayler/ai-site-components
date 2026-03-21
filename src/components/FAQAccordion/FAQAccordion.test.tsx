import { screen } from "@testing-library/react";
import FAQAccordion from "./FAQAccordion";
import schema from "./FAQAccordion.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodPropsSimple = {
  variant: "simple" as const,
  content: {
    faqs: [{ question: "Q", answer: "A" }],
  },
};

const goodPropsGrouped = {
  variant: "grouped" as const,
  content: {
    groups: [{ title: "G", items: [{ question: "Q", answer: "A" }] }],
  },
};

describe("FAQAccordion", () => {
  it("renders without crashing with only required props (simple)", () => {
    renderWithTheme(
      <FAQAccordion variant="simple" content={{ faqs: [{ question: "Q", answer: "A" }] }} />,
    );
    expect(screen.getByText("Q")).toBeInTheDocument();
  });

  it("handles optional heading omitted", () => {
    renderWithTheme(
      <FAQAccordion variant="simple" content={{ faqs: [{ question: "Q", answer: "A" }] }} />,
    );
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("JSON schema accepts known-good simple props", () => {
    expect(validateAgainstSchema(schema as object, goodPropsSimple)).toBe(true);
  });

  it("JSON schema accepts known-good grouped props", () => {
    expect(validateAgainstSchema(schema as object, goodPropsGrouped)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, {})).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: "simple",
        content: { faqs: [{ question: 1, answer: "a" }] },
      }),
    ).toBe(false);
  });

  describe("variant simple", () => {
    it("renders flat faq list", () => {
      const { container } = renderWithTheme(
        <FAQAccordion variant="simple" content={{ faqs: [{ question: "Q", answer: "A" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".faqAccordion_list")).toBeInTheDocument();
      expect(snapshotRoot(container).querySelector(".faqAccordion_groups")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <FAQAccordion variant="simple" content={{ faqs: [{ question: "Q", answer: "A" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant grouped", () => {
    it("renders grouped sections", () => {
      const { container } = renderWithTheme(
        <FAQAccordion
          variant="grouped"
          content={{
            groups: [{ title: "Topic", items: [{ question: "Q", answer: "A" }] }],
          }}
        />,
      );
      expect(snapshotRoot(container).querySelector(".faqAccordion_groups")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 3, name: "Topic" })).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <FAQAccordion
          variant="grouped"
          content={{
            groups: [{ title: "G", items: [{ question: "Q", answer: "A" }] }],
          }}
        />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
