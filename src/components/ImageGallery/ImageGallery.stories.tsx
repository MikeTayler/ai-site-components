import type { Meta, StoryObj } from "@storybook/react";
import ImageGallery from "./ImageGallery";
import schema from "./ImageGallery.schema.json";
import { repeat } from "../../storybook/fixtures";

const meta = {
  title: "Components/ImageGallery",
  component: ImageGallery,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof ImageGallery>;

const items = [
  { alt: "Photo one", caption: "Caption one" },
  { alt: "Photo two", caption: "Caption two" },
  { alt: "Photo three" },
];

const base = { content: { heading: "Gallery", items } };

export const VariantGrid: Story = { name: "Variant · grid", args: { variant: "grid", ...base } };
export const VariantMasonry: Story = { name: "Variant · masonry", args: { variant: "masonry", ...base } };
export const VariantLightbox: Story = { name: "Variant · lightbox", args: { variant: "lightbox", ...base } };

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "grid",
    content: {
      heading: "Large gallery",
      items: repeat(24, (i) => ({
        alt: `Decorative placeholder image number ${i + 1} with a long alt string for accessibility`,
        caption: i % 3 === 0 ? `Caption ${i + 1}` : undefined,
      })),
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "grid",
    content: { items: [{ alt: "A" }] },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · sunset brand",
  globals: { brandTheme: "sunset" },
  args: { variant: "masonry", ...base },
};
