import type { Meta, StoryObj } from "@storybook/react";
import TextContent from "./TextContent";
import schema from "./TextContent.schema.json";
import { longParagraph, repeat } from "../../storybook/fixtures";

const meta = {
  title: "Components/TextContent",
  component: TextContent,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof TextContent>;

export default meta;
type Story = StoryObj<typeof TextContent>;

const paras = ["First paragraph.", "Second paragraph with more text."];

export const VariantSingleColumn: Story = {
  name: "Variant · single-column",
  args: { variant: "single-column", content: { heading: "Our story", paragraphs: paras } },
};

export const VariantTwoColumn: Story = {
  name: "Variant · two-column",
  args: { variant: "two-column", content: { heading: "Services", paragraphs: paras } },
};

export const VariantWithSidebar: Story = {
  name: "Variant · with-sidebar",
  args: {
    variant: "with-sidebar",
    content: {
      heading: "Article",
      paragraphs: paras,
      asideTitle: "On this page",
      asideParagraphs: ["Summary point one.", "Summary point two."],
    },
  },
};

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "two-column",
    content: {
      heading: "Long form",
      paragraphs: repeat(12, () => longParagraph),
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "single-column",
    content: { paragraphs: ["P"] },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · sunset brand",
  globals: { brandTheme: "sunset" },
  args: {
    variant: "with-sidebar",
    content: {
      heading: "Sidebar theme",
      paragraphs: ["Body"],
      asideTitle: "Note",
      asideParagraphs: ["Aside"],
    },
  },
};
