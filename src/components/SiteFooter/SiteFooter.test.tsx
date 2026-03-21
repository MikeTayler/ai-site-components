import { screen } from "@testing-library/react";
import SiteFooter from "./SiteFooter";
import schema from "./SiteFooter.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "simple" as const,
  content: { copyrightText: "©" },
};

describe("SiteFooter", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(<SiteFooter variant="simple" content={{ copyrightText: "© Co" }} />);
    expect(screen.getByText("© Co")).toBeInTheDocument();
  });

  it("handles optional props omitted", () => {
    renderWithTheme(<SiteFooter variant="simple" content={{ copyrightText: "©" }} />);
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
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
        content: { copyrightText: [] },
      }),
    ).toBe(false);
  });

  describe("variant simple", () => {
    it("renders copyright only (no grid)", () => {
      const { container } = renderWithTheme(
        <SiteFooter variant="simple" content={{ copyrightText: "C" }} />,
      );
      expect(snapshotRoot(container).querySelector(".siteFooter_grid")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <SiteFooter variant="simple" content={{ copyrightText: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant multi-column", () => {
    it("renders column grid when columns provided", () => {
      const { container } = renderWithTheme(
        <SiteFooter
          variant="multi-column"
          content={{
            copyrightText: "C",
            columns: [{ heading: "A", links: [{ label: "L", href: "/x" }] }],
          }}
        />,
      );
      expect(snapshotRoot(container).querySelector(".siteFooter_grid")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <SiteFooter
          variant="multi-column"
          content={{
            copyrightText: "Snap",
            columns: [{ heading: "Col", links: [{ label: "Link", href: "/a" }] }],
          }}
        />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant newsletter", () => {
    it("renders newsletter block when heading is set", () => {
      const { container } = renderWithTheme(
        <SiteFooter
          variant="newsletter"
          content={{
            copyrightText: "C",
            newsletterHeading: "News",
            newsletterPlaceholder: "you@x.com",
          }}
        />,
      );
      expect(snapshotRoot(container).querySelector(".siteFooter_newsletterForm")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <SiteFooter
          variant="newsletter"
          content={{
            copyrightText: "Snap",
            newsletterHeading: "News",
          }}
        />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
