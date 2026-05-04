const installCode = `npm install @sua-marca-ui/svelte
npm install @sua-marca-ui/styles`;

const stylesCode = `// app.css ou +layout.svelte
@import "@sua-marca-ui/styles/base.css";`;

const usageCode = `<script lang="ts">
  import { Button, Card, Input } from "@sua-marca-ui/svelte";
</script>

<Card>
  <h2>Criar conta</h2>
  <Input label="E-mail" type="email" placeholder="voce@empresa.com" />
  <Button>Criar conta</Button>
</Card>`;

const compositionCode = `<script lang="ts">
  import { Button } from "@sua-marca-ui/svelte";

  let isSaving = false;
</script>

<Button disabled={isSaving} aria-busy={isSaving}>
  {isSaving ? "Salvando..." : "Salvar alterações"}
</Button>`;

const toc = [
  ["Setup", "#setup"],
  ["Instalação", "#instalacao"],
  ["Uso básico", "#uso-basico"],
  ["Composição", "#composicao"],
  ["Troubleshooting", "#troubleshooting"],
  ["FAQ", "#faq"],
];

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
      <div className="border-b border-white/10 px-5 py-3">
        <p className="text-sm font-medium text-slate-300">{title}</p>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-6 text-cyan-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function SvelteDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_18rem]">
        <article>
          <section id="setup" className="scroll-mt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Svelte
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              Guia público para Svelte.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300">
              Use componentes públicos de forma direta em Svelte e SvelteKit,
              mantendo styles globais compartilhados por tokens.
            </p>
          </section>

          <section id="instalacao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Instalação</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Instale o adapter Svelte e importe os styles base no app.
            </p>
            <div className="mt-6 grid gap-4">
              <CodeBlock title="Instalar pacotes" code={installCode} />
              <CodeBlock title="Importar styles" code={stylesCode} />
            </div>
          </section>

          <section id="uso-basico" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Uso básico</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Importe componentes públicos diretamente no arquivo `.svelte`.
            </p>
            <div className="mt-6">
              <CodeBlock title="Componente Svelte" code={usageCode} />
            </div>
          </section>

          <section id="composicao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Estilização e composição</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Svelte favorece composição simples. Use props, slots e estado
              local sem duplicar tokens ou styles.
            </p>
            <div className="mt-6">
              <CodeBlock title="Composição Svelte" code={compositionCode} />
            </div>

            <aside className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <h3 className="font-semibold text-cyan-100">
                Boa prática Svelte
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Use slots para compor conteúdo e mantenha comportamento de
                produto fora dos componentes visuais.
              </p>
            </aside>
          </section>

          <section id="troubleshooting" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Troubleshooting Svelte</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                [
                  "Styles não aplicam",
                  "Confirme o import do base.css em app.css ou no layout global.",
                ],
                [
                  "Erro de SSR",
                  "Evite acessar window/document durante renderização no servidor.",
                ],
                [
                  "Props não reconhecidas",
                  "Verifique a API do adapter Svelte e os nomes das props.",
                ],
                [
                  "Componente Pro não existe",
                  "Componentes Pro ficam no pacote privado, não no adapter público.",
                ],
              ].map(([title, description]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="faq" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">FAQ</h2>
            <div className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04]">
              {[
                [
                  "Funciona com SvelteKit?",
                  "Sim. Importe os styles no ponto global do app e use os componentes nos arquivos .svelte.",
                ],
                [
                  "Preciso configurar registry privado?",
                  "Somente para pacotes Pro. O adapter público não exige token.",
                ],
              ].map(([question, answer]) => (
                <div key={question} className="p-6">
                  <h3 className="font-semibold">{question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-32 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-semibold">Nesta página</p>
            <nav className="mt-4 space-y-2 text-sm">
              {toc.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}
