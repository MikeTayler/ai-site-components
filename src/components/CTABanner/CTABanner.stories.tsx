import type { Meta, StoryObj } from "@storybook/react";
import CTABanner from "./CTABanner";
import schema from "./CTABanner.schema.json";
import { longHeading, longParagraph } from "../../storybook/fixtures";

const meta = {
  title: "Components/CTABanner",
  component: CTABanner,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof CTABanner>;

export default meta;
type Story = StoryObj<typeof CTABanner>;

const base = {
  content: {
    heading: "Ready to start?",
    subheading: "We are here to help.",
    cta: { label: "Contact", href: "/contact" },
  },
};

export const VariantInline: Story = { name: "Variant · inline", args: { variant: "inline", ...base } };
export const VariantFullWidth: Story = { name: "Variant · full-width", args: { variant: "full-width", ...base } };
export const VariantWithImage: Story = { name: "Variant · with-image", args: { variant: "with-image", ...base } };

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "full-width",
    content: {
      heading: longHeading,
      subheading: longParagraph + longParagraph,
      cta: { label: "Start your journey with a very long label", href: "/start" },
    },
    settings: { background: "primary" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "inline",
    content: { heading: "Go" },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · sunset brand",
  globals: { brandTheme: "sunset" },
  args: { variant: "with-image", ...base, settings: { background: "neutral" } },
};
