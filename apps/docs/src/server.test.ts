import { describe, expect, it, vi } from 'vitest';
import { canAccessPro } from '../lib/pro-access';

describe('docs migration', () => {
  it('denies when no email', async () => {
    expect(await canAccessPro(undefined)).toBe(false);
  });

  it('handles API success', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ access: { canAccessPro: true } }) })));
    expect(await canAccessPro('pro@test.com')).toBe(true);
  });
});
