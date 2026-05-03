import Link from "next/link";

const installCode = `npm install @sua-marca-ui/react
# ou
pnpm add @sua-marca-ui/react
# ou
yarn add @sua-marca-ui/react`;

const usageCode = `import { Button, Card } from "@sua-marca-ui/react";

export function Example() {
  return (
    <Card>
      <h2>Primeira tela</h2>
      <p>Componentes públicos prontos para uso.</p>
      <Button>Continuar</Button>
    </Card>
  );
}`;

const architectureCode = `packages/
  tokens/
  styles/
  core/
  react/
  vue/
  angular/
  svelte/
  web-components/`;

const toc = [
  ["Visão geral", "#visao-geral"],
  ["Conceitos", "#conceitos"],
  ["Instalação", "#instalacao"],
  ["Uso básico", "#uso-basico"],
  ["Boas práticas", "#boas-praticas"],
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

function Note({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "info" | "warning" | "success";
}) {
  const styles = {
    info: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
    warning: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    success: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  };

  return (
    <aside className={`rounded-3xl border p-5 ${styles[tone]}`}>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-slate-300">{children}</div>
    </aside>
  );
}

export default function PublicDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_18rem]">
        <article>
          <section id="visao-geral" className="scroll-mt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Docs públicas
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              Use os pacotes públicos com uma arquitetura limpa.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300">
              Os pacotes públicos contêm a base da biblioteca: tokens, styles,
              core/headless e adapters por framework. Eles são seguros para
              instalação sem token privado e não incluem código Pro.
            </p>
          </section>

          <section id="conceitos" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Conceitos fundamentais</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Tokens",
                  description:
                    "Definem decisões visuais reutilizáveis: cores, radius, spacing, typography e sombras.",
                },
                {
                  title: "Styles",
                  description:
                    "Transformam tokens em CSS base, temas e classes utilitárias compartilháveis.",
                },
                {
                  title: "Core/headless",
                  description:
                    "Centraliza lógica de comportamento sem depender de React, Vue, Angular ou Svelte.",
                },
                {
                  title: "Adapters",
                  description:
                    "Expõem componentes idiomáticos por framework mantendo consistência visual.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="instalacao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Instalação inicial</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Escolha o adapter público do framework usado no seu app. O exemplo
              abaixo usa React, mas a mesma lógica se aplica aos demais
              adapters.
            </p>
            <div className="mt-6">
              <CodeBlock title="Instalar pacote público" code={installCode} />
            </div>
          </section>

          <section id="uso-basico" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Uso básico</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Importe os componentes públicos diretamente do adapter do
              framework. Não é necessário configurar registry privado para
              pacotes públicos.
            </p>
            <div className="mt-6">
              <CodeBlock title="Exemplo público" code={usageCode} />
            </div>
          </section>

          <section id="boas-praticas" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">
              Boas práticas de arquitetura
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                <Note title="Separe público e Pro" tone="warning">
                  Pacotes Pro não devem ser importados, empacotados ou
                  publicados junto com os pacotes públicos.
                </Note>
                <Note title="Use adapters por framework" tone="info">
                  Evite misturar APIs de frameworks diferentes. Cada adapter
                  deve ser idiomático para sua stack.
                </Note>
                <Note title="Centralize decisões visuais" tone="success">
                  Tokens e styles devem ser a fonte de verdade visual da
                  biblioteca.
                </Note>
              </div>
              <CodeBlock
                title="Estrutura recomendada"
                code={architectureCode}
              />
            </div>
          </section>

          <section id="troubleshooting" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Troubleshooting</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                [
                  "Erro de importação",
                  "Confirme se instalou o adapter correto para o framework usado.",
                ],
                [
                  "CSS não aplicado",
                  "Verifique se o arquivo global de styles da biblioteca foi importado no ponto correto do app.",
                ],
                [
                  "Componente Pro indisponível",
                  "Componentes Pro não existem nos pacotes públicos. Use os docs Pro e registry privado.",
                ],
                [
                  "Versões incompatíveis",
                  "Mantenha tokens, styles e adapter na mesma versão semântica.",
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
                  "Preciso de token para pacotes públicos?",
                  "Não. Tokens são necessários apenas para pacotes Pro privados.",
                ],
                [
                  "Posso usar componentes públicos em produção?",
                  "Sim. Os pacotes públicos foram pensados para adoção real e uso em apps de produção.",
                ],
                [
                  "O pacote público contém código Pro escondido?",
                  "Não. Código Pro deve ficar fisicamente separado em pacotes privados.",
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
            <nav className="mt-4 space-y-2 text-sm" aria-label="Sumário">
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
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Ver Pro React
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
