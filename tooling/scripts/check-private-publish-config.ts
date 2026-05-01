import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const packagesDir = join(root, "packages");
const requiredRegistry = "https://registry.sua-marca.com";

const errors: string[] = [];
for (const dir of readdirSync(packagesDir)) {
  if (!dir.endsWith("-pro")) continue;
  const manifestPath = join(packagesDir, dir, "package.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const registry = manifest?.publishConfig?.registry;
  if (registry !== requiredRegistry) {
    errors.push(`${manifest.name}: publishConfig.registry must be ${requiredRegistry} (received ${registry ?? "undefined"})`);
  }
}

if (errors.length) {
  console.error("Private publish config check failed:\n" + errors.map((e) => `- ${e}`).join("\n"));
  process.exit(1);
}
console.log("Private publish config check passed.");
