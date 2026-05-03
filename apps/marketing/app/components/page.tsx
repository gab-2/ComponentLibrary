export default function ComponentsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Components</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded border bg-white p-4">
          <h2 className="font-semibold">Free Components</h2>
          <p className="text-sm text-slate-600">Explore free components available in public packages.</p>
          <a className="mt-3 inline-block text-sm underline" href="/components/free">View free catalog</a>
        </article>
        <article className="rounded border bg-white p-4">
          <h2 className="font-semibold">Pro Preview</h2>
          <p className="text-sm text-slate-600">Preview premium components (locked for FREE users).</p>
          <a className="mt-3 inline-block text-sm underline" href="/components/pro">View pro preview</a>
        </article>
      </div>
    </section>
  );
}
