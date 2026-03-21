import { lazy } from "react";
import type { ComponentType } from "react";

/**
 * Maps JSON `component` type strings (PascalCase) to React components.
 * Values are typically `React.lazy`-wrapped for code-splitting; render inside `<Suspense>`.
 */
export type ComponentRegistry = Record<string, ComponentType<Record<string, unknown>>>;

/** Dynamic import typing for heterogeneous section components (strict props per component). */
function lazyRegistry(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  factory: () => Promise<any>,
): ComponentType<Record<string, unknown>> {
  return lazy(factory) as unknown as ComponentType<Record<string, unknown>>;
}

/**
 * Shared library components keyed by JSON type name. Each entry uses `React.lazy` so
 * client bundlers emit separate async chunks — only components that are rendered are fetched.
 */
export const defaultRegistry: ComponentRegistry = {
  SiteHeader: lazyRegistry(() => import("../components/SiteHeader/index.js")),
  SiteFooter: lazyRegistry(() => import("../components/SiteFooter/index.js")),
  Hero: lazyRegistry(() => import("../components/Hero/index.js")),
  FeatureGrid: lazyRegistry(() => import("../components/FeatureGrid/index.js")),
  CTABanner: lazyRegistry(() => import("../components/CTABanner/index.js")),
  Testimonials: lazyRegistry(() => import("../components/Testimonials/index.js")),
  TextContent: lazyRegistry(() => import("../components/TextContent/index.js")),
  ContactForm: lazyRegistry(() => import("../components/ContactForm/index.js")),
  ImageGallery: lazyRegistry(() => import("../components/ImageGallery/index.js")),
  TeamGrid: lazyRegistry(() => import("../components/TeamGrid/index.js")),
  PricingTable: lazyRegistry(() => import("../components/PricingTable/index.js")),
  FAQAccordion: lazyRegistry(() => import("../components/FAQAccordion/index.js")),
  Stats: lazyRegistry(() => import("../components/Stats/index.js")),
};

/**
 * Merges optional site-specific overrides onto the default registry.
 * Custom keys replace defaults; use this for per-site component overrides.
 */
export function createRegistry(customComponents?: ComponentRegistry): ComponentRegistry {
  return {
    ...defaultRegistry,
    ...(customComponents ?? {}),
  };
}

/**
 * Resolves a component from a registry by JSON type name.
 * @throws Error when `typeName` is missing from the registry (lists available keys).
 */
export function resolveComponent(
  registry: ComponentRegistry,
  typeName: string,
): ComponentType<Record<string, unknown>> {
  const Component = registry[typeName];
  if (Component === undefined) {
    const available = Object.keys(registry).sort().join(", ");
    throw new Error(
      `[@ai-site/components] Unknown component type "${typeName}". Registered keys: ${available || "(none)"}`,
    );
  }
  return Component;
}
