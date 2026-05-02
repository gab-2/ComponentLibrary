import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const root = new URL('.', import.meta.url).pathname;
execSync('tsc -p tsconfig.build.json', { stdio: 'inherit', cwd: root });
mkdirSync(resolve(root, 'dist'), { recursive: true });
cpSync(resolve(root, 'src/tokens.css'), resolve(root, 'dist/tokens.css'));
cpSync(resolve(root, 'src/tokens.json'), resolve(root, 'dist/tokens.json'));
