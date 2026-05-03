import { describe, expect, it, vi } from 'vitest';
import { apiCall, requireEmail } from '../lib/api';

describe('dashboard migration helpers', () => {
  it('validates email requirement', () => {
    expect(requireEmail('user@example.com')).toBe(true);
    expect(requireEmail('')).toBe(false);
  });

  it('returns status/body from api call', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ status: 200, json: async () => ({ ok: true }) })));
    const result = await apiCall('/health');
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ ok: true });
  });
});
