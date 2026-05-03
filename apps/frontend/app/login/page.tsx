import Link from "next/link";

type LoginUiState = "ready" | "error" | "success";

function getMockLoginUiState(): LoginUiState {
  return "ready";
}

const steps = [
  {
    title: "Entre com sua conta",
    description:
      "Use o mesmo e-mail utilizado no checkout ou no cadastro inicial.",
  },
  {
    title: "Valide seu acesso",
    description:
      "Após o login, verificamos plano, billing status e entitlement Pro no backend.",
  },
  {
    title: "Acesse o dashboard",
    description:
      "Com a sessão ativa, você poderá gerenciar billing, tokens e instruções de instalação.",
  },
];

export default function LoginPage() {
  const uiState = getMockLoginUiState();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_34%),rgba(255,255,255,0.04)] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Login necessário
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Entre para acessar seu dashboard.
          </h1>
          <p className="mt-5 text-sm leading-6 text-slate-300">
            Esta área contém dados de cobrança, tokens de registry e instruções
            privadas de instalação. Por segurança, precisamos confirmar sua
            identidade antes de continuar.
          </p>

          {uiState === "error" ? (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm text-red-100"
            >
              Não foi possível iniciar o login. Tente novamente ou fale com o
              suporte.
            </div>
          ) : null}

          {uiState === "success" ? (
            <div
              role="status"
              className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100"
            >
              Login iniciado. Continue no provedor de autenticação.
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/api/auth/login"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
            >
              Fazer login
            </Link>

            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
            >
              Ver documentação
            </Link>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-400">
            O acesso Pro é validado pelo backend com base em plano, billing
            status e entitlements. Os componentes instalados não dependem de
            licença runtime no frontend.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">Como o acesso funciona</h2>
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

          <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
            <h3 className="font-medium text-amber-100">Não consegue entrar?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Confirme se você está usando o e-mail da compra. Se o pagamento
              estiver cancelado, unpaid ou past_due, o entitlement Pro pode
              estar inativo.
            </p>
            <Link
              href="/support"
              className="mt-4 inline-flex text-sm font-semibold text-amber-100 hover:underline"
            >
              Falar com suporte →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
