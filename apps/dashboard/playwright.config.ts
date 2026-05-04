import { defineConfig } from '@playwright/test';

const baseURL = process.env.DASHBOARD_E2E_BASE_URL ?? 'http://127.0.0.1:3000';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL,
  },
  webServer: {
    command: 'pnpm --filter @sua-marca-ui/frontend dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
