import Link from "next/link";

const models = [
  {
    title: "Catálogo Free",
    description:
      "Componentes públicos para adoção, aprendizado e prototipação rápida. Seguros para instalação via pacotes públicos.",
    bullets: [
      "Distribuição por pacote público",
      "Primitives e padrões essenciais",
      "Ótimo para avaliação e onboarding",
    ],
  },
  {
    title: "Preview Pro",
    description:
      "Componentes premium exibidos apenas como preview. O código de implementação permanece dentro dos pacotes privados.",
    bullets: [
      "Entrega por registry privado",
      "Acesso por token de pacote",
      "Nenhum código Pro dentro dos pacotes públicos",
    ],
  },
];

export default function ComponentsHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_34%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Componentes
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Explore o catálogo sem confundir acesso Free e Pro.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Navegue pelos componentes públicos que você pode instalar hoje ou
            veja previews dos padrões premium entregues por registry privado
            após o upgrade.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {models.map((model) => (
            <article
              key={model.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h2 className="text-2xl font-semibold">{model.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {model.description}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {model.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="text-cyan-300">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-16 lg:grid-cols-2 lg:px-8">
        <Link
          href="/components/free"
          className="group rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 transition hover:-translate-y-1 hover:bg-cyan-300/15 focus:outline-none focus:ring-2 focus:ring-cyan-200"
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Público
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Ver componentes Free
              </h2>
            </div>
            <span className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
              Aberto
            </span>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-slate-300">
            Comece com primitives, formulários, navegação, feedback, estados e
            componentes de exibição de dados disponíveis em pacotes públicos.
          </p>
          <p className="mt-8 text-sm font-semibold text-cyan-200 transition group-hover:translate-x-1">
            Ir para o catálogo Free →
          </p>
        </Link>

        <Link
          href="/components/pro"
          className="group rounded-3xl border border-violet-300/20 bg-violet-300/10 p-8 transition hover:-translate-y-1 hover:bg-violet-300/15 focus:outline-none focus:ring-2 focus:ring-violet-200"
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
                Privado
              </p>
              <h2 className="mt-3 text-3xl font-semibold">Ver preview Pro</h2>
            </div>
            <span className="rounded-full border border-violet-200/30 px-4 py-2 text-sm font-semibold text-violet-100">
              Bloqueado
            </span>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-slate-300">
            Veja padrões premium disponíveis após o upgrade. Os previews educam
            compradores sem expor código privado.
          </p>
          <p className="mt-8 text-sm font-semibold text-violet-200 transition group-hover:translate-x-1">
            Ver preview Pro →
          </p>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            Quer acessar os pacotes Pro privados?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Faça upgrade para receber acesso ao registry privado e instalar
            componentes premium sem alterar a arquitetura dos pacotes públicos.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
          >
            Comparar planos
          </Link>
        </div>
      </section>
    </main>
  );
}
