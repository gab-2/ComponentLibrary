const installCode = `npm install @sua-marca-ui/web-components
npm install @sua-marca-ui/styles`;

const registerCode = `import "@sua-marca-ui/styles/base.css";
import { registerSuaMarcaComponents } from "@sua-marca-ui/web-components";

registerSuaMarcaComponents();`;

const usageCode = `<ui-card>
  <h2>Criar conta</h2>
  <ui-input label="E-mail" type="email" placeholder="voce@empresa.com"></ui-input>
  <ui-button>Criar conta</ui-button>
</ui-card>`;

const integrationCode = `// Exemplo em qualquer app
document.querySelector("ui-button")?.addEventListener("click", () => {
  console.log("Ação executada");
});`;

const toc = [
  ["Visão geral", "#visao-geral"],
  ["Instalação", "#instalacao"],
  ["Registro", "#registro"],
  ["Uso", "#uso"],
  ["Interoperabilidade", "#interoperabilidade"],
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

export default function WebComponentsDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_18rem]">
        <article>
          <section id="visao-geral" className="scroll-mt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Web Components
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              Componentes interoperáveis para qualquer stack.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300">
              Web Components permitem usar a biblioteca em apps sem adapter
              dedicado, mantendo styles compartilhados e integração com HTML
              padrão.
            </p>
          </section>

          <section id="instalacao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Instalação</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Instale o pacote público de Web Components e os styles base.
            </p>
            <div className="mt-6">
              <CodeBlock title="Instalar pacotes" code={installCode} />
            </div>
          </section>

          <section id="registro" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Registro dos componentes</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Registre os custom elements uma vez no ponto de entrada do app.
            </p>
            <div className="mt-6">
              <CodeBlock title="Registrar Web Components" code={registerCode} />
            </div>
          </section>

          <section id="uso" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Uso básico</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Depois do registro, os elementos podem ser usados como HTML.
            </p>
            <div className="mt-6">
              <CodeBlock title="HTML" code={usageCode} />
            </div>
          </section>

          <section id="interoperabilidade" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">
              Estilo e interoperabilidade
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Web Components funcionam em múltiplas stacks, mas o contrato de
              eventos, atributos e CSS variables precisa ser previsível.
            </p>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <CodeBlock title="Eventos" code={integrationCode} />
              <aside className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
                <h3 className="font-semibold text-cyan-100">Boa prática</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Use atributos para configuração simples, eventos customizados
                  para comunicação e CSS variables para customização visual
                  controlada.
                </p>
              </aside>
            </div>
          </section>

          <section id="troubleshooting" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">
              Troubleshooting Web Components
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                [
                  "Elemento não renderiza",
                  "Confirme se registerSuaMarcaComponents foi chamado antes do uso.",
                ],
                [
                  "Styles não aparecem",
                  "Importe @sua-marca-ui/styles/base.css no app.",
                ],
                [
                  "Evento não dispara",
                  "Verifique o nome do evento e se está ouvindo no elemento correto.",
                ],
                [
                  "Conflito com framework",
                  "Use wrappers finos quando o framework exigir binding específico.",
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
                  "Quando usar Web Components?",
                  "Use quando precisar de interoperabilidade ou quando não existir adapter dedicado para sua stack.",
                ],
                [
                  "Eles substituem adapters nativos?",
                  "Não necessariamente. Adapters nativos oferecem experiência mais idiomática em cada framework.",
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
