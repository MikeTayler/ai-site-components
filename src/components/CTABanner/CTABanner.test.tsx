import { screen } from "@testing-library/react";
import CTABanner from "./CTABanner";
import schema from "./CTABanner.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "inline" as const,
  content: { heading: "H" },
};

describe("CTABanner", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(<CTABanner variant="inline" content={{ heading: "Hi" }} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Hi");
  });

  it("handles optional props omitted", () => {
    renderWithTheme(<CTABanner variant="inline" content={{ heading: "X" }} />);
    expect(screen.queryByText(/sub/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("JSON schema accepts a known-good props object", () => {
    expect(validateAgainstSchema(schema as object, goodProps)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, {})).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: true,
        content: { heading: "a" },
      }),
    ).toBe(false);
  });

  describe("variant inline", () => {
    it("renders CTA text block without image visual", () => {
      const { container } = renderWithTheme(
        <CTABanner variant="inline" content={{ heading: "T" }} />,
      );
      const root = snapshotRoot(container);
      expect(root.querySelector(".ctaBanner_visual")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <CTABanner variant="inline" content={{ heading: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant full-width", () => {
    it("applies full-width modifier class", () => {
      const { container } = renderWithTheme(
        <CTABanner variant="full-width" content={{ heading: "T" }} />,
      );
      expect(snapshotRoot(container)).toHaveClass("ctaBanner--full-width");
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <CTABanner variant="full-width" content={{ heading: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant with-image", () => {
    it("renders visual placeholder alongside text", () => {
      const { container } = renderWithTheme(
        <CTABanner variant="with-image" content={{ heading: "T" }} />,
      );
      expect(snapshotRoot(container).querySelector(".ctaBanner_visual")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <CTABanner variant="with-image" content={{ heading: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
