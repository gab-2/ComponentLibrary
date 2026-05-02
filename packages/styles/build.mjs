import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const root = new URL('.', import.meta.url).pathname;
execSync('tsc -p tsconfig.build.json', { stdio: 'inherit', cwd: root });
mkdirSync(resolve(root, 'dist/components'), { recursive: true });
cpSync(resolve(root, 'src/index.css'), resolve(root, 'dist/index.css'));
cpSync(resolve(root, 'src/components'), resolve(root, 'dist/components'), { recursive: true });
