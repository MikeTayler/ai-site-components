import type { Meta, StoryObj } from "@storybook/react";
import SiteHeader from "./SiteHeader";
import schema from "./SiteHeader.schema.json";
import { longHeading, repeat } from "../../storybook/fixtures";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const meta = {
  title: "Components/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof SiteHeader>;

const base = {
  content: { siteTitle: "Align Studio", navLinks: nav, cta: { label: "Book", href: "/book" } },
};

export const VariantCentered: Story = { name: "Variant · centered", args: { variant: "centered", ...base } };
export const VariantLeftAligned: Story = {
  name: "Variant · left-aligned",
  args: { variant: "left-aligned", ...base },
};
export const VariantTransparent: Story = {
  name: "Variant · transparent",
  args: { variant: "transparent", ...base, settings: { background: "transparent" } },
};
export const VariantSticky: Story = { name: "Variant · sticky", args: { variant: "sticky", ...base } };

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "left-aligned",
    content: {
      siteTitle: longHeading.slice(0, 80),
      navLinks: repeat(12, (i) => ({ label: `Section ${i + 1}`, href: `/#s${i}` })),
      cta: { label: "Very long CTA label example", href: "/x" },
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "centered",
    content: { siteTitle: "A", navLinks: [] },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · ocean brand",
  globals: { brandTheme: "ocean" },
  args: { variant: "left-aligned", ...base },
};
