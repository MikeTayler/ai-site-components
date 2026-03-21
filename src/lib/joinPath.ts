/** Dot-join for `data-content-path` (visual editor). */
export function joinPath(prefix: string, segment: string): string {
  if (!prefix) return segment;
  return `${prefix}.${segment}`;
}
