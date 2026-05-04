import Link from "next/link";

const installCode = `npm install @sua-marca-ui/react
npm install @sua-marca-ui/styles`;

const stylesCode = `// app/layout.tsx ou main.tsx
import "@sua-marca-ui/styles/base.css";`;

const usageCode = `import { Button, Card, Input } from "@sua-marca-ui/react";

export function SignupCard() {
  return (
    <Card>
      <h2>Criar conta</h2>
      <Input label="E-mail" type="email" placeholder="voce@empresa.com" />
      <Button>Criar conta</Button>
    </Card>
  );
}`;

const compositionCode = `import { Button } from "@sua-marca-ui/react";

export function SaveButton({ isSaving }: { isSaving: boolean }) {
  return (
    <Button disabled={isSaving} aria-busy={isSaving}>
      {isSaving ? "Salvando..." : "Salvar alterações"}
    </Button>
  );
}`;

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

export default function ReactDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_18rem]">
        <article>
          <section id="setup" className="scroll-mt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              React
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              Guia público para React.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300">
              Use o adapter React para consumir componentes públicos em apps
              React, Next.js, Vite ou qualquer ambiente compatível.
            </p>
          </section>

          <section id="instalacao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Instalação</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Instale o adapter React e os styles públicos compartilhados.
            </p>
            <div className="mt-6 grid gap-4">
              <CodeBlock title="Instalar pacotes" code={installCode} />
              <CodeBlock title="Importar styles" code={stylesCode} />
            </div>
          </section>

          <section id="uso-basico" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Uso básico</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Importe componentes diretamente do pacote público React.
            </p>
            <div className="mt-6">
              <CodeBlock title="Componente React" code={usageCode} />
            </div>
          </section>

          <section id="composicao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Estilização e composição</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Prefira composição por props, estados acessíveis e wrappers
              pequenos. Evite duplicar estilos que já existem em tokens e
              variants.
            </p>
            <div className="mt-6">
              <CodeBlock title="Composição com estado" code={compositionCode} />
            </div>

            <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <h3 className="font-semibold text-cyan-100">Boa prática React</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Mantenha lógica de produto no app e use componentes da
                biblioteca para estrutura visual, acessibilidade e consistência.
              </p>
            </div>
          </section>

          <section id="troubleshooting" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Troubleshooting React</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                [
                  "Hydration mismatch",
                  "Evite renderizar valores não determinísticos dentro dos componentes no SSR.",
                ],
                [
                  "Styles não aparecem",
                  "Confirme se o CSS base foi importado no layout raiz ou entrada da aplicação.",
                ],
                [
                  "Erro em Server Components",
                  "Componentes com interação devem ser usados em arquivos client-side quando necessário.",
                ],
                [
                  "Componente Pro não encontrado",
                  "O pacote público React não contém componentes Pro. Use @sua-marca-ui-pro/react com registry privado.",
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
                  "Funciona com Next.js?",
                  "Sim. Importe os styles no layout e use componentes interativos em client components quando necessário.",
                ],
                [
                  "Preciso de token para React público?",
                  "Não. O token é necessário somente para pacotes Pro privados.",
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
            <Link
              href="/docs/pro/react"
              className="mt-5 inline-flex w-full justify-center rounded-xl border border-violet-300/20 bg-violet-300/10 px-4 py-3 text-sm font-semibold text-violet-100 hover:bg-violet-300/15"
            >
              Ver React Pro
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
