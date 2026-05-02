import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = new URL('.', import.meta.url).pathname;
mkdirSync(resolve(root, 'dist'), { recursive: true });
cpSync(resolve(root, 'src/tokens.css'), resolve(root, 'dist/tokens.css'));
cpSync(resolve(root, 'src/tokens.json'), resolve(root, 'dist/tokens.json'));
