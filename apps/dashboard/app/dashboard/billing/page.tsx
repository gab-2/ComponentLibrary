import { apiCall } from '../../../lib/api';
import { ensureDashboardAccess } from '../../../components/auth-guard';

export default async function BillingPage({ searchParams }: { searchParams?: Promise<{ email?: string }> }) {
  const params = (await searchParams) ?? {};
  ensureDashboardAccess(params.email);
  const result = await apiCall(`/billing/status?email=${encodeURIComponent(params.email!)}`);
  return <pre className="overflow-auto rounded border bg-white p-4 text-sm">{JSON.stringify(result.body, null, 2)}</pre>;
}
