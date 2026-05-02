import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL('.', import.meta.url));
mkdirSync(resolve(root, 'dist/components'), { recursive: true });
cpSync(resolve(root, 'src/index.css'), resolve(root, 'dist/index.css'));
cpSync(resolve(root, 'src/components'), resolve(root, 'dist/components'), { recursive: true });
