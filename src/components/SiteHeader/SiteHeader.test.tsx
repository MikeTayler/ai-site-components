import { screen } from "@testing-library/react";
import SiteHeader from "./SiteHeader";
import schema from "./SiteHeader.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const baseContent = {
  siteTitle: "S",
  navLinks: [{ label: "Home", href: "/" }],
};

const goodProps = {
  variant: "centered" as const,
  content: baseContent,
};

describe("SiteHeader", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(
      <SiteHeader variant="centered" content={{ siteTitle: "Co", navLinks: [] }} />,
    );
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  });

  it("handles optional props omitted", () => {
    renderWithTheme(<SiteHeader variant="centered" content={baseContent} />);
    expect(screen.queryByText(/cta/i)).not.toBeInTheDocument();
  });

  it("JSON schema accepts a known-good props object", () => {
    expect(validateAgainstSchema(schema as object, goodProps)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, { variant: "centered" })).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: "centered",
        content: { siteTitle: 1, navLinks: [] },
      }),
    ).toBe(false);
  });

  describe("variant centered", () => {
    it("renders brand link and nav", () => {
      const { container } = renderWithTheme(
        <SiteHeader variant="centered" content={baseContent} />,
      );
      expect(snapshotRoot(container)).toHaveClass("siteHeader--centered");
      expect(screen.getByRole("link", { name: "S" })).toHaveAttribute("href", "/");
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <SiteHeader variant="centered" content={baseContent} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant left-aligned", () => {
    it("renders structural header elements", () => {
      const { container } = renderWithTheme(
        <SiteHeader variant="left-aligned" content={baseContent} />,
      );
      expect(snapshotRoot(container)).toHaveClass("siteHeader--left-aligned");
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <SiteHeader variant="left-aligned" content={baseContent} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant transparent", () => {
    it("renders transparent modifier", () => {
      const { container } = renderWithTheme(
        <SiteHeader variant="transparent" content={baseContent} />,
      );
      expect(snapshotRoot(container)).toHaveClass("siteHeader--transparent");
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <SiteHeader variant="transparent" content={baseContent} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant sticky", () => {
    it("renders sticky modifier", () => {
      const { container } = renderWithTheme(
        <SiteHeader variant="sticky" content={baseContent} />,
      );
      expect(snapshotRoot(container)).toHaveClass("siteHeader--sticky");
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <SiteHeader variant="sticky" content={baseContent} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
