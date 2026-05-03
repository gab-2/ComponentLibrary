import Link from "next/link";

const proComponents = [
  {
    name: "Tabela avançada",
    category: "Dados",
    description:
      "Filtros, ações em massa, visualizações salvas e estados de tabela para SaaS.",
  },
  {
    name: "Portal de cobrança",
    category: "Comercial",
    description:
      "Cards de plano, faturas, métodos de pagamento e prompts de upgrade.",
  },
  {
    name: "Central de comandos",
    category: "Navegação",
    description:
      "Navegação para power users em dashboards, admin tools e apps internos.",
  },
  {
    name: "Fluxo de onboarding",
    category: "Ativação",
    description:
      "Telas passo a passo com progresso, orientação e estados vazios.",
  },
  {
    name: "Matriz de permissões",
    category: "Times",
    description:
      "Interface de acesso por função para organizações, membros e configurações.",
  },
  {
    name: "Dashboard analítico",
    category: "Insights",
    description:
      "Cards de métricas, layout de gráficos, filtros e painéis de resumo.",
  },
];

const benefits = [
  {
    title: "Padrões SaaS premium",
    description:
      "Evite ciclos caros de design para cobrança, onboarding, permissões, analytics e fluxos complexos de produto.",
  },
  {
    title: "Entrega por pacote privado",
    description:
      "Instale componentes Pro a partir de um registry privado usando acesso por token depois do upgrade.",
  },
  {
    title: "Arquitetura pública limpa",
    description:
      "Seu pacote público continua público. O código Pro não precisa ser empacotado dentro da distribuição Free.",
  },
];

export default function ProComponentsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.24),transparent_36%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Preview Pro
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Padrões premium de UI para times construindo SaaS de verdade.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Mostre o que o Pro desbloqueia sem expor o código privado de
            implementação. O acesso completo é entregue por pacotes privados e
            autenticação de registry.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-violet-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-200 active:scale-[0.98]"
            >
              Desbloquear Pro
            </Link>
            <Link
              href="/components/free"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
            >
              Ver Free primeiro
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="font-semibold text-amber-100">
                Acesso Pro necessário
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Estes previews são bloqueados intencionalmente. Usuários Free
                podem avaliar o valor do produto, mas o código de implementação
                Pro só é entregue por pacotes privados após o checkout.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-100 active:scale-[0.98]"
            >
              Ver opções de acesso
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Previews Pro bloqueados
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Mostre valor suficiente para converter visitantes, mantendo o
              código-fonte e a distribuição dos pacotes em ambiente privado.
            </p>
          </div>
          <p className="rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-sm font-medium text-violet-100">
            Apenas via registry privado
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proComponents.map((component) => (
            <article
              key={component.name}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="relative border-b border-white/10 bg-slate-900 p-5">
                <div className="absolute right-5 top-5 rounded-full border border-violet-200/30 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                  Bloqueado
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 blur-[1px] transition group-hover:blur-0">
                  <div className="h-3 w-28 rounded-full bg-white/20" />
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="h-16 rounded-xl bg-violet-300/20" />
                    <div className="h-16 rounded-xl bg-white/10" />
                    <div className="h-16 rounded-xl bg-white/10" />
                  </div>
                  <div className="mt-4 h-24 rounded-xl bg-white/10" />
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                  {component.category}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{component.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {component.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Por que fazer upgrade
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              O Pro foi criado para times que precisam de alavancagem.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-white/10 bg-slate-950 p-6"
              >
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-3xl border border-violet-300/20 bg-violet-300/10 p-8 text-center sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Desbloqueie pacotes Pro privados e entregue UI avançada mais rápido.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Faça upgrade para receber acesso ao registry privado via token. Seus
            pacotes públicos continuam limpos e os componentes Pro permanecem
            protegidos em infraestrutura privada de pacotes.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-violet-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-200 active:scale-[0.98]"
            >
              Comparar planos Pro
            </Link>
            <Link
              href="/checkout?plan=pro_yearly"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
            >
              Assinar Pro Anual
            </Link>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            Os cards de preview são representações de marketing. Não inclua
            código-fonte Pro em bundles de pacotes públicos.
          </p>
        </div>
      </section>
    </main>
  );
}
