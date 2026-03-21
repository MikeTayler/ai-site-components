import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  /** Emit separate chunks for `import()` so lazy-loaded components split per module (ESM). */
  splitting: true,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime", "next/image", "next", "@site/image"],
  esbuildOptions(options) {
    options.loader = { ...options.loader, ".css": "css" };
  },
});
