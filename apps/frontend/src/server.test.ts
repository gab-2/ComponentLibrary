import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('marketing next migration', () => {
  it('contains main pages', () => {
    const home = readFileSync(resolve(process.cwd(), 'app/page.tsx'), 'utf8');
    const pricing = readFileSync(resolve(process.cwd(), 'app/pricing/page.tsx'), 'utf8');
    const components = readFileSync(resolve(process.cwd(), 'app/components/page.tsx'), 'utf8');

    expect(home).toContain('Build faster with multi-framework UI components');
    expect(pricing).toContain('PRO_MONTHLY');
    expect(components).toContain('Free Components');
  });
});
