import Link from "next/link";

type UiState = "loading" | "error" | "empty" | "ready";

function getMockUiState(): UiState {
  return "ready";
}

const account = {
  plan: "PRO_YEARLY",
  subscriptionStatus: "active",
  proEntitlement: true,
  activeTokens: 1,
  lastRegistryAccess: "Hoje às 10:42",
};

const activity = [
  {
    title: "Token criado",
    description: "Token smui_live_8K2... criado para ambiente local.",
    time: "Hoje às 09:18",
  },
  {
    title: "Entitlement Pro validado",
    description: "Acesso Pro confirmado pelo backend antes da instalação.",
    time: "Ontem às 18:04",
  },
  {
    title: "Plano atualizado",
    description: "Plano alterado para Pro Anual.",
    time: "28 abr. 2026",
  },
];

const recommendations = [
  {
    title: "Configure o .npmrc de produção",
    description:
      "Use variável de ambiente para evitar expor token no repositório.",
    href: "/dashboard/install-instructions",
    action: "Ver guia",
  },
  {
    title: "Revise tokens sem uso",
    description: "Revogue tokens antigos ou sem último uso recente.",
    href: "/dashboard/tokens",
    action: "Gerenciar tokens",
  },
];

function StatusCard({
  label,
  value,
  description,
  tone,
}: {
  label: string;
  value: string;
  description: string;
  tone: "success" | "warning" | "danger" | "info";
}) {
  const styles = {
    success: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
    warning: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    danger: "border-red-300/20 bg-red-300/10 text-red-100",
    info: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  };

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-3 flex items-center gap-3">
        <h2 className="text-2xl font-semibold text-white">{value}</h2>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[tone]}`}
        >
          {tone === "success"
            ? "OK"
            : tone === "warning"
              ? "Atenção"
              : tone === "danger"
                ? "Erro"
                : "Info"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}

export default function DashboardOverviewPage() {
  const uiState = getMockUiState();

  if (uiState === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-72 animate-pulse rounded bg-white/10" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-3xl bg-white/[0.06]"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (uiState === "error") {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-red-300/20 bg-red-300/10 p-8">
          <h1 className="text-2xl font-semibold">Erro ao carregar overview</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Não conseguimos consultar o estado da sua conta. Tente novamente ou
            verifique sua sessão.
          </p>
        </div>
      </main>
    );
  }

  if (uiState === "empty") {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <h1 className="text-2xl font-semibold">Nenhuma conta encontrada</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Complete o cadastro ou escolha um plano para liberar a visão geral.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-flex rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
          >
            Escolher plano
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Overview
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Estado da conta e acesso Pro.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Acompanhe plano, cobrança, entitlement e uso recente do registry
            privado.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatusCard
            label="Plano atual"
            value={account.plan}
            tone="success"
            description="Plano ativo com acesso aos pacotes Pro privados."
          />
          <StatusCard
            label="Billing"
            value={account.subscriptionStatus}
            tone="success"
            description="Cobrança em dia. O entitlement Pro permanece ativo."
          />
          <StatusCard
            label="Acesso Pro"
            value={account.proEntitlement ? "Ativo" : "Inativo"}
            tone={account.proEntitlement ? "success" : "danger"}
            description="Validado no backend antes de permitir acesso ao registry."
          />
          <StatusCard
            label="Tokens ativos"
            value={String(account.activeTokens)}
            tone={account.activeTokens > 0 ? "success" : "warning"}
            description={`Último acesso ao registry: ${account.lastRegistryAccess}.`}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Últimas ações relevantes</h2>
            <div className="mt-6 space-y-3">
              {activity.length > 0 ? (
                activity.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500">{item.time}</p>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 text-center">
                  <h3 className="font-medium">Nenhuma ação recente</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Eventos de tokens, billing e registry aparecerão aqui.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Próximas ações</h2>
            <div className="mt-6 space-y-3">
              {recommendations.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-4 transition hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-cyan-200">
                    {item.action} →
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
