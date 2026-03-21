import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function copyFileSyncSafe(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function walkCopySchemas(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      walkCopySchemas(p);
    } else if (name.endsWith(".schema.json")) {
      const rel = path.relative(path.join(root, "src"), p);
      copyFileSyncSafe(p, path.join(root, "dist", rel));
    }
  }
}

copyFileSyncSafe(
  path.join(root, "src/theme/tokens.css"),
  path.join(root, "dist/tokens.css"),
);
copyFileSyncSafe(
  path.join(root, "src/theme/tokens.css"),
  path.join(root, "dist/theme.css"),
);

walkCopySchemas(path.join(root, "src/components"));
