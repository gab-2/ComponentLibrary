import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dirs = readdirSync('packages', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => join('packages', d.name));
const errs: string[] = [];
for (const dir of dirs) {
  const pj = join(dir, 'package.json');
  try {
    const j = JSON.parse(readFileSync(pj, 'utf8'));
    if (String(j.name || '').startsWith('@sua-marca-pro/')) {
      if (j.publishConfig?.registry !== 'https://registry.sua-marca.com') errs.push(`${j.name} missing private publishConfig.registry`);
    }
  } catch {}
}
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
console.log('Private publish config check passed.');
