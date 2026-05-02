import { statSync } from 'node:fs';
import { resolve } from 'node:path';

type Budget = { file: string; maxBytes: number };

const budgets: Budget[] = [
  { file: 'packages/core/dist/index.js', maxBytes: 35_000 },
  { file: 'packages/react/dist/index.js', maxBytes: 45_000 },
  { file: 'packages/styles/dist/index.js', maxBytes: 40_000 },
  { file: 'packages/tokens/src/tokens.css', maxBytes: 20_000 },
];

let hasFailure = false;

for (const budget of budgets) {
  const fullPath = resolve(process.cwd(), budget.file);

  try {
    const size = statSync(fullPath).size;
    if (size > budget.maxBytes) {
      hasFailure = true;
      console.error(`❌ Budget exceeded: ${budget.file} (${size} bytes > ${budget.maxBytes} bytes)`);
    } else {
      console.log(`✅ Budget ok: ${budget.file} (${size} bytes <= ${budget.maxBytes} bytes)`);
    }
  } catch {
    hasFailure = true;
    console.error(`❌ Missing build artifact: ${budget.file}. Run build before checking budgets.`);
  }
}

if (hasFailure) {
  process.exit(1);
}
