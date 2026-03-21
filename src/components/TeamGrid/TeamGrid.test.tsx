import { screen } from "@testing-library/react";
import TeamGrid from "./TeamGrid";
import schema from "./TeamGrid.schema.json";
import { validateAgainstSchema } from "../../test/schemaValidator";
import { renderWithTheme, snapshotRoot } from "../../test/renderWithTheme";

const goodProps = {
  variant: "cards" as const,
  content: { members: [{ name: "N" }] },
};

describe("TeamGrid", () => {
  it("renders without crashing with only required props", () => {
    renderWithTheme(<TeamGrid variant="cards" content={{ members: [{ name: "Ada" }] }} />);
    expect(screen.getByText("Ada")).toBeInTheDocument();
  });

  it("handles optional heading, role, bio omitted", () => {
    renderWithTheme(<TeamGrid variant="cards" content={{ members: [{ name: "B" }] }} />);
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
        content: { members: [{ name: [] }] },
      }),
    ).toBe(false);
  });

  describe("variant cards", () => {
    it("renders avatar and name", () => {
      const { container } = renderWithTheme(
        <TeamGrid variant="cards" content={{ members: [{ name: "C" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".teamGrid_avatar")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <TeamGrid variant="cards" content={{ members: [{ name: "Snap" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant headshots", () => {
    it("renders list of members", () => {
      const { container } = renderWithTheme(
        <TeamGrid variant="headshots" content={{ members: [{ name: "D" }] }} />,
      );
      expect(snapshotRoot(container).querySelector(".teamGrid_list")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <TeamGrid variant="headshots" content={{ members: [{ name: "Snap" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });

  describe("variant detailed", () => {
    it("shows bio when provided", () => {
      const { container } = renderWithTheme(
        <TeamGrid
          variant="detailed"
          content={{ members: [{ name: "E", bio: "Bio text" }] }}
        />,
      );
      expect(snapshotRoot(container).querySelector(".teamGrid_bio")).toHaveTextContent("Bio text");
    });

    it("matches snapshot", () => {
      const { container } = renderWithTheme(
        <TeamGrid variant="detailed" content={{ members: [{ name: "Snap", bio: "B" }] }} />,
      );
      expect(snapshotRoot(container)).toMatchSnapshot();
    });
  });
});
