import type { Meta, StoryObj } from "@storybook/react";
import Testimonials from "./Testimonials";
import schema from "./Testimonials.schema.json";
import { longParagraph, repeat } from "../../storybook/fixtures";

const meta = {
  title: "Components/Testimonials",
  component: Testimonials,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof Testimonials>;

export default meta;
type Story = StoryObj<typeof Testimonials>;

const items = [
  { quote: "Fantastic experience.", author: "Alex", role: "Client" },
  { quote: "Highly recommend.", author: "Sam", role: "Owner" },
];

const base = { content: { heading: "What clients say", items } };

export const VariantCards: Story = { name: "Variant · cards", args: { variant: "cards", ...base } };
export const VariantFeatured: Story = { name: "Variant · featured", args: { variant: "featured", ...base } };
export const VariantCarousel: Story = { name: "Variant · carousel", args: { variant: "carousel", ...base } };

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "cards",
    content: {
      heading: "Many voices",
      items: repeat(12, (i) => ({
        quote: longParagraph,
        author: `Author ${i + 1}`,
        role: `Role ${i + 1}`,
      })),
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "cards",
    content: { items: [{ quote: "Ok.", author: "A" }] },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · ocean brand",
  globals: { brandTheme: "ocean" },
  args: { variant: "featured", ...base },
};
