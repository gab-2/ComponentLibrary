import Link from "next/link";

type AccessState = "active" | "inactive" | "loading" | "error";

function getMockAccessState(): AccessState {
  return "active";
}

const localNpmrc = `@sua-marca-pro:registry=https://registry.suamarca.dev
//registry.suamarca.dev/:_authToken=smui_live_xxxxx
always-auth=true`;

const productionNpmrc = `@sua-marca-pro:registry=https://registry.suamarca.dev
//registry.suamarca.dev/:_authToken=\${NPM_TOKEN}
always-auth=true`;

const installCommand = `npm install @sua-marca-pro/react
# ou
pnpm add @sua-marca-pro/react
# ou
yarn add @sua-marca-pro/react`;

const steps = [
  {
    title: "Confirme seu acesso Pro",
    description:
      "Seu plano precisa estar ativo: PRO_MONTHLY, PRO_YEARLY ou LIFETIME.",
  },
  {
    title: "Crie um token",
    description:
      "Gere um token em Tokens. O valor raw será exibido apenas uma vez.",
  },
  {
    title: "Configure o registry",
    description:
      "Adicione o escopo Pro no .npmrc local ou via variável em produção.",
  },
  {
    title: "Instale o pacote privado",
    description:
      "Use npm, pnpm ou yarn para instalar o pacote Pro do framework escolhido.",
  },
];

const troubleshooting = [
  {
    code: "401",
    title: "Token ausente ou inválido",
    description:
      "Confirme se o .npmrc aponta para o registry correto e se o token foi copiado sem espaços extras.",
  },
  {
    code: "403",
    title: "Sem entitlement Pro",
    description:
      "O backend ou registry negou acesso. Verifique se o plano está ativo e se billing não está past_due, unpaid ou canceled.",
  },
  {
    code: "404",
    title: "Pacote ou escopo incorreto",
    description:
      "Verifique o nome do pacote, o escopo privado e se você está tentando instalar a versão correta do framework.",
  },
  {
    code: "REVOGADO",
    title: "Token revogado",
    description:
      "Tokens revogados devem bloquear acesso imediatamente. Crie um novo token e atualize o ambiente.",
  },
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

export default function InstallInstructionsPage() {
  const accessState = getMockAccessState();

  if (accessState === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-80 animate-pulse rounded bg-white/10" />
          <div className="mt-8 h-96 animate-pulse rounded-3xl bg-white/[0.06]" />
        </div>
      </main>
    );
  }

  if (accessState === "error") {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-red-300/20 bg-red-300/10 p-8">
          <h1 className="text-2xl font-semibold">Erro ao validar acesso</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Não conseguimos consultar seu entitlement Pro. Tente novamente antes
            de configurar tokens de produção.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Instalação
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Configure o registry privado sem erro.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Siga o fluxo correto para instalar pacotes Pro. O acesso é
            controlado por backend, registry e entitlements, não por licença
            runtime nos componentes.
          </p>
        </section>

        {accessState === "inactive" ? (
          <section className="mt-6 rounded-3xl border border-red-300/20 bg-red-300/10 p-6">
            <h2 className="text-xl font-semibold text-red-100">
              Acesso Pro inativo
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Você pode ler as instruções, mas precisa de um plano Pro ou
              Lifetime ativo para instalar pacotes privados.
            </p>
            <Link
              href="/pricing"
              className="mt-5 inline-flex rounded-xl bg-red-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-red-100"
            >
              Ver planos
            </Link>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-6">
            <h2 className="text-xl font-semibold text-emerald-100">
              Pré-requisitos atendidos
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Sua conta possui entitlement Pro ativo. Gere ou use um token
              válido para continuar.
            </p>
          </section>
        )}

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Passo a passo</h2>
            <div className="mt-6 space-y-3">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-sm font-semibold text-cyan-200">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          <div className="space-y-4">
            <CodeBlock title=".npmrc local" code={localNpmrc} />
            <CodeBlock title=".npmrc em produção" code={productionNpmrc} />
            <CodeBlock
              title="Instalação do pacote privado"
              code={installCommand}
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Troubleshooting</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Use esta referência para reduzir erros comuns de configuração do
            registry privado.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {troubleshooting.map((item) => (
              <article
                key={item.code}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
                  {item.code}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
          <h2 className="text-xl font-semibold text-amber-100">
            Notas de segurança
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
            <li>• Nunca faça commit de token raw no repositório.</li>
            <li>• Em produção, use variável de ambiente como NPM_TOKEN.</li>
            <li>
              • Token raw aparece apenas uma vez na criação; armazene com
              segurança.
            </li>
            <li>• O backend deve armazenar apenas hash do token.</li>
            <li>
              • Revogar token deve bloquear acesso ao registry imediatamente.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
