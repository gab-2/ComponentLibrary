import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = new URL('.', import.meta.url).pathname;
const tscBin = require.resolve('typescript/bin/tsc');

const result = spawnSync(process.execPath, [tscBin, '-p', 'tsconfig.build.json'], {
  stdio: 'inherit',
  cwd: root,
});

if (result.status !== 0) process.exit(result.status ?? 1);

mkdirSync(resolve(root, 'dist/components'), { recursive: true });
cpSync(resolve(root, 'src/index.css'), resolve(root, 'dist/index.css'));
cpSync(resolve(root, 'src/components'), resolve(root, 'dist/components'), { recursive: true });
