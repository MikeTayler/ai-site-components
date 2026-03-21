import { screen } from "@testing-library/react";
import Testimonials from "./Testimonials";
import schema from "./Testimonials.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "cards" as const,
  content: { items: [{ quote: "Q", author: "A" }] },
};

describe("Testimonials", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(
      <Testimonials variant="cards" content={{ items: [{ quote: "Hi", author: "Me" }] }} />,
    );
    expect(screen.getByText("Hi")).toBeInTheDocument();
  });

  it("handles optional heading and role omitted", () => {
    renderWithTheme(
      <Testimonials variant="cards" content={{ items: [{ quote: "Q", author: "A" }] }} />,
    );
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("JSON schema accepts a known-good props object", () => {
    expect(validateAgainstSchema(schema as object, goodProps)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, { variant: "cards" })).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: "cards",
        content: { items: [{ quote: 1, author: "a" }] },
      }),
    ).toBe(false);
  });

  describe("variant cards", () => {
    it("renders blockquote list", () => {
      const { container } = renderWithTheme(
        <Testimonials variant="cards" content={{ items: [{ quote: "Q", author: "A" }] }} />,
      );
      expect(snapshotRoot(container).querySelector("blockquote")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Testimonials variant="cards" content={{ items: [{ quote: "Q", author: "A" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant featured", () => {
    it("applies featured list class", () => {
      const { container } = renderWithTheme(
        <Testimonials variant="featured" content={{ items: [{ quote: "Q", author: "A" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".testimonials_list--featured")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Testimonials variant="featured" content={{ items: [{ quote: "Q", author: "A" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant carousel", () => {
    it("applies carousel list class", () => {
      const { container } = renderWithTheme(
        <Testimonials variant="carousel" content={{ items: [{ quote: "Q", author: "A" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".testimonials_list--carousel")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Testimonials variant="carousel" content={{ items: [{ quote: "Q", author: "A" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
