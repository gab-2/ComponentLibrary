import Link from "next/link";

const benefits = [
  {
    title: "Entregue interfaces mais rápido",
    description:
      "Comece com padrões prontos para produção em vez de recriar botões, formulários, layouts, tabelas e estados do zero.",
  },
  {
    title: "Mantenha consistência visual",
    description:
      "Use primitives, tokens e padrões de interação compartilhados entre produtos, times e frameworks.",
  },
  {
    title: "Free e Pro ficam fisicamente separados",
    description:
      "Os pacotes públicos continuam limpos. Componentes Pro são distribuídos apenas por um registry privado com acesso por token.",
  },
  {
    title: "Pronto para distribuição SaaS",
    description:
      "Suporte adoção gratuita, upgrades pagos, pacotes privados, autenticação de registry e entrega escalável.",
  },
  {
    title: "Multi-framework por design",
    description:
      "Ofereça APIs e sistemas visuais consistentes em React, Vue, Svelte e outros frameworks modernos.",
  },
  {
    title: "Sem bloqueio de licença no frontend instalado",
    description:
      "O acesso é controlado na distribuição dos pacotes, não por verificações de licença dentro dos componentes instalados.",
  },
];

const steps = [
  {
    eyebrow: "01",
    title: "Use pacotes públicos no Free",
    description:
      "Usuários Free instalam pacotes públicos com componentes fundamentais, exemplos e padrões básicos de UI.",
  },
  {
    eyebrow: "02",
    title: "Faça upgrade para pacotes Pro privados",
    description:
      "Usuários Pro recebem credenciais de registry e instalam componentes premium a partir de uma fonte privada fisicamente separada.",
  },
  {
    eyebrow: "03",
    title: "Escale com o seu produto",
    description:
      "Times acessam componentes avançados, atualizações e pacotes por framework sem expor código privado publicamente.",
  },
];

const previews = [
  "Menu de comandos",
  "Tabela avançada",
  "Card de cobrança",
  "Formulário de autenticação",
  "Estado vazio",
  "Painel de configurações",
];

const frameworks = ["React", "Next.js", "Vue", "Nuxt", "Svelte", "Astro"];

const faqs = [
  {
    question: "Componentes Pro são enviados dentro dos pacotes públicos?",
    answer:
      "Não. Pacotes públicos e privados ficam fisicamente separados. O código Pro é distribuído apenas pelo registry privado.",
  },
  {
    question: "Existe validação de licença dentro dos componentes instalados?",
    answer:
      "Não. O acesso é controlado por assinatura ou compra lifetime e por tokens de registry privado, não por bloqueios em runtime no frontend.",
  },
  {
    question: "Usuários Free podem ver previews de componentes Pro?",
    answer:
      "Sim. Previews de marketing podem mostrar o valor do Pro, mas nunca devem expor o código de implementação privado.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_36%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_34%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              Componentes UI multi-framework para distribuição Free + Pro
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Construa uma biblioteca de componentes sem vazar seu código Pro.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Uma plataforma premium de componentes UI para adoção pública,
              entrega privada de pacotes, acesso por token de registry e
              consistência visual entre frameworks modernos.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
              >
                Ver planos
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
              >
                Explorar componentes
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Pacote Free público. Registry Pro privado. Sem bloqueio de licença
              dentro do componente frontend.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <div className="rounded-2xl border border-white/10 bg-slate-900">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-slate-400">
                  configuracao-registry-privado
                </span>
              </div>

              <div className="space-y-4 p-5 font-mono text-sm">
                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-slate-500"># Pacote público Free</p>
                  <p className="mt-2 text-cyan-200">
                    npm install @acme-ui/react
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-slate-500"># Registry privado Pro</p>
                  <p className="mt-2 text-violet-200">
                    npm config set @acme-pro:registry
                  </p>
                  <p className="text-violet-200">
                    https://registry.acme-ui.com
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <p className="text-emerald-200">
                    ✓ Pacotes públicos e privados permanecem separados
                  </p>
                  <p className="mt-1 text-emerald-200">
                    ✓ Acesso Pro controlado por autenticação via token
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {["42+ componentes", "6 frameworks", "Pro privado"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center"
                  >
                    <p className="text-sm font-semibold text-white">{item}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      pronto para escalar
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Valor do produto
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Mais que um catálogo de componentes. Um sistema de distribuição de
            UI.
          </h2>
          <p className="mt-4 text-slate-300">
            Criado para times que precisam de adoção, monetização e confiança
            técnica desde o primeiro dia.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <h3 className="text-lg font-semibold text-white">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Como funciona
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Free para adoção. Pro para distribuição privada.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-3xl border border-white/10 bg-slate-950 p-6"
              >
                <span className="text-sm font-semibold text-cyan-300">
                  {step.eyebrow}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Preview dos componentes
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Padrões de interface que seus usuários entendem rapidamente.
            </h2>
          </div>
          <Link
            href="/components"
            className="inline-flex w-fit items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Ver catálogo
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previews.map((preview) => (
            <article
              key={preview}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                <div className="h-3 w-24 rounded-full bg-white/20" />
                <div className="mt-4 space-y-2">
                  <div className="h-10 rounded-xl bg-white/10" />
                  <div className="h-10 rounded-xl bg-white/10" />
                  <div className="h-10 rounded-xl bg-cyan-300/20" />
                </div>
              </div>
              <h3 className="mt-5 font-semibold text-white">{preview}</h3>
              <p className="mt-2 text-sm text-slate-400">
                Responsivo, preparado para acessibilidade e pensado para
                interfaces SaaS em produção.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Suporte multi-framework
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Uma experiência de produto. Várias stacks frontend.
            </h2>
            <p className="mt-4 text-slate-300">
              Entregue um sistema visual consistente sem obrigar o time a trocar
              o framework que já usa.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {frameworks.map((framework) => (
              <span
                key={framework}
                className="rounded-full border border-white/10 bg-slate-950 px-5 py-3 text-sm font-medium text-slate-200"
              >
                {framework}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 text-center sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Transforme sua biblioteca de componentes em um produto SaaS
            escalável.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Comece com componentes Free, converta com previews Pro e entregue UI
            premium por um registry privado criado para acesso pago.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
            >
              Escolher plano
            </Link>
            <Link
              href="/components/pro"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
            >
              Ver preview Pro
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 lg:px-8">
        <h2 className="text-2xl font-semibold text-white">
          Perguntas frequentes
        </h2>
        <div className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04]">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-6">
              <h3 className="font-semibold text-white">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
