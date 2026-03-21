import { screen } from "@testing-library/react";
import Stats from "./Stats";
import schema from "./Stats.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "counter-row" as const,
  content: { items: [{ label: "L", value: "V" }] },
};

describe("Stats", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(
      <Stats variant="counter-row" content={{ items: [{ label: "Users", value: "10" }] }} />,
    );
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("handles optional heading and affixes omitted", () => {
    renderWithTheme(
      <Stats variant="counter-row" content={{ items: [{ label: "L", value: "1" }] }} />,
    );
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("JSON schema accepts a known-good props object", () => {
    expect(validateAgainstSchema(schema as object, goodProps)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, { variant: "counter-row" })).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: "counter-row",
        content: { items: [{ label: "a", value: 9 }] },
      }),
    ).toBe(false);
  });

  describe("variant counter-row", () => {
    it("does not render icons", () => {
      const { container } = renderWithTheme(
        <Stats variant="counter-row" content={{ items: [{ label: "L", value: "V" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".stats_icon")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Stats variant="counter-row" content={{ items: [{ label: "L", value: "V" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant featured", () => {
    it("renders stat list", () => {
      const { container } = renderWithTheme(
        <Stats variant="featured" content={{ items: [{ label: "L", value: "V" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".stats_list")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Stats variant="featured" content={{ items: [{ label: "L", value: "V" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant with-icons", () => {
    it("renders icon span per item", () => {
      const { container } = renderWithTheme(
        <Stats variant="with-icons" content={{ items: [{ label: "L", value: "V" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".stats_icon")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Stats variant="with-icons" content={{ items: [{ label: "L", value: "V" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
