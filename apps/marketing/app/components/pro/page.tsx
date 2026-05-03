const previews = ['DataTable', 'DatePicker'];

export default function ProComponentsPreviewPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Pro Components Preview</h1>
      <div className="rounded border border-amber-300 bg-amber-50 p-4 text-amber-900">
        Upgrade to Pro to unlock premium component packages.
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {previews.map((name) => (
          <li key={name} className="rounded border bg-white p-4">
            <span className="font-medium">{name}</span>
            <span className="ml-2 rounded bg-slate-200 px-2 py-0.5 text-xs">Locked</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
