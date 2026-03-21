import type { Meta, StoryObj } from "@storybook/react";
import PricingTable from "./PricingTable";
import schema from "./PricingTable.schema.json";
import { repeat } from "../../storybook/fixtures";

const meta = {
  title: "Components/PricingTable",
  component: PricingTable,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof PricingTable>;

const tiers = [
  {
    name: "Starter",
    price: "19",
    currency: "$",
    features: ["Feature A", "Feature B"],
    cta: { label: "Choose", href: "/buy/starter" },
  },
  {
    name: "Pro",
    price: "49",
    currency: "$",
    features: ["Feature A", "Feature B", "Feature C"],
    cta: { label: "Choose", href: "/buy/pro" },
  },
];

const base = { content: { heading: "Pricing", tiers } };

export const VariantTierCards: Story = { name: "Variant · tier-cards", args: { variant: "tier-cards", ...base } };
export const VariantComparison: Story = {
  name: "Variant · comparison",
  args: { variant: "comparison", ...base },
};
export const VariantSimple: Story = { name: "Variant · simple", args: { variant: "simple", ...base } };

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "tier-cards",
    content: {
      heading: "Plans for every stage of growth",
      tiers: repeat(4, (ti) => ({
        name: `Tier ${ti + 1}`,
        price: String(19 + ti * 20),
        currency: "$",
        features: repeat(10, (fi) => `Feature ${ti + 1}.${fi + 1}`),
        cta: { label: `Select tier ${ti + 1}`, href: `/buy/${ti}` },
      })),
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "simple",
    content: {
      tiers: [{ name: "Solo", price: "0", features: [], cta: { label: "Ok", href: "/" } }],
    },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · sunset brand",
  globals: { brandTheme: "sunset" },
  args: { variant: "comparison", ...base },
};
