import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const packagesDir = join(root, "packages");
const disallowedReactImports = ["packages/vue", "packages/vue-pro", "packages/angular", "packages/angular-pro", "packages/svelte", "packages/svelte-pro", "packages/web-components"];
const errors: string[] = [];

const packageDirs = readdirSync(packagesDir).map((p) => join(packagesDir, p));

for (const pkgDir of packageDirs) {
  const manifestPath = join(pkgDir, "package.json");
  if (!existsSync(manifestPath)) continue;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const name: string = manifest.name ?? "";
  const isPrivatePackage = name.startsWith("@sua-marca-ui-pro/");

  const sourceText = collectFiles(join(pkgDir, "src"), [".ts", ".tsx", ".js", ".jsx", ".vue", ".svelte"]).join("\n");

  if (!isPrivatePackage && sourceText.includes("@sua-marca-ui-pro/")) {
    errors.push(`${name} imports private scope @sua-marca-ui-pro/*`);
  }

  if (!isPrivatePackage && existsSync(join(pkgDir, "src/components/pro"))) {
    errors.push(`${name} contains disallowed src/components/pro directory`);
  }

  if (isPrivatePackage && !manifest.publishConfig?.registry) {
    errors.push(`${name} is private but missing publishConfig.registry`);
  }

  if (isPrivatePackage && manifest.publishConfig?.registry?.includes("registry.npmjs.org")) {
    errors.push(`${name} must not publish to npmjs registry`);
  }
}

for (const relDir of disallowedReactImports) {
  const full = join(root, relDir, "src");
  const files = collectFiles(full, [".ts", ".tsx", ".js", ".jsx", ".vue", ".svelte"]);
  for (const content of files) {
    if (/from\s+["']react["']/.test(content) || /require\(["']react["']\)/.test(content)) {
      errors.push(`${relDir} contains a React import`);
      break;
    }
  }
}

if (errors.length) {
  console.error("Package boundary check failed:\n" + errors.map((e) => `- ${e}`).join("\n"));
  process.exit(1);
}
console.log("Package boundary check passed.");

function collectFiles(dir: string, exts: string[]): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectFiles(full, exts));
    else if (exts.some((ext) => entry.name.endsWith(ext))) out.push(readFileSync(full, "utf8"));
  }
  return out;
}
