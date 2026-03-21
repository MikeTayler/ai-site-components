import type { BrandConfig } from "../types/brand.js";
import { defaultBrandConfig } from "../theme/defaultBrand.js";

/** Storybook-only brand presets (non-default themes for the toolbar + themed stories). */
export const brandPresets: Record<string, BrandConfig> = {
  default: defaultBrandConfig,
  ocean: {
    colors: {
      primary: "#0f172a",
      secondary: "#475569",
      accent: "#0ea5e9",
      neutral: "#e0f2fe",
      background: "#f8fafc",
      text: "#0f172a",
      textLight: "#64748b",
    },
    typography: {
      headingFont: "Georgia, 'Times New Roman', serif",
      bodyFont: "system-ui, -apple-system, sans-serif",
      baseSize: 17,
      scale: 1.2,
    },
    borderRadius: "large",
    spacing: "relaxed",
  },
  sunset: {
    colors: {
      primary: "#7c2d12",
      secondary: "#b45309",
      accent: "#f97316",
      neutral: "#fff7ed",
      background: "#fffbeb",
      text: "#431407",
      textLight: "#9a3412",
    },
    typography: {
      headingFont: "Georgia, 'Times New Roman', serif",
      bodyFont: "system-ui, -apple-system, sans-serif",
      baseSize: 16,
      scale: 1.25,
    },
    borderRadius: "medium",
    spacing: "normal",
  },
};

export function getBrandForTheme(key: string | undefined): BrandConfig {
  if (!key || key === "default") {
    return defaultBrandConfig;
  }
  return brandPresets[key] ?? defaultBrandConfig;
}
