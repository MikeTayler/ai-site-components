import type { Meta, StoryObj } from "@storybook/react";
import SiteFooter from "./SiteFooter";
import schema from "./SiteFooter.schema.json";
import { longParagraph, repeat } from "../../storybook/fixtures";

const meta = {
  title: "Components/SiteFooter",
  component: SiteFooter,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof SiteFooter>;

const columns = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const VariantSimple: Story = {
  name: "Variant · simple",
  args: { variant: "simple", content: { copyrightText: "© 2026 Example Co." } },
};

export const VariantMultiColumn: Story = {
  name: "Variant · multi-column",
  args: {
    variant: "multi-column",
    content: { copyrightText: "© 2026 Example Co.", tagline: "Built with care.", columns },
  },
};

export const VariantNewsletter: Story = {
  name: "Variant · newsletter",
  args: {
    variant: "newsletter",
    content: {
      copyrightText: "© 2026 Example Co.",
      newsletterHeading: "Stay in the loop",
      newsletterPlaceholder: "you@example.com",
      columns,
    },
  },
};

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "multi-column",
    content: {
      copyrightText: "© 2026 Example Co. " + longParagraph,
      tagline: longParagraph,
      columns: repeat(4, (ci) => ({
        heading: `Column ${ci + 1}`,
        links: repeat(8, (li) => ({ label: `Link ${ci}-${li}`, href: `/${ci}/${li}` })),
      })),
    },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "simple",
    content: { copyrightText: "©" },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · sunset brand",
  globals: { brandTheme: "sunset" },
  args: {
    variant: "newsletter",
    content: {
      copyrightText: "© 2026 Example Co.",
      newsletterHeading: "Newsletter",
      columns: [{ heading: "Links", links: [{ label: "Home", href: "/" }] }],
    },
  },
};
