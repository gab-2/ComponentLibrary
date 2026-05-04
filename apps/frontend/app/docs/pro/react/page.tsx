import Link from "next/link";

const access = {
  isAuthenticated: true,
  hasProEntitlement: true,
  plan: "PRO_YEARLY",
};

const npmrcCode = `@sua-marca-ui-pro:registry=https://registry.suamarca.dev
//registry.suamarca.dev/:_authToken=\${NPM_TOKEN}
always-auth=true`;

const installCode = `npm install @sua-marca-ui-pro/react
# ou
pnpm add @sua-marca-ui-pro/react
# ou
yarn add @sua-marca-ui-pro/react`;

const usageCode = `import {
  DataTable,
  DatePicker,
  CommandMenu,
} from "@sua-marca-ui-pro/react";

export function ProExample() {
  return (
    <div>
      <CommandMenu placeholder="Buscar ações..." />
      <DatePicker label="Data de entrega" />
      <DataTable
        columns={[]}
        data={[]}
        emptyMessage="Nenhum registro encontrado."
      />
    </div>
  );
}`;

const toc = [
  ["Acesso", "#acesso"],
  ["Pré-requisitos", "#pre-requisitos"],
  ["Registry", "#registry"],
  ["Instalação", "#instalacao"],
  ["Uso Pro", "#uso-pro"],
  ["Troubleshooting", "#troubleshooting"],
  ["Segurança", "#seguranca"],
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

function LockedState() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-3xl border border-violet-300/20 bg-violet-300/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
            Docs Pro bloqueadas
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Acesso Pro necessário para continuar.
          </h1>
          <p className="mt-5 text-sm leading-6 text-slate-300">
            Esta documentação é destinada a usuários com plano Pro ou Lifetime,
            entitlement ativo e token de registry privado. O acesso é validado
            no backend.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["1", "Faça login", "Entre com a conta usada na compra."],
              [
                "2",
                "Ative Pro",
                "Escolha PRO_MONTHLY, PRO_YEARLY ou LIFETIME.",
              ],
              [
                "3",
                "Gere token",
                "Crie um token no dashboard para instalar pacotes privados.",
              ],
            ].map(([step, title, description]) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-slate-950 p-4"
              >
                <span className="text-sm font-semibold text-violet-200">
                  {step}
                </span>
                <h2 className="mt-3 font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl bg-violet-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200"
            >
              Fazer login
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver planos
            </Link>
            <Link
              href="/docs/react"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver docs públicas React
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ProReactDocsPage() {
  const isAuthorized = access.isAuthenticated && access.hasProEntitlement;

  if (!isAuthorized) {
    return <LockedState />;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_18rem]">
        <article>
          <section id="acesso" className="scroll-mt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              React Pro
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              Documentação privada para React Pro.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300">
              Use componentes premium como DataTable, DatePicker e CommandMenu a
              partir do pacote privado React Pro. Esta página não expõe código
              privado de implementação; apenas mostra instalação e consumo.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                Autorizado
              </span>
              <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                Plano {access.plan}
              </span>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                Registry privado
              </span>
            </div>
          </section>

          <section id="pre-requisitos" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Pré-requisitos</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                [
                  "Plano ativo",
                  "PRO_MONTHLY, PRO_YEARLY ou LIFETIME com status válido.",
                ],
                [
                  "Entitlement Pro",
                  "O backend precisa confirmar que a conta tem acesso Pro ativo.",
                ],
                [
                  "Token de registry",
                  "Token raw criado no dashboard e usado como segredo no ambiente.",
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

          <section id="registry" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Configurar registry</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Use variável de ambiente em produção. Não faça commit do token raw
              em repositórios.
            </p>
            <div className="mt-6">
              <CodeBlock title=".npmrc para Pro" code={npmrcCode} />
            </div>
          </section>

          <section id="instalacao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Instalação</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Após configurar o registry privado, instale o pacote React Pro.
            </p>
            <div className="mt-6">
              <CodeBlock title="Instalar React Pro" code={installCode} />
            </div>
          </section>

          <section id="uso-pro" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">
              Uso dos componentes premium
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Importe componentes premium do pacote privado. O exemplo mostra a
              API de consumo, não a implementação privada.
            </p>
            <div className="mt-6">
              <CodeBlock title="Uso React Pro" code={usageCode} />
            </div>
          </section>

          <section id="troubleshooting" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">
              Troubleshooting de acesso negado
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                [
                  "401",
                  "Token ausente, inválido, mal copiado ou não enviado ao registry.",
                ],
                ["403", "Token válido, mas conta sem entitlement Pro ativo."],
                [
                  "past_due ou unpaid",
                  "Billing inválido deve remover entitlement Pro e bloquear registry.",
                ],
                [
                  "Token revogado",
                  "Tokens revogados devem bloquear novas instalações imediatamente.",
                ],
              ].map(([code, description]) => (
                <article
                  key={code}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
                    {code}
                  </span>
                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="seguranca" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Segurança do token</h2>
            <aside className="mt-6 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
              <h3 className="font-semibold text-amber-100">
                Regras obrigatórias
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                <li>• Token raw aparece apenas uma vez na criação.</li>
                <li>• O backend deve armazenar apenas hash do token.</li>
                <li>• Nunca faça commit do token raw.</li>
                <li>• Use variável de ambiente em CI e produção.</li>
                <li>• Revogação deve bloquear acesso ao registry.</li>
              </ul>
            </aside>
          </section>

          <section id="faq" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">FAQ</h2>
            <div className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04]">
              {[
                [
                  "Pro usa licença runtime no frontend?",
                  "Não. O controle acontece no backend, registry e entitlements.",
                ],
                [
                  "Posso publicar Pro dentro do pacote público?",
                  "Não. Código Pro deve permanecer em pacotes privados fisicamente separados.",
                ],
                [
                  "Lifetime também usa token?",
                  "Sim. Lifetime muda o modelo de cobrança, não a arquitetura de acesso.",
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
              href="/dashboard/tokens"
              className="mt-5 inline-flex w-full justify-center rounded-xl bg-violet-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200"
            >
              Gerenciar tokens
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
