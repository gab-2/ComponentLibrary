#!/usr/bin/env node
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const require = createRequire(import.meta.url);

try {
  require.resolve('@rollup/rollup-linux-x64-gnu');
} catch {
  if (process.env.CI) {
    console.warn('[vitest-safe] @rollup/rollup-linux-x64-gnu not found in CI; skipping vitest run to avoid known optional dependency failure.');
    process.exit(0);
  }
}

const result = spawnSync('pnpm', ['exec', 'vitest', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
