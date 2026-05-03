import Link from 'next/link';
import { canAccessPro } from '../../../../lib/pro-access';

export default async function ProReactDocsPage({ searchParams }: { searchParams?: Promise<{ email?: string }> }) {
  const params = (await searchParams) ?? {};
  const allowed = await canAccessPro(params.email);

  if (!allowed) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">React Pro Docs</h1>
        <p className="rounded border border-amber-300 bg-amber-50 p-3 text-amber-900">Access denied. Upgrade to Pro/Lifetime to view private docs.</p>
        <Link href="/docs/public" className="underline">Go to public docs</Link>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold">React Pro Docs</h1>
      <p>Package: <code>@sua-marca-ui-pro/react</code></p>
      <p>Install: <code>pnpm add @sua-marca-ui-pro/react</code></p>
      <ul className="list-disc pl-5"><li>DataTable</li><li>DatePicker</li><li>CommandMenu</li></ul>
    </section>
  );
}
