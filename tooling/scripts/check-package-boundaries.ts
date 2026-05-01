import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir: string, acc: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (['node_modules', 'dist', '.git'].includes(e)) continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx|js|jsx|vue|svelte)$/.test(e)) acc.push(p);
  }
  return acc;
}

const publicPkgs = ['packages/react', 'packages/vue', 'packages/angular', 'packages/svelte', 'packages/web-components', 'packages/core', 'packages/styles', 'packages/tokens'];
let violations: string[] = [];
for (const dir of publicPkgs) {
  for (const f of walk(dir)) {
    const c = readFileSync(f, 'utf8');
    if (c.includes('@sua-marca-pro/')) violations.push(f);
  }
}
if (violations.length) {
  console.error('Public package boundary violations found:\n' + violations.join('\n'));
  process.exit(1);
}
console.log('Boundary check passed.');
