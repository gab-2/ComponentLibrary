import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const includeExtensions = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".yml", ".yaml", ".json", ".env", ".txt"];
const excludedPaths = ["node_modules", ".git", "dist", "docs/", "prompts/", "design/", "apps/docs/src/content/", "tests/", "__tests__/", "tooling/scripts/run-with-db-url.mjs"];
const excludedFiles = new Set([".env.example", "tooling/scripts/check-secrets.ts", "AGENTS.md", "PRODUCT_SPEC.md", "ARCHITECTURE.md", "ACCEPTANCE_CRITERIA.md"]);
const patterns = [/sk_live_[a-zA-Z0-9]+/g, /sk_test_[a-zA-Z0-9]+/g, /whsec_[a-zA-Z0-9]+/g, /ghp_[a-zA-Z0-9]+/g, /npm_[a-zA-Z0-9]+/g, /DATABASE_URL\s*=\s*(?!["']?(?:postgresql:\/\/USER:PASS|placeholder|YOUR_|CHANGEME))/g, /_authToken\s*=\s*(?!["']?(?:USER_TOKEN|YOUR_|CHANGEME))/g, /PRIVATE_REGISTRY_TOKEN\s*=\s*(?!["']?(?:YOUR_|CHANGEME))/g, /NPM_PUBLIC_TOKEN\s*=\s*(?!["']?(?:YOUR_|CHANGEME))/g];

const hits: string[] = [];
for (const file of listCandidateFiles()) {
  const rel = normalize(relative(root, file));
  if (excludedFiles.has(rel)) continue;
  if (excludedPaths.some((p) => rel.includes(p))) continue;
  if (!includeExtensions.some((ext) => rel.endsWith(ext))) continue;

  const content = readFileSync(file, "utf8");
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) hits.push(`${rel} matched ${pattern}`);
  }
}

if (hits.length) {
  console.error("Secret check failed:\n" + hits.map((h) => `- ${h}`).join("\n"));
  process.exit(1);
}

console.log("Secret check passed.");

function listCandidateFiles(): string[] {
  const fromGit = listGitTrackedFiles();
  if (fromGit.length > 0) return fromGit;
  return [...walk(root)];
}

function listGitTrackedFiles(): string[] {
  try {
    const out = execSync("git ls-files", { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    return out
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((relPath) => join(root, relPath))
      .filter((absPath) => existsSync(absPath));
  } catch {
    return [];
  }
}

function normalize(path: string): string {
  return path.split(sep).join("/");
}

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}
