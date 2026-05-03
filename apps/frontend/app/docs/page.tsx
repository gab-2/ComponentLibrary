import Link from "next/link";

const profiles = [
  {
    title: "Estou começando agora",
    description:
      "Instale o pacote público, renderize seu primeiro componente e entenda a estrutura base.",
    href: "/docs/public",
    action: "Começar pelo público",
  },
  {
    title: "Estou migrando uma UI existente",
    description:
      "Use tokens, styles e adapters por framework para adotar a biblioteca de forma gradual.",
    href: "/docs/react",
    action: "Ver guia React",
  },
  {
    title: "Preciso configurar Pro",
    description:
      "Configure entitlement, token de registry e instalação de pacotes privados com segurança.",
    href: "/docs/pro/react",
    action: "Abrir docs Pro",
  },
];

const frameworks = [
  {
    name: "React",
    href: "/docs/react",
    description: "Guia público para apps React e Next.js.",
  },
  {
    name: "Vue",
    href: "/docs/vue",
    description: "Instalação e uso idiomático em Vue.",
  },
  {
    name: "Angular",
    href: "/docs/angular",
    description: "Uso com módulos, standalone components e Angular apps.",
  },
  {
    name: "Svelte",
    href: "/docs/svelte",
    description: "Uso direto com componentes Svelte.",
  },
  {
    name: "Web Components",
    href: "/docs/web-components",
    description: "Integração interoperável com qualquer stack.",
  },
];

function Toc() {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm font-semibold text-white">Nesta página</p>
      <nav className="mt-4 space-y-2 text-sm" aria-label="Navegação interna">
        {[
          ["Perfis", "#perfis"],
          ["Frameworks", "#frameworks"],
          ["Público vs Pro", "#publico-vs-pro"],
          ["Arquitetura", "#arquitetura"],
          ["Próximos passos", "#proximos-passos"],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default function DocsHomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_18rem]">
        <div>
          <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_34%),rgba(255,255,255,0.04)] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Documentação
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Integre componentes UI multi-framework com clareza e segurança.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-300">
              Aprenda a instalar pacotes públicos, entender a arquitetura por
              camadas e configurar pacotes Pro privados com entitlement e token
              de registry.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs/public"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
              >
                Começar agora
              </Link>
              <Link
                href="/docs/pro/react"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
              >
                Ver docs Pro
              </Link>
            </div>
          </section>

          <section id="perfis" className="mt-10 scroll-mt-28">
            <h2 className="text-3xl font-semibold tracking-tight">
              Escolha seu caminho
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              A documentação foi organizada por objetivo para reduzir o tempo
              até o primeiro sucesso.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {profiles.map((profile) => (
                <Link
                  key={profile.title}
                  href={profile.href}
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  <h3 className="text-xl font-semibold">{profile.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {profile.description}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-cyan-200 transition group-hover:translate-x-1">
                    {profile.action} →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section id="frameworks" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold tracking-tight">
              Documentação por framework
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Cada adapter segue o estilo idiomático do framework, mantendo
              consistência visual por tokens e styles compartilhados.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {frameworks.map((framework) => (
                <Link
                  key={framework.href}
                  href={framework.href}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  <h3 className="text-xl font-semibold">{framework.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {framework.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section id="publico-vs-pro" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold tracking-tight">
              Público vs Pro
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-6">
                <h3 className="text-xl font-semibold text-emerald-100">
                  Pacotes públicos
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Contêm componentes fundamentais, tokens, styles e adapters
                  públicos. São indicados para adoção inicial, prototipação e
                  uso gratuito.
                </p>
                <Link
                  href="/docs/public"
                  className="mt-6 inline-flex text-sm font-semibold text-emerald-100 hover:underline"
                >
                  Ler docs públicas →
                </Link>
              </article>

              <article className="rounded-3xl border border-violet-300/20 bg-violet-300/10 p-6">
                <h3 className="text-xl font-semibold text-violet-100">
                  Pacotes Pro privados
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  São distribuídos por registry privado. Exigem plano com
                  entitlement ativo e token de registry. O código Pro não deve
                  aparecer em pacotes públicos.
                </p>
                <Link
                  href="/docs/pro/react"
                  className="mt-6 inline-flex text-sm font-semibold text-violet-100 hover:underline"
                >
                  Ler docs Pro →
                </Link>
              </article>
            </div>
          </section>

          <section id="arquitetura" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold tracking-tight">
              Arquitetura recomendada
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                [
                  "1",
                  "Tokens",
                  "Cores, spacing, radius, sombras e tipografia.",
                ],
                ["2", "Styles", "CSS base e temas derivados dos tokens."],
                [
                  "3",
                  "Core/headless",
                  "Lógica e comportamento independentes de framework.",
                ],
                [
                  "4",
                  "Adapters",
                  "React, Vue, Angular, Svelte e Web Components.",
                ],
              ].map(([step, title, description]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <span className="text-sm font-semibold text-cyan-300">
                    {step}
                  </span>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="proximos-passos"
            className="mt-12 scroll-mt-28 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8"
          >
            <h2 className="text-3xl font-semibold tracking-tight">
              Próximos passos
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Comece pelos pacotes públicos. Depois, configure Pro apenas quando
              precisar de componentes premium e acesso ao registry privado.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs/public"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Instalar pacote público
              </Link>
              <Link
                href="/docs/pro/react"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Configurar Pro React
              </Link>
            </div>
          </section>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-32">
            <Toc />
          </div>
        </div>
      </div>
    </main>
  );
}
