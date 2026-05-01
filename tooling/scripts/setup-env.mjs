import { existsSync, copyFileSync } from 'node:fs';

if (existsSync('.env')) {
  console.log('.env already exists.');
  process.exit(0);
}

copyFileSync('.env.example', '.env');
console.log('Created .env from .env.example');
