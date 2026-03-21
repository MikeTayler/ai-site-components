import type { Meta, StoryObj } from "@storybook/react";
import ContactForm from "./ContactForm";
import schema from "./ContactForm.schema.json";
import { longParagraph } from "../../storybook/fixtures";

const meta = {
  title: "Components/ContactForm",
  component: ContactForm,
  tags: ["autodocs"],
  parameters: { schema: schema as Record<string, unknown> },
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof ContactForm>;

const base = {
  content: {
    heading: "Contact us",
    description: "Send a message and we will reply.",
    submitLabel: "Send message",
  },
};

export const VariantSimple: Story = { name: "Variant · simple", args: { variant: "simple", ...base } };
export const VariantWithMap: Story = { name: "Variant · with-map", args: { variant: "with-map", ...base } };
export const VariantSplit: Story = { name: "Variant · split", args: { variant: "split", ...base } };

export const EdgeMaxContent: Story = {
  name: "Edge · maximum content",
  args: {
    variant: "split",
    content: {
      heading: "We would love to hear from you — " + longParagraph.slice(0, 120),
      description: longParagraph + longParagraph,
      submitLabel: "Submit the form with a long button label",
      nameLabel: "Your full legal name as it appears on documents",
      emailLabel: "Preferred email for follow-up correspondence",
      messageLabel: "Describe your request in as much detail as possible",
    },
    settings: { maxWidth: "full" },
  },
};

export const EdgeMinContent: Story = {
  name: "Edge · minimum content",
  args: {
    variant: "simple",
    content: { heading: "Hi" },
  },
};

export const ThemedNonDefaultBrand: Story = {
  name: "Themed · ocean brand",
  globals: { brandTheme: "ocean" },
  args: { variant: "with-map", ...base },
};
