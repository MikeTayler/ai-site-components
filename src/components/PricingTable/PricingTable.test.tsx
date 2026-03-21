import { screen } from "@testing-library/react";
import PricingTable from "./PricingTable";
import schema from "./PricingTable.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const tier = { name: "T", price: "1", features: ["f"] };

const goodProps = {
  variant: "simple" as const,
  content: { tiers: [tier] },
};

describe("PricingTable", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(
      <PricingTable variant="simple" content={{ tiers: [{ name: "P", price: "9", features: [] }] }} />,
    );
    expect(screen.getByText("P")).toBeInTheDocument();
  });

  it("handles optional heading and tier cta omitted", () => {
    renderWithTheme(<PricingTable variant="simple" content={{ tiers: [tier] }} />);
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("JSON schema accepts a known-good props object", () => {
    expect(validateAgainstSchema(schema as object, goodProps)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, { variant: "simple" })).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: "simple",
        content: { tiers: [{ name: "a", price: "1", features: "x" }] },
      }),
    ).toBe(false);
  });

  describe("variant tier-cards", () => {
    it("renders tier list not table", () => {
      const { container } = renderWithTheme(
        <PricingTable variant="tier-cards" content={{ tiers: [tier] }} />,
      );
      expect(snapshotRoot(container).querySelector(".pricingTable_table")).not.toBeInTheDocument();
      expect(snapshotRoot(container).querySelector(".pricingTable_tiers")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <PricingTable variant="tier-cards" content={{ tiers: [{ name: "Snap", price: "0", features: ["a"] }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant comparison", () => {
    it("renders comparison table", () => {
      const { container } = renderWithTheme(
        <PricingTable
          variant="comparison"
          content={{
            tiers: [
              { name: "A", price: "1", features: ["x"] },
              { name: "B", price: "2", features: ["x"] },
            ],
          }}
        />,
      );
      expect(snapshotRoot(container).querySelector(".pricingTable_table")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <PricingTable
          variant="comparison"
          content={{
            tiers: [
              { name: "A", price: "1", features: ["f"] },
              { name: "B", price: "2", features: ["f"] },
            ],
          }}
        />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant simple", () => {
    it("renders tier cards list", () => {
      const { container } = renderWithTheme(
        <PricingTable variant="simple" content={{ tiers: [tier] }} />,
      );
      expect(snapshotRoot(container).querySelector(".pricingTable_tier")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <PricingTable
          variant="simple"
          content={{ tiers: [{ name: "Snap", price: "0", features: ["a"] }] }}
        />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
