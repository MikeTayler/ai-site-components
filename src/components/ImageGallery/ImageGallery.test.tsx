import { screen } from "@testing-library/react";
import ImageGallery from "./ImageGallery";
import schema from "./ImageGallery.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "grid" as const,
  content: { items: [{ alt: "A" }] },
};

describe("ImageGallery", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(<ImageGallery variant="grid" content={{ items: [{ alt: "Pic" }] }} />);
    expect(screen.getByRole("img", { name: "Pic" })).toBeInTheDocument();
  });

  it("handles optional heading and caption omitted", () => {
    renderWithTheme(<ImageGallery variant="grid" content={{ items: [{ alt: "A" }] }} />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("JSON schema accepts a known-good props object", () => {
    expect(validateAgainstSchema(schema as object, goodProps)).toBe(true);
  });

  it("JSON schema rejects invalid props (missing required fields)", () => {
    expect(validateAgainstSchema(schema as object, { variant: "grid" })).toBe(false);
  });

  it("JSON schema rejects invalid props (wrong types)", () => {
    expect(
      validateAgainstSchema(schema as object, {
        variant: "grid",
        content: { items: [{ alt: 1 }] },
      }),
    ).toBe(false);
  });

  describe("variant grid", () => {
    it("does not render lightbox button", () => {
      const { container } = renderWithTheme(
        <ImageGallery variant="grid" content={{ items: [{ alt: "A" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".imageGallery_lightboxBtn")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <ImageGallery variant="grid" content={{ items: [{ alt: "Snap" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant masonry", () => {
    it("does not render lightbox button", () => {
      const { container } = renderWithTheme(
        <ImageGallery variant="masonry" content={{ items: [{ alt: "A" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".imageGallery_lightboxBtn")).not.toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <ImageGallery variant="masonry" content={{ items: [{ alt: "Snap" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant lightbox", () => {
    it("renders disabled lightbox button per item", () => {
      const { container } = renderWithTheme(
        <ImageGallery variant="lightbox" content={{ items: [{ alt: "A" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".imageGallery_lightboxBtn")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <ImageGallery variant="lightbox" content={{ items: [{ alt: "Snap" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
