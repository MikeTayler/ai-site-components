export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  background: string;
  text: string;
  textLight: string;
}

export interface BrandTypography {
  headingFont: string;
  bodyFont: string;
  baseSize: number;
  scale: number;
}

export type BrandBorderRadius = "none" | "small" | "medium" | "large";

export type BrandSpacing = "compact" | "normal" | "relaxed";

export interface BrandConfig {
  colors: BrandColors;
  typography: BrandTypography;
  borderRadius: BrandBorderRadius;
  spacing: BrandSpacing;
}
