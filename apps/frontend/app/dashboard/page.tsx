import Link from "next/link";
import type { ReactNode } from "react";

type AlertVariant = "success" | "warning" | "danger" | "info";
type UiState = "loading" | "error" | "empty" | "ready";

function getMockUiState(): UiState {
  return "ready";
}

const account = {
  userName: "Lucas",
  plan: "PRO_YEARLY",
  billingStatus: "active",
  proEntitlement: true,
  hasToken: false,
};

const alerts = [
  {
    variant: "warning" as AlertVariant,
    title: "Token Pro ainda não criado",
    description:
      "Crie seu primeiro token de registry para instalar os pacotes privados Pro.",
    href: "/dashboard/tokens",
    action: "Criar token",
  },
];

const shortcuts = [
  {
    title: "Visão geral",
    description:
      "Veja plano atual, acesso Pro, eventos recentes e próximas ações.",
    href: "/dashboard/overview",
    label: "Abrir overview",
  },
  {
    title: "Billing",
    description: "Gerencie pagamento, assinatura, cancelamento e reativação.",
    href: "/dashboard/billing",
    label: "Gerenciar cobrança",
  },
  {
    title: "Instalação",
    description: "Configure .npmrc, registry privado e variáveis de produção.",
    href: "/dashboard/install-instructions",
    label: "Ver instruções",
  },
  {
    title: "Tokens",
    description: "Crie, copie e revogue tokens de acesso ao registry privado.",
    href: "/dashboard/tokens",
    label: "Gerenciar tokens",
  },
];

const onboarding = [
  {
    title: "Checkout concluído",
    description: "Seu plano Pro foi ativado com sucesso.",
    done: true,
  },
  {
    title: "Token de registry criado",
    description: "Crie um token para instalar pacotes privados.",
    done: false,
  },
  {
    title: ".npmrc configurado",
    description: "Configure o registry no ambiente local e de produção.",
    done: false,
  },
  {
    title: "Primeira instalação validada",
    description:
      "Instale um pacote Pro e confirme que o acesso está funcionando.",
    done: false,
  },
];

function StatusBadge({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "success" | "warning" | "danger" | "info";
}) {
  const styles = {
    success: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
    warning: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    danger: "border-red-300/20 bg-red-300/10 text-red-100",
    info: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

function AccountAlert({
  variant,
  title,
  description,
  href,
  action,
}: {
  variant: AlertVariant;
  title: string;
  description: string;
  href?: string;
  action?: string;
}) {
  const styles = {
    success: "border-emerald-300/20 bg-emerald-300/10",
    warning: "border-amber-300/20 bg-amber-300/10",
    danger: "border-red-300/20 bg-red-300/10",
    info: "border-cyan-300/20 bg-cyan-300/10",
  };

  return (
    <article className={`rounded-3xl border p-5 ${styles[variant]}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </div>

        {href && action ? (
          <Link
            href={href}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.98]"
          >
            {action}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function ShortcutCard({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-cyan-200"
    >
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      <p className="mt-6 text-sm font-semibold text-cyan-200 transition group-hover:translate-x-1">
        {label} →
      </p>
    </Link>
  );
}

function ChecklistItem({
  title,
  description,
  done,
}: {
  title: string;
  description: string;
  done: boolean;
}) {
  return (
    <li className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900 p-4">
      <span
        className={[
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          done ? "bg-emerald-300 text-slate-950" : "bg-white/10 text-slate-300",
        ].join(" ")}
        aria-hidden="true"
      >
        {done ? "✓" : "•"}
      </span>
      <div>
        <h3 className="font-medium text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
      </div>
    </li>
  );
}

export default function DashboardHomePage() {
  const uiState = getMockUiState();

  if (uiState === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-64 animate-pulse rounded bg-white/10" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-300/20 bg-red-300/10 p-8">
          <h1 className="text-2xl font-semibold">
            Não foi possível carregar o dashboard
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Tente novamente em alguns instantes. Se o erro continuar, verifique
            sua sessão ou fale com o suporte.
          </p>
        </div>
      </main>
    );
  }

  if (uiState === "empty") {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <h1 className="text-2xl font-semibold">
            Sua conta ainda não tem dados
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Complete o signup ou escolha um plano para começar a configurar o
            acesso aos componentes.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-flex rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Ver planos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_34%),rgba(255,255,255,0.04)] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                Bem-vindo de volta, {account.userName}.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                Configure seu acesso Pro, gerencie tokens de registry e
                acompanhe o estado da sua conta em um só lugar.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="success">Plano {account.plan}</StatusBadge>
              <StatusBadge tone={account.proEntitlement ? "success" : "danger"}>
                Pro {account.proEntitlement ? "ativo" : "inativo"}
              </StatusBadge>
              <StatusBadge tone="info">
                Billing {account.billingStatus}
              </StatusBadge>
            </div>
          </div>
        </section>

        {alerts.length > 0 ? (
          <section className="mt-6 grid gap-4" aria-label="Alertas da conta">
            {alerts.map((alert) => (
              <AccountAlert key={alert.title} {...alert} />
            ))}
          </section>
        ) : null}

        <section className="mt-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-semibold">Ações principais</h2>
              <p className="mt-2 text-sm text-slate-400">
                Atalhos para as tarefas mais importantes da sua conta.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {shortcuts.map((shortcut) => (
              <ShortcutCard key={shortcut.href} {...shortcut} />
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Checklist pós-compra</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Siga estes passos para liberar a instalação dos pacotes privados
              com segurança.
            </p>

            <ul className="mt-6 space-y-3">
              {onboarding.map((item) => (
                <ChecklistItem key={item.title} {...item} />
              ))}
            </ul>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Resumo operacional</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Plano atual</dt>
                <dd className="font-medium text-white">{account.plan}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Entitlement Pro</dt>
                <dd className="font-medium text-emerald-200">Ativo</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Tokens ativos</dt>
                <dd className="font-medium text-white">
                  {account.hasToken ? "1" : "0"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Próxima ação</dt>
                <dd className="text-right font-medium text-cyan-200">
                  Criar token
                </dd>
              </div>
            </dl>
          </aside>
        </section>
      </div>
    </main>
  );
}
