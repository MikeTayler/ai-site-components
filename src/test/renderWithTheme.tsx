import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "../theme/ThemeProvider";

function Wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: Wrapper, ...options });
}

/** Stable snapshot target: component roots expose `data-variant`. */
export function snapshotRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector("[data-variant]");
  if (!el) {
    throw new Error("Expected a descendant with [data-variant] for snapshot");
  }
  return el as HTMLElement;
}
