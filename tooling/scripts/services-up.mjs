import { execSync } from 'node:child_process';

function hasDocker() {
  try {
    execSync('command -v docker', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

if (!hasDocker()) {
  console.error('Docker CLI not found. Install Docker Desktop/Engine or start PostgreSQL + Verdaccio manually.');
  process.exit(1);
}

execSync('docker compose up -d', { stdio: 'inherit' });
console.log('Services started with docker compose.');
