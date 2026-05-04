import Link from "next/link";

const categories = [
  {
    name: "Inputs",
    description: "Controles de formulário para coletar dados do produto.",
    components: ["Button", "Input", "Textarea", "Select", "Checkbox"],
  },
  {
    name: "Feedback",
    description: "Padrões para comunicar status, sucesso, erro e progresso.",
    components: ["Alert", "Toast", "Badge", "Progress", "Skeleton"],
  },
  {
    name: "Navegação",
    description: "Blocos reutilizáveis para dashboards, apps e áreas internas.",
    components: ["Tabs", "Breadcrumb", "Navbar", "Sidebar", "Pagination"],
  },
  {
    name: "Exibição de dados",
    description: "Componentes legíveis para apresentar informações do produto.",
    components: ["Card", "Table", "Avatar", "List", "Stat"],
  },
  {
    name: "Overlays",
    description: "Padrões em camadas para interações focadas.",
    components: ["Modal", "Popover", "Tooltip", "Drawer", "Dropdown"],
  },
  {
    name: "Estados vazios",
    description: "Estados úteis que guiam o usuário para a próxima ação.",
    components: ["Empty State", "Error State", "Loading State", "Upgrade Hint"],
  },
];

const frameworks = [
  {
    name: "React",
    href: "/docs/react",
    command: "npm install @acme-ui/react",
  },
  {
    name: "Vue",
    href: "/docs/vue",
    command: "npm install @acme-ui/vue",
  },
  {
    name: "Svelte",
    href: "/docs/svelte",
    command: "npm install @acme-ui/svelte",
  },
];

export default function FreeComponentsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_34%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Catálogo Free
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Componentes públicos que provam valor antes do upgrade.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Comece a construir com componentes fundamentais disponíveis por
              pacotes públicos. Nenhum token de registry privado é necessário
              para usar os componentes Free.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#start"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
              >
                Começar agora
              </Link>
              <Link
                href="/components/pro"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
              >
                Ver preview Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Categorias
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Uma base prática para interfaces SaaS: formulários, feedback,
              navegação, exibição de dados e estados de produto.
            </p>
          </div>
          <p className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Seguro para pacote público
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.name}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {category.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {category.components.map((component) => (
                  <span
                    key={component}
                    className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {component}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900 p-6">
          <h3 className="font-semibold">
            Exemplo de microcopy para estado vazio
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            “Nenhum componente selecionado ainda. Comece com Button, Input ou
            Card para montar sua primeira tela de produto em poucos minutos.”
          </p>
        </div>
      </section>

      <section id="start" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Comece agora
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                Instale o pacote público e crie sua primeira tela.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Os componentes Free foram pensados para gerar valor imediato:
                estilos consistentes, padrões reutilizáveis e um caminho simples
                para upgrade quando seu time precisar do Pro.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950 p-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900">
                <div className="border-b border-white/10 px-4 py-3 text-xs text-slate-400">
                  terminal
                </div>
                <div className="space-y-4 p-5 font-mono text-sm">
                  <p className="text-slate-500"># Pacote público React</p>
                  <p className="text-cyan-200">npm install @acme-ui/react</p>
                  <p className="pt-3 text-slate-500">
                    # Importe um componente público
                  </p>
                  <p className="text-cyan-200">
                    import &#123; Button &#125; from "@acme-ui/react";
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Docs por framework
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Escolha sua stack e siga instruções específicas de instalação,
              tema e uso.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex w-fit items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Comparar Pro
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {frameworks.map((framework) => (
            <Link
              key={framework.name}
              href={framework.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-cyan-200"
            >
              <h3 className="text-xl font-semibold">{framework.name}</h3>
              <p className="mt-4 rounded-xl bg-slate-900 p-3 font-mono text-xs text-cyan-200">
                {framework.command}
              </p>
              <p className="mt-5 text-sm font-semibold text-cyan-200 transition group-hover:translate-x-1">
                Abrir documentação →
              </p>
            </Link>
          ))}
        </div>
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
