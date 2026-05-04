import { test, expect } from '@playwright/test';

const dashboardBase = process.env.DASHBOARD_E2E_BASE_URL ?? 'http://127.0.0.1:3000';

// Requires services + seed users running locally.
test.describe('Phase 4 dashboard entitlement journeys', () => {
  test('FREE user cannot use pro token generation', async ({ request }) => {
    const response = await request.post(`${dashboardBase}/api/dashboard/tokens`, {
      data: { email: 'free@example.com', name: 'phase4-free' },
    });
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('PRO user can create token while active', async ({ request }) => {
    const response = await request.post(`${dashboardBase}/api/dashboard/tokens`, {
      data: { email: 'pro@example.com', name: 'phase4-pro' },
    });
    expect(response.ok()).toBeTruthy();
  });

  test('LIFETIME user can create token', async ({ request }) => {
    const response = await request.post(`${dashboardBase}/api/dashboard/tokens`, {
      data: { email: 'lifetime@example.com', name: 'phase4-lifetime' },
    });
    expect(response.ok()).toBeTruthy();
  });

  test('revoked token is blocked by registry authorization', async ({ request }) => {
    const create = await request.post(`${dashboardBase}/api/dashboard/tokens`, {
      data: { email: 'pro@example.com', name: 'phase4-revoke' },
    });
    expect(create.ok()).toBeTruthy();

    const createdBody = await create.json();
    const tokenId = createdBody.tokenRecord?.id;
    const tokenValue = createdBody.token;

    expect(tokenId).toBeTruthy();
    expect(tokenValue).toBeTruthy();

    const revoke = await request.delete(`${dashboardBase}/api/dashboard/tokens/${tokenId}`, {
      data: { email: 'pro@example.com' },
    });
    expect(revoke.ok()).toBeTruthy();

    const authorize = await request.post(`${dashboardBase}/api/dashboard/authorize`, {
      data: { token: tokenValue, packageName: '@sua-marca-ui-pro/react', action: 'install' },
    });
    expect(authorize.status()).toBe(403);
  });
});
