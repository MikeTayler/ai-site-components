import type { Meta, StoryObj } from "@storybook/react";
import FeatureGrid from "./FeatureGrid";
import schema from "./FeatureGrid.schema.json";
import { longHeading, longParagraph, repeat } from "../../storybook/fixtures";

const meta = {
  title: "Components/FeatureGrid",
  component: FeatureGrid,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof FeatureGrid>;

const items = [
  { title: "Feature one", description: "Short description." },
  { title: "Feature two", description: "Another line." },
  { title: "Feature three", description: "More detail here." },
];

const base = {
  content: { heading: "Why choose us", items },
};

export const VariantThreeColumn: Story = { name: "Variant · three-column", args: { variant: "three-column", ...base } };
export const VariantTwoColumnImages: Story = {
  name: "Variant · two-column-images",
  args: { variant: "two-column-images", ...base },
};
export const VariantAlternating: Story = {
  name: "Variant · alternating",
  args: { variant: "alternating", ...base },
};

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "three-column",
    content: {
      heading: longHeading,
      items: repeat(9, (i) => ({
        title: `Item ${i + 1}: ${longHeading.slice(0, 40)}`,
        description: longParagraph,
      })),
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "three-column",
    content: { heading: "X", items: [{ title: "Only" }] },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · ocean brand",
  globals: { brandTheme: "ocean" },
  args: { variant: "alternating", ...base },
};
