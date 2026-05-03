const plans = [
  { name: 'FREE', price: '$0', features: ['Public packages', 'Public docs'], cta: 'Get started' },
  { name: 'PRO_MONTHLY', price: '$29/mo', features: ['Private packages', 'Private docs'], cta: 'Subscribe' },
  { name: 'PRO_YEARLY', price: '$290/yr', features: ['Private packages', 'Private docs'], cta: 'Subscribe' },
  { name: 'LIFETIME', price: '$899 one-time', features: ['Permanent Pro access', 'Future updates', 'New components'], cta: 'Buy lifetime' },
];

export default function PricingPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded border bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <p className="mt-1 text-2xl font-bold">{plan.price}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {plan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <button className="mt-4 w-full rounded bg-slate-900 px-3 py-2 text-white">{plan.cta}</button>
          </article>
        ))}
      </div>
    </section>
  );
}
