import type { Meta, StoryObj } from "@storybook/react";
import Hero from "./Hero";
import type { HeroProps } from "./Hero";
import schema from "./Hero.schema.json";
import { longHeading, longParagraph } from "../../storybook/fixtures";

const meta = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    schema: schema as Record<string, unknown>,
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof Hero>;

const base: Pick<HeroProps, "content"> = {
  content: {
    heading: "Welcome",
    subheading: "A short supporting line.",
    cta: { label: "Get started", href: "/contact" },
  },
};

export const VariantCentered: Story = {
  name: "Variant · centered",
  args: { variant: "centered", ...base },
};

export const VariantSplit: Story = {
  name: "Variant · split",
  args: { variant: "split", ...base },
};

export const VariantFullBleed: Story = {
  name: "Variant · full-bleed",
  args: { variant: "full-bleed", ...base },
};

export const VariantVideo: Story = {
  name: "Variant · video",
  args: {
    variant: "video",
    content: {
      ...base.content,
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
  },
};

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "centered",
    content: {
      heading: longHeading,
      subheading: longParagraph,
      cta: { label: "Book a very long call-to-action label that should still wrap", href: "/x" },
    },
    settings: { spacing: "relaxed", background: "primary", maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "centered",
    content: { heading: "Hi" },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · sunset brand",
  globals: { brandTheme: "sunset" },
  args: {
    variant: "split",
    content: {
      heading: "Sunset palette",
      subheading: "Toolbar can also switch themes; this story locks to Sunset.",
      cta: { label: "Explore", href: "/" },
    },
    settings: { background: "neutral", maxWidth: "wide" },
  },
};
