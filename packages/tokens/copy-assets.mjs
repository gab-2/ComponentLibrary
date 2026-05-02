import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL('.', import.meta.url));
mkdirSync(resolve(root, 'dist'), { recursive: true });
cpSync(resolve(root, 'src/tokens.css'), resolve(root, 'dist/tokens.css'));
cpSync(resolve(root, 'src/tokens.json'), resolve(root, 'dist/tokens.json'));
