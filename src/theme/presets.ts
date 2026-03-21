import type { BrandBorderRadius, BrandSpacing } from "../types/brand.js";

/** Maps brand borderRadius presets to --radius-sm | --radius-md | --radius-lg */
export const BORDER_RADIUS_CSS: Record<BrandBorderRadius, { sm: string; md: string; lg: string }> =
  {
    none: { sm: "0", md: "0", lg: "0" },
    small: { sm: "0.25rem", md: "0.375rem", lg: "0.5rem" },
    medium: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
    large: { sm: "0.75rem", md: "1rem", lg: "1.5rem" },
  };

/** Maps brand spacing presets to --space-xs … --space-2xl */
export const SPACING_CSS: Record<
  BrandSpacing,
  { xs: string; sm: string; md: string; lg: string; xl: string; "2xl": string }
> = {
  compact: {
    xs: "0.125rem",
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.75rem",
  },
  normal: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  relaxed: {
    xs: "0.375rem",
    sm: "0.75rem",
    md: "1.25rem",
    lg: "2rem",
    xl: "2.5rem",
    "2xl": "4rem",
  },
};
