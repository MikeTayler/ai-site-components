import { screen } from "@testing-library/react";
import TextContent from "./TextContent";
import schema from "./TextContent.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "single-column" as const,
  content: { paragraphs: ["P"] },
};

describe("TextContent", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(
      <TextContent variant="single-column" content={{ paragraphs: ["One para"] }} />,
    );
    expect(screen.getByText("One para")).toBeInTheDocument();
  });

  it("handles optional heading and aside omitted", () => {
    renderWithTheme(<TextContent variant="single-column" content={{ paragraphs: ["A"] }} />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("JSON schema accepts a known-good props object", () => {
    expect(validateAgainstSchema(schema as object, goodProps)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, { variant: "single-column" })).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: "single-column",
        content: { paragraphs: "bad" },
      }),
    ).toBe(false);
  });

  describe("variant single-column", () => {
    it("renders main column without aside", () => {
      const { container } = renderWithTheme(
        <TextContent variant="single-column" content={{ paragraphs: ["X"] }} />,
      );
      expect(snapshotRoot(container).querySelector(".textContent_aside")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <TextContent variant="single-column" content={{ paragraphs: ["Snap"] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant two-column", () => {
    it("does not render sidebar aside", () => {
      const { container } = renderWithTheme(
        <TextContent variant="two-column" content={{ paragraphs: ["A", "B"] }} />,
      );
      expect(snapshotRoot(container).querySelector(".textContent_aside")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <TextContent variant="two-column" content={{ paragraphs: ["A", "B"] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant with-sidebar", () => {
    it("renders aside when aside content exists", () => {
      const { container } = renderWithTheme(
        <TextContent
          variant="with-sidebar"
          content={{
            paragraphs: ["Main"],
            asideTitle: "Side",
            asideParagraphs: ["Aside"],
          }}
        />,
      );
      expect(snapshotRoot(container).querySelector(".textContent_aside")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <TextContent
          variant="with-sidebar"
          content={{
            paragraphs: ["Main"],
            asideTitle: "Side",
            asideParagraphs: ["Aside"],
          }}
        />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
