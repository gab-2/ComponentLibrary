export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-bold">Build faster with multi-framework UI components</h1>
      <p className="max-w-2xl text-slate-600">Production-ready component system with public and private packages, multi-framework adapters and scalable SaaS distribution.</p>
      <div className="flex gap-3">
        <a href="/pricing" className="rounded bg-slate-900 px-4 py-2 text-white">View Pricing</a>
        <a href="/components" className="rounded border px-4 py-2">Read Docs</a>
      </div>
      <ul className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        {['component-preview','free-components','pro-preview-locked','framework-support','private-registry-access'].map((s) => (
          <li key={s} className="rounded border bg-white p-3">{s}</li>
        ))}
      </ul>
    </section>
  );
}
