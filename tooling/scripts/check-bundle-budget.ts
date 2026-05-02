import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

type Budget = { file: string; maxBytes: number; fallbackFiles?: string[] };

const budgets: Budget[] = [
  {
    file: 'packages/core/dist/index.js',
    maxBytes: 35_000,
    fallbackFiles: ['packages/core/src/index.ts'],
  },
  {
    file: 'packages/react/dist/index.js',
    maxBytes: 45_000,
    fallbackFiles: ['packages/react/src/index.ts'],
  },
  {
    file: 'packages/styles/dist/index.js',
    maxBytes: 40_000,
    fallbackFiles: ['packages/styles/src/index.ts'],
  },
  { file: 'packages/tokens/src/tokens.css', maxBytes: 20_000 },
];

let hasFailure = false;

for (const budget of budgets) {
  const candidateFiles = [budget.file, ...(budget.fallbackFiles ?? [])];
  const selectedFile = candidateFiles.find((file) => existsSync(resolve(process.cwd(), file)));

  if (!selectedFile) {
    hasFailure = true;
    console.error(`❌ Missing build artifact: ${budget.file}. Run build before checking budgets.`);
    continue;
  }

  const fullPath = resolve(process.cwd(), selectedFile);

  try {
    const size = statSync(fullPath).size;
    if (size > budget.maxBytes) {
      hasFailure = true;
      console.error(`❌ Budget exceeded: ${selectedFile} (${size} bytes > ${budget.maxBytes} bytes)`);
    } else {
      const prefix = selectedFile === budget.file ? '✅' : '⚠️';
      const artifact = selectedFile === budget.file ? selectedFile : `${selectedFile} (fallback for ${budget.file})`;
      console.log(`${prefix} Budget ok: ${artifact} (${size} bytes <= ${budget.maxBytes} bytes)`);
    }
  } catch {
    hasFailure = true;
    console.error(`❌ Missing build artifact: ${budget.file}. Run build before checking budgets.`);
  }
}

if (hasFailure) {
  process.exit(1);
}
