/**
 * Stand-in for `@site/image` when building or testing the library outside a Next.js app.
 * The client template resolves `@site/image` to `lib/siteImage.tsx` (see next.config).
 */
import type { ReactNode } from "react";

export interface ImageConfig {
  src: string;
  alt: string;
  focalPoint?: { x: number; y: number };
  width?: number;
  height?: number;
}

export type SiteImageSizeContext =
  | "hero"
  | "card"
  | "gallery"
  | "thumbnail"
  | "full"
  | "cta"
  | "avatar";

export interface SiteImageProps extends ImageConfig {
  className?: string;
  sizeContext?: SiteImageSizeContext;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
  contentPathPrefix?: string;
}

export function SiteImage(props: SiteImageProps): ReactNode {
  return (
    <div
      data-testid="site-image-stub"
      role="img"
      aria-label={props.alt}
      className={props.className}
    />
  );
}
