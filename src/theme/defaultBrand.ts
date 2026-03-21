import type { BrandConfig } from "../types/brand.js";

/**
 * Default brand configuration. Used when `ThemeProvider` is mounted without a `brand` prop
 * and as the single source of truth for :root defaults in tokens.css (keep in sync).
 */
export const defaultBrandConfig: BrandConfig = {
  colors: {
    primary: "#2d2d2d",
    secondary: "#6b6b6b",
    accent: "#4a6741",
    neutral: "#f5f0eb",
    background: "#ffffff",
    text: "#2d2d2d",
    textLight: "#6b6b6b",
  },
  typography: {
    headingFont: "system-ui, sans-serif",
    bodyFont: "system-ui, sans-serif",
    baseSize: 16,
    scale: 1.25,
  },
  borderRadius: "medium",
  spacing: "normal",
};
