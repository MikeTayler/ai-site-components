import { screen } from "@testing-library/react";
import ContactForm from "./ContactForm";
import schema from "./ContactForm.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "simple" as const,
  content: { heading: "H" },
};

describe("ContactForm", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(<ContactForm variant="simple" content={{ heading: "Reach" }} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Reach");
  });

  it("handles optional labels and description omitted", () => {
    renderWithTheme(<ContactForm variant="simple" content={{ heading: "H" }} />);
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
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
        content: { heading: ["no"] },
      }),
    ).toBe(false);
  });

  describe("variant simple", () => {
    it("has no map placeholder", () => {
      const { container } = renderWithTheme(
        <ContactForm variant="simple" content={{ heading: "H" }} />,
      );
      expect(snapshotRoot(container).querySelector(".contactForm_map")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <ContactForm variant="simple" content={{ heading: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant with-map", () => {
    it("renders map placeholder", () => {
      const { container } = renderWithTheme(
        <ContactForm variant="with-map" content={{ heading: "H" }} />,
      );
      expect(snapshotRoot(container).querySelector(".contactForm_map")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <ContactForm variant="with-map" content={{ heading: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant split", () => {
    it("renders map placeholder", () => {
      const { container } = renderWithTheme(
        <ContactForm variant="split" content={{ heading: "H" }} />,
      );
      expect(snapshotRoot(container).querySelector(".contactForm_map")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <ContactForm variant="split" content={{ heading: "Snap" }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
