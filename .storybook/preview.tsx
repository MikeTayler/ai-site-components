import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import "../src/theme/tokens.css";
import { getBrandForTheme } from "../src/storybook/brandPresets";
import { SchemaStoryLayout } from "../src/storybook/SchemaStoryLayout";

const preview: Preview = {
  globalTypes: {
    brandTheme: {
      name: "Brand theme",
      description: "Switches ThemeProvider brand (CSS variables)",
      defaultValue: "default",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "default", title: "Default" },
          { value: "ocean", title: "Ocean" },
          { value: "sunset", title: "Sunset" },
        ],
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (Story, context) => {
      const key = (context.globals.brandTheme as string | undefined) ?? "default";
      const brand = getBrandForTheme(key);
      return (
        <ThemeProvider brand={brand}>
          <Story />
        </ThemeProvider>
      );
    },
    (Story, context) => {
      const schema = context.parameters.schema as Record<string, unknown> | undefined;
      if (!schema) {
        return <Story />;
      }
      return (
        <SchemaStoryLayout schema={schema}>
          <Story />
        </SchemaStoryLayout>
      );
    },
  ],
};

export default preview;
