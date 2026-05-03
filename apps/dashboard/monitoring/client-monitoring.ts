export type MonitoringContext = Record<string, unknown>;

export function captureClientError(error: unknown, context: MonitoringContext = {}) {
  // Placeholder adapter for Sentry (or equivalent) integration.
  // Keep implementation lightweight during migration; wire provider in Phase 5/ops rollout.
  console.error('[dashboard-client-error]', { error, ...context });
}
