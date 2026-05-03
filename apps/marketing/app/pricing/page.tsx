import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "para sempre",
    description:
      "Para desenvolvedores que querem explorar o conjunto público de componentes.",
    cta: "Começar grátis",
    href: "/signup?plan=free",
    featured: false,
    features: [
      "Pacotes públicos de componentes",
      "Primitives fundamentais de UI",
      "Exemplos básicos",
      "Atualizações públicas",
      "Sem acesso ao registry privado",
    ],
  },
  {
    name: "Pro Mensal",
    price: "$19",
    period: "por mês",
    description:
      "Para quem quer componentes premium sem compromisso de longo prazo.",
    cta: "Assinar mensal",
    href: "/checkout?plan=pro_monthly",
    featured: false,
    features: [
      "Pacotes Pro privados",
      "Token de registry privado",
      "Previews de componentes premium",
      "Atualizações mensais",
      "Cancele quando quiser",
    ],
  },
  {
    name: "Pro Anual",
    price: "$190",
    period: "por ano",
    description:
      "Melhor opção para times construindo produtos SaaS de forma contínua.",
    cta: "Escolher anual",
    href: "/checkout?plan=pro_yearly",
    featured: true,
    features: [
      "Tudo do Pro Mensal",
      "Melhor custo-benefício",
      "Token de registry privado",
      "Atualizações Pro prioritárias",
      "Ideal para times de produto",
    ],
  },
  {
    name: "Lifetime",
    price: "$399",
    period: "pagamento único",
    description:
      "Para times que querem acesso Pro de longo prazo com uma única compra.",
    cta: "Comprar lifetime",
    href: "/checkout?plan=lifetime",
    featured: false,
    features: [
      "Acesso lifetime aos pacotes Pro",
      "Token de registry privado",
      "Atualizações futuras conforme termos",
      "Sem cobrança recorrente",
      "Melhor para builders comprometidos",
    ],
  },
];

const comparison = [
  {
    feature: "Componentes públicos",
    free: "Incluído",
    monthly: "Incluído",
    yearly: "Incluído",
    lifetime: "Incluído",
  },
  {
    feature: "Pacotes Pro privados",
    free: "Não incluído",
    monthly: "Incluído",
    yearly: "Incluído",
    lifetime: "Incluído",
  },
  {
    feature: "Token de registry privado",
    free: "Não incluído",
    monthly: "Incluído",
    yearly: "Incluído",
    lifetime: "Incluído",
  },
  {
    feature: "Código Pro dentro de pacotes públicos",
    free: "Nunca",
    monthly: "Nunca",
    yearly: "Nunca",
    lifetime: "Nunca",
  },
  {
    feature: "Bloqueio de licença no frontend",
    free: "Não",
    monthly: "Não",
    yearly: "Não",
    lifetime: "Não",
  },
  {
    feature: "Suporte a frameworks",
    free: "Frameworks principais",
    monthly: "Todos os suportados",
    yearly: "Todos os suportados",
    lifetime: "Todos os suportados",
  },
  {
    feature: "Atualizações",
    free: "Atualizações públicas",
    monthly: "Enquanto assinar",
    yearly: "Enquanto assinar",
    lifetime: "Conforme termos lifetime",
  },
  {
    feature: "Melhor para",
    free: "Avaliação",
    monthly: "Uso flexível",
    yearly: "Times de produto",
    lifetime: "Uso de longo prazo",
  },
];

const faqs = [
  {
    question: "Como funciona o acesso Pro?",
    answer:
      "Depois do checkout, o usuário recebe acesso a um token de registry privado. Os componentes Pro são instalados por pacotes privados, não pelo pacote público.",
  },
  {
    question: "Posso cancelar o plano mensal?",
    answer:
      "Sim. O plano mensal é flexível. Quando o acesso termina, novas instalações e atualizações pelo registry privado deixam de estar disponíveis.",
  },
  {
    question: "Os componentes Pro ficam escondidos dentro do pacote Free?",
    answer:
      "Não. Componentes Pro não devem ser enviados dentro de pacotes públicos. A distribuição Free e Pro deve permanecer fisicamente separada.",
  },
  {
    question: "Lifetime dispensa o token de registry?",
    answer:
      "Não. Usuários lifetime também usam acesso autenticado ao registry privado. A diferença está no modelo de cobrança, não na arquitetura de entrega.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Planos
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Comece grátis. Faça upgrade quando seu produto precisar de mais
            velocidade.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Pacotes Free são públicos. Pacotes Pro são privados. Escolha o
            modelo de acesso ideal para seu fluxo, time e estágio do produto.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={[
                "relative flex flex-col rounded-3xl border p-6 transition hover:-translate-y-1",
                plan.featured
                  ? "border-cyan-300 bg-cyan-300/10 shadow-2xl shadow-cyan-950/30"
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]",
              ].join(" ")}
            >
              {plan.featured ? (
                <div className="absolute -top-3 left-6 rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950">
                  Recomendado
                </div>
              ) : null}

              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-300">
                {plan.description}
              </p>

              <div className="mt-6">
                <span className="text-4xl font-semibold">{plan.price}</span>
                <span className="ml-2 text-sm text-slate-400">
                  {plan.period}
                </span>
              </div>

              <Link
                href={plan.href}
                className={[
                  "mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]",
                  plan.featured
                    ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200 focus:ring-cyan-200"
                    : "border border-white/15 text-white hover:bg-white/10 focus:ring-white/40",
                ].join(" ")}
              >
                {plan.cta}
              </Link>

              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="text-cyan-300">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Os preços acima são exemplos. Substitua pelos valores reais antes de
          publicar.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-2xl font-semibold">Compare os planos</h2>
            <p className="mt-2 text-sm text-slate-300">
              Separação clara entre adoção pública e entrega privada do Pro.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-semibold">Recurso</th>
                  <th className="px-6 py-4 font-semibold">Free</th>
                  <th className="px-6 py-4 font-semibold">Pro Mensal</th>
                  <th className="px-6 py-4 font-semibold">Pro Anual</th>
                  <th className="px-6 py-4 font-semibold">Lifetime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {comparison.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.03]">
                    <td className="px-6 py-4 font-medium text-white">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-slate-300">{row.free}</td>
                    <td className="px-6 py-4 text-slate-300">{row.monthly}</td>
                    <td className="px-6 py-4 text-cyan-200">{row.yearly}</td>
                    <td className="px-6 py-4 text-slate-300">{row.lifetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-16 md:grid-cols-3 lg:px-8">
          {[
            {
              title: "Cancele o mensal quando quiser",
              description:
                "Mantenha flexibilidade para testar o Pro em produção sem compromisso longo.",
            },
            {
              title: "Acesso por registry privado",
              description:
                "A entrega Pro acontece por instalação autenticada de pacotes, sem expor código publicamente.",
            },
            {
              title: "Atualizações incluídas",
              description:
                "Usuários pagos recebem atualizações premium conforme o modelo de acesso ativo.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-slate-950 p-6"
            >
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h2 className="text-2xl font-semibold">
          Perguntas sobre cobrança e acesso
        </h2>
        <div className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04]">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-6">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 text-center">
          <h2 className="text-2xl font-semibold">
            Pronto para liberar os pacotes Pro privados?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Escolha o Pro Anual para o melhor equilíbrio entre valor,
            atualizações e velocidade de desenvolvimento.
          </p>
          <Link
            href="/checkout?plan=pro_yearly"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
          >
            Fazer upgrade para Pro Anual
          </Link>
        </div>
      </section>
    </main>
  );
}
