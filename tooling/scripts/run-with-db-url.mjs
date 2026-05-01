import { spawnSync } from 'node:child_process';

const defaultUrl = 'postgresql://postgres:postgres@localhost:5432/sua_ui_platform';
const DATABASE_URL = process.env.DATABASE_URL || defaultUrl;

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node tooling/scripts/run-with-db-url.mjs <command> [...args]');
  process.exit(1);
}

const [command, ...commandArgs] = args;
const result = spawnSync(command, commandArgs, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: {
    ...process.env,
    DATABASE_URL,
  },
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);
