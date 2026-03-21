import type { Meta, StoryObj } from "@storybook/react";
import TeamGrid from "./TeamGrid";
import schema from "./TeamGrid.schema.json";
import { longParagraph, repeat } from "../../storybook/fixtures";

const meta = {
  title: "Components/TeamGrid",
  component: TeamGrid,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof TeamGrid>;

export default meta;
type Story = StoryObj<typeof TeamGrid>;

const members = [
  { name: "Jordan", role: "Director", bio: "Leads the studio." },
  { name: "Taylor", role: "Coach", bio: "Classes and programming." },
];

const base = { content: { heading: "Our team", members } };

export const VariantCards: Story = { name: "Variant · cards", args: { variant: "cards", ...base } };
export const VariantHeadshots: Story = { name: "Variant · headshots", args: { variant: "headshots", ...base } };
export const VariantDetailed: Story = { name: "Variant · detailed", args: { variant: "detailed", ...base } };

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "cards",
    content: {
      heading: "Everyone on the team",
      members: repeat(12, (i) => ({
        name: `Person ${i + 1}`,
        role: `Role ${i + 1}`,
        bio: longParagraph,
      })),
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "cards",
    content: { members: [{ name: "A" }] },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · ocean brand",
  globals: { brandTheme: "ocean" },
  args: { variant: "detailed", ...base },
};
