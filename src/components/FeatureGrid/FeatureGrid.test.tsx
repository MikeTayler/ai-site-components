import { screen } from "@testing-library/react";
import FeatureGrid from "./FeatureGrid";
import schema from "./FeatureGrid.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "three-column" as const,
  content: { heading: "H", items: [{ title: "T" }] },
};

describe("FeatureGrid", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(
      <FeatureGrid variant="three-column" content={{ heading: "Hi", items: [{ title: "A" }] }} />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Hi");
  });

  it("handles optional props omitted on items", () => {
    renderWithTheme(
      <FeatureGrid
        variant="three-column"
        content={{ heading: "H", items: [{ title: "Only" }] }}
      />,
    );
    expect(screen.queryByText("Desc")).not.toBeInTheDocument();
  });

  it("JSON schema accepts a known-good props object", () => {
    expect(validateAgainstSchema(schema as object, goodProps)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, { variant: "three-column" })).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: "three-column",
        content: { heading: "h", items: "nope" },
      }),
    ).toBe(false);
  });

  describe("variant three-column", () => {
    it("does not render feature visuals", () => {
      const { container } = renderWithTheme(
        <FeatureGrid
          variant="three-column"
          content={{ heading: "H", items: [{ title: "I" }] }}
        />,
      );
      expect(snapshotRoot(container).querySelector(".featureGrid_visual")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <FeatureGrid
          variant="three-column"
          content={{ heading: "Snap", items: [{ title: "One" }] }}
        />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant two-column-images", () => {
    it("renders visuals for each item", () => {
      const { container } = renderWithTheme(
        <FeatureGrid
          variant="two-column-images"
          content={{ heading: "H", items: [{ title: "I" }] }}
        />,
      );
      expect(snapshotRoot(container).querySelector(".featureGrid_visual")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <FeatureGrid
          variant="two-column-images"
          content={{ heading: "Snap", items: [{ title: "One" }] }}
        />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant alternating", () => {
    it("renders visuals for alternating layout", () => {
      const { container } = renderWithTheme(
        <FeatureGrid
          variant="alternating"
          content={{ heading: "H", items: [{ title: "I" }] }}
        />,
      );
      expect(snapshotRoot(container).querySelector(".featureGrid_visual")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <FeatureGrid
          variant="alternating"
          content={{ heading: "Snap", items: [{ title: "One" }] }}
        />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
