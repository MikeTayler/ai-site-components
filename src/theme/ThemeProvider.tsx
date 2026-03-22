import type { CSSProperties, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { BrandConfig } from "../types/brand.js";
import { defaultBrandConfig } from "./defaultBrand.js";
import { BORDER_RADIUS_CSS, SPACING_CSS } from "./presets.js";

export interface ThemeContextValue {
  /** Resolved brand config (explicit `brand` prop or `defaultBrandConfig`). */
  brand: BrandConfig;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Single font face name or full CSS `font-family` list from brand.json. */
function cssFontFamily(face: string): string {
  const t = face.trim();
  if (!t) return "system-ui, sans-serif";
  if (t.includes(",")) return t;
  return `'${t.replace(/'/g, "\\'")}', sans-serif`;
}

function brandToCssVariables(brand: BrandConfig): CSSProperties {
  const { colors, typography, borderRadius, spacing } = brand;
  const radii = BORDER_RADIUS_CSS[borderRadius];
  const spaces = SPACING_CSS[spacing];

  return {
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
    "--color-neutral": colors.neutral,
    "--color-background": colors.background,
    "--color-text": colors.text,
    "--color-text-light": colors.textLight,

    "--font-heading": cssFontFamily(typography.headingFont),
    "--font-body": cssFontFamily(typography.bodyFont),
    "--font-size-base": `${typography.baseSize}px`,
    "--type-scale": String(typography.scale),

    "--radius-sm": radii.sm,
    "--radius-md": radii.md,
    "--radius-lg": radii.lg,

    "--space-xs": spaces.xs,
    "--space-sm": spaces.sm,
    "--space-md": spaces.md,
    "--space-lg": spaces.lg,
    "--space-xl": spaces.xl,
    "--space-2xl": spaces["2xl"],
  } as CSSProperties;
}

export interface ThemeProviderProps {
  /** When omitted, `defaultBrandConfig` is used (see tokens.css :root defaults). */
  brand?: BrandConfig;
  children: ReactNode;
  className?: string;
}

export function ThemeProvider({ brand, children, className }: ThemeProviderProps) {
  const resolvedBrand = brand ?? defaultBrandConfig;

  const value = useMemo((): ThemeContextValue => ({ brand: resolvedBrand }), [resolvedBrand]);
  const style = useMemo(() => brandToCssVariables(resolvedBrand), [resolvedBrand]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={className} style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/** Access the active `BrandConfig` from the nearest ThemeProvider. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
