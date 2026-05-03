import { apiCall } from '../../../lib/api';
import { ensureDashboardAccess } from '../../../components/auth-guard';

export default async function InstallInstructionsPage({ searchParams }: { searchParams?: Promise<{ email?: string }> }) {
  const params = (await searchParams) ?? {};
  ensureDashboardAccess(params.email);
  const result = await apiCall(`/me?email=${encodeURIComponent(params.email!)}`);
  const canAccessPro = Boolean((result.body as { access?: { canAccessPro?: boolean } }).access?.canAccessPro);

  return (
    <section className="space-y-3 rounded border bg-white p-4">
      <h1 className="text-2xl font-semibold">Install instructions</h1>
      <p className="text-sm">{canAccessPro ? 'You can generate and use registry tokens.' : 'Upgrade to Pro or Lifetime to use private packages.'}</p>
      <pre className="rounded bg-slate-100 p-3 text-xs">@sua-marca-ui-pro:registry=http://localhost:4873{`\n`}//localhost:4873/:_authToken=USER_TOKEN</pre>
    </section>
  );
}
