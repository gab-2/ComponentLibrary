import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const PATTERNS = [/AKIA[0-9A-Z]{16}/, /sk_live_[0-9a-zA-Z]{16,}/, /BEGIN RSA PRIVATE KEY/, /xox[baprs]-[0-9A-Za-z-]{10,}/];
function walk(dir: string, acc: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    if (['.git','node_modules','dist'].includes(e)) continue;
    const p = join(dir,e); const st = statSync(p);
    if (st.isDirectory()) walk(p, acc); else acc.push(p);
  }
  return acc;
}
const hits: string[] = [];
for (const f of walk('.')) {
  if (f.endsWith('.lock') || f.endsWith('tooling/scripts/check-secrets.ts')) continue;
  let c=''; try { c = readFileSync(f,'utf8'); } catch { continue; }
  if (PATTERNS.some((r) => r.test(c))) hits.push(f);
}
if (hits.length) { console.error('Potential secrets found:\n'+hits.join('\n')); process.exit(1); }
console.log('Secret scan passed.');
