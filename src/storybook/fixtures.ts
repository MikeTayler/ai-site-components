/** Very long single-line heading for stress-testing layout. */
export const longHeading =
  "Exceptionally long headline text used to verify wrapping, rhythm, and overflow behaviour across every section component without breaking layout or truncation rules in Storybook";

/** Long paragraph for max-content stories. */
export const longParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

/** Repeat helper for list-like content. */
export function repeat<T>(n: number, fn: (i: number) => T): T[] {
  return Array.from({ length: n }, (_, i) => fn(i));
}
