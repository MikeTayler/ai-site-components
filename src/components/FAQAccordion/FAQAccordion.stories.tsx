import type { Meta, StoryObj } from "@storybook/react";
import FAQAccordion from "./FAQAccordion";
import schema from "./FAQAccordion.schema.json";
import { longParagraph, repeat } from "../../storybook/fixtures";

const meta = {
  title: "Components/FAQAccordion",
  component: FAQAccordion,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof FAQAccordion>;

export default meta;
type Story = StoryObj<typeof FAQAccordion>;

const faqs = [
  { question: "What are your hours?", answer: "We are open weekdays 9–5." },
  { question: "Do you offer refunds?", answer: "Please contact support." },
];

export const VariantSimple: Story = {
  name: "Variant · simple",
  args: { variant: "simple", content: { heading: "FAQ", faqs } },
};

export const VariantGrouped: Story = {
  name: "Variant · grouped",
  args: {
    variant: "grouped",
    content: {
      heading: "Help center",
      groups: [
        { title: "Billing", items: faqs },
        { title: "Shipping", items: [{ question: "Do you ship internationally?", answer: "Yes." }] },
      ],
    },
  },
};

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "simple",
    content: {
      heading: "Everything you might ask",
      faqs: repeat(20, (i) => ({
        question: `Question ${i + 1}: ${longParagraph.slice(0, 60)}`,
        answer: longParagraph,
      })),
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "simple",
    content: { faqs: [{ question: "Q?", answer: "A." }] },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · ocean brand",
  globals: { brandTheme: "ocean" },
  args: {
    variant: "grouped",
    content: {
      groups: [{ title: "General", items: faqs }],
    },
  },
};
