import Link from 'next/link';

export default function DashboardHome() {
  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Use an authenticated email query parameter, e.g. <code>?email=pro@example.com</code>.</p>
      <div className="flex gap-3 text-sm underline">
        <Link href="/dashboard/overview">Overview</Link>
        <Link href="/dashboard/billing">Billing</Link>
        <Link href="/dashboard/install-instructions">Install</Link>
        <Link href="/dashboard/tokens">Tokens</Link>
      </div>
    </section>
  );
}
