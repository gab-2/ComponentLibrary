const components = ['Button', 'Input', 'Card', 'Badge'];

export default function FreeComponentsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Free Components</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        {components.map((name) => <li key={name} className="rounded border bg-white p-4">{name}</li>)}
      </ul>
    </section>
  );
}
