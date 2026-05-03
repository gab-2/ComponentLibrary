const installCode = `npm install @sua-marca-ui/angular
npm install @sua-marca-ui/styles`;

const stylesCode = `/* styles.css */
@import "@sua-marca-ui/styles/base.css";`;

const usageCode = `import { Component } from "@angular/core";
import { UiButtonComponent, UiCardComponent, UiInputComponent } from "@sua-marca-ui/angular";

@Component({
  selector: "app-signup-card",
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent, UiInputComponent],
  template: \`
    <ui-card>
      <h2>Criar conta</h2>
      <ui-input label="E-mail" type="email" placeholder="voce@empresa.com" />
      <ui-button>Criar conta</ui-button>
    </ui-card>
  \`,
})
export class SignupCardComponent {}`;

const compositionCode = `import { Component, signal } from "@angular/core";
import { UiButtonComponent } from "@sua-marca-ui/angular";

@Component({
  selector: "app-save-button",
  standalone: true,
  imports: [UiButtonComponent],
  template: \`
    <ui-button [disabled]="isSaving()" [attr.aria-busy]="isSaving()">
      {{ isSaving() ? "Salvando..." : "Salvar alterações" }}
    </ui-button>
  \`,
})
export class SaveButtonComponent {
  isSaving = signal(false);
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

export default function AngularDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_18rem]">
        <article>
          <section id="setup" className="scroll-mt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Angular
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              Guia público para Angular.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300">
              Use componentes públicos em Angular com standalone components,
              templates idiomáticos e styles globais baseados em tokens.
            </p>
          </section>

          <section id="instalacao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Instalação</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Instale o adapter Angular e importe o CSS base no arquivo global
              de styles.
            </p>
            <div className="mt-6 grid gap-4">
              <CodeBlock title="Instalar pacotes" code={installCode} />
              <CodeBlock title="Importar styles" code={stylesCode} />
            </div>
          </section>

          <section id="uso-basico" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Uso básico</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Importe apenas os componentes necessários no array de imports do
              componente standalone.
            </p>
            <div className="mt-6">
              <CodeBlock title="Componente Angular" code={usageCode} />
            </div>
          </section>

          <section id="composicao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Composição Angular</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Use inputs, outputs, signals e templates para controlar estado de
              produto sem duplicar comportamento da biblioteca.
            </p>
            <div className="mt-6">
              <CodeBlock title="Estado com signal" code={compositionCode} />
            </div>

            <aside className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <h3 className="font-semibold text-cyan-100">
                Boa prática Angular
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Prefira standalone imports para reduzir acoplamento e facilitar
                tree-shaking.
              </p>
            </aside>
          </section>

          <section id="troubleshooting" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Troubleshooting Angular</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                [
                  "Componente desconhecido",
                  "Confirme se o componente foi adicionado em imports do standalone component.",
                ],
                [
                  "CSS ausente",
                  "Verifique o import do base.css em styles.css ou angular.json.",
                ],
                [
                  "Erro de binding",
                  "Use a sintaxe Angular correta para props e atributos ARIA.",
                ],
                [
                  "Pacote Pro indisponível",
                  "Pacotes Pro exigem registry privado e entitlement ativo.",
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
                  "Funciona com standalone components?",
                  "Sim. Essa é a forma recomendada para novos projetos Angular.",
                ],
                [
                  "Preciso de NgModule?",
                  "Não para o fluxo recomendado. Use standalone imports quando possível.",
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
