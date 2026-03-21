import { screen } from "@testing-library/react";
import Hero from "./Hero";
import schema from "./Hero.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "centered" as const,
  content: { heading: "H" },
};

describe("Hero", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(<Hero variant="centered" content={{ heading: "Hi" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hi");
  });

  it("handles optional props omitted", () => {
    renderWithTheme(
      <Hero
        variant="centered"
        content={{ heading: "Min" }}
        // settings, className, contentPathPrefix, subheading, cta omitted
      />,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Min");
  });

  it("JSON schema accepts a known-good props object", () => {
    expect(validateAgainstSchema(schema as object, goodProps)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, {})).toBe(false);
    expect(validateAgainstSchema(schema as object, { variant: "centered" })).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: 1,
        content: { heading: "x" },
      }),
    ).toBe(false);
    expect(
      validateAgainstSchema(schema as object, {
        variant: "centered",
        content: { heading: 123 },
      }),
    ).toBe(false);
  });

  describe("variant centered", () => {
    it("renders centered layout structure", () => {
      const { container } = renderWithTheme(
        <Hero variant="centered" content={{ heading: "T" }} />,
      );
      const root = snapshotRoot(container);
      expect(root).toHaveClass("hero_centered");
      expect(root.querySelector(".hero_split")).not.toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Hero variant="centered" content={{ heading: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant split", () => {
    it("renders split layout with visual placeholder", () => {
      const { container } = renderWithTheme(
        <Hero variant="split" content={{ heading: "S" }} />,
      );
      const root = snapshotRoot(container);
      expect(root.querySelector(".hero_split")).toBeInTheDocument();
      expect(root.querySelector(".hero_visual")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Hero variant="split" content={{ heading: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant full-bleed", () => {
    it("renders full-bleed structure", () => {
      const { container } = renderWithTheme(
        <Hero variant="full-bleed" content={{ heading: "F" }} />,
      );
      const root = snapshotRoot(container);
      expect(root).toHaveClass("hero_fullBleed");
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Hero variant="full-bleed" content={{ heading: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant video", () => {
    it("renders video media when videoUrl is set", () => {
      const { container } = renderWithTheme(
        <Hero
          variant="video"
          content={{ heading: "V", videoUrl: "https://example.com/v.mp4" }}
        />,
      );
      const root = snapshotRoot(container);
      expect(root.querySelector("video")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <Hero variant="video" content={{ heading: "Snap", videoUrl: "https://x.com/v.mp4" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
