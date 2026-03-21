import type { Meta, StoryObj } from "@storybook/react";
import Stats from "./Stats";
import schema from "./Stats.schema.json";
import { repeat } from "../../storybook/fixtures";

const meta = {
  title: "Components/Stats",
  component: Stats,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof Stats>;

export default meta;
type Story = StoryObj<typeof Stats>;

const items = [
  { label: "Clients", value: "120", suffix: "+" },
  { label: "Years", value: "10", suffix: "+" },
  { label: "Sessions", value: "4", suffix: "k" },
];

const base = { content: { heading: "By the numbers", items } };

export const VariantCounterRow: Story = {
  name: "Variant · counter-row",
  args: { variant: "counter-row", ...base },
};
export const VariantFeatured: Story = { name: "Variant · featured", args: { variant: "featured", ...base } };
export const VariantWithIcons: Story = {
  name: "Variant · with-icons",
  args: { variant: "with-icons", ...base },
};

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "counter-row",
    content: {
      heading: "Operational metrics across every region and product line",
      items: repeat(8, (i) => ({
        label: `Metric ${i + 1} with a long descriptive label`,
        value: String(1000 + i * 333),
        prefix: i % 2 === 0 ? "~" : undefined,
        suffix: i % 3 === 0 ? "+" : undefined,
      })),
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "counter-row",
    content: { items: [{ label: "A", value: "1" }] },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · sunset brand",
  globals: { brandTheme: "sunset" },
  args: { variant: "featured", ...base },
};
