"use client";

import { useState } from "react";
import Link from "next/link";

type BillingStatus = "active" | "past_due" | "unpaid" | "canceled";

const subscription = {
  plan: "PRO_YEARLY",
  status: "active" as BillingStatus,
  renewalDate: "03 maio 2027",
  amount: "$190/ano",
  paymentMethod: "Visa terminado em 4242",
  entitlement: true,
};

function BillingStatusBadge({ status }: { status: BillingStatus }) {
  const config = {
    active: {
      label: "Ativa",
      className: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
    },
    past_due: {
      label: "Pagamento pendente",
      className: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    },
    unpaid: {
      label: "Não paga",
      className: "border-red-300/20 bg-red-300/10 text-red-100",
    },
    canceled: {
      label: "Cancelada",
      className: "border-slate-300/20 bg-white/10 text-slate-200",
    },
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${config[status].className}`}
    >
      {config[status].label}
    </span>
  );
}

export default function DashboardBillingPage() {
  const [feedback, setFeedback] = useState<null | {
    type: "success" | "warning" | "error";
    message: string;
  }>(null);

  const isProblemStatus =
    subscription.status === "past_due" ||
    subscription.status === "unpaid" ||
    subscription.status === "canceled";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Billing
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Controle sua cobrança e acesso Pro.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              O entitlement Pro depende do estado de cobrança. Cancelamentos,
              unpaid e past_due podem remover o acesso ao registry privado.
            </p>
          </div>

          <Link
            href="/dashboard/overview"
            className="inline-flex w-fit items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Voltar ao overview
          </Link>
        </section>

        {feedback ? (
          <div
            role={feedback.type === "error" ? "alert" : "status"}
            className={[
              "mt-6 rounded-3xl border p-5 text-sm",
              feedback.type === "success"
                ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                : feedback.type === "warning"
                  ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
                  : "border-red-300/20 bg-red-300/10 text-red-100",
            ].join(" ")}
          >
            {feedback.message}
          </div>
        ) : null}

        {isProblemStatus ? (
          <section className="mt-6 rounded-3xl border border-red-300/20 bg-red-300/10 p-6">
            <h2 className="text-xl font-semibold text-red-100">
              Acesso Pro pode estar indisponível
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Assinaturas em estado past_due, unpaid ou canceled não devem
              manter entitlement Pro. Atualize o pagamento ou reative o plano
              para restaurar o acesso.
            </p>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-6">
            <h2 className="text-xl font-semibold text-emerald-100">
              Cobrança ativa
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Sua assinatura está ativa e o acesso Pro permanece habilitado no
              backend e no registry privado.
            </p>
          </section>
        )}

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Status da assinatura</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Estado atual usado para calcular entitlement Pro.
                </p>
              </div>
              <BillingStatusBadge status={subscription.status} />
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Plano</dt>
                <dd className="font-medium text-white">{subscription.plan}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Valor</dt>
                <dd className="font-medium text-white">
                  {subscription.amount}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Próxima renovação</dt>
                <dd className="font-medium text-white">
                  {subscription.renewalDate}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Pagamento</dt>
                <dd className="text-right font-medium text-white">
                  {subscription.paymentMethod}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Entitlement Pro</dt>
                <dd
                  className={
                    subscription.entitlement
                      ? "font-medium text-emerald-200"
                      : "font-medium text-red-200"
                  }
                >
                  {subscription.entitlement ? "Ativo" : "Inativo"}
                </dd>
              </div>
            </dl>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Ações de cobrança</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Estas ações devem chamar seu backend ou portal de billing. A UI
              abaixo mostra os feedbacks esperados.
            </p>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() =>
                  setFeedback({
                    type: "success",
                    message:
                      "Portal de pagamento iniciado. Continue para atualizar o método de pagamento.",
                  })
                }
                className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
              >
                Atualizar método de pagamento
              </button>

              <button
                type="button"
                onClick={() =>
                  setFeedback({
                    type: "warning",
                    message:
                      "Fluxo de cancelamento iniciado. Confirme no portal antes de remover a renovação.",
                  })
                }
                className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/15 focus:outline-none focus:ring-2 focus:ring-amber-200 active:scale-[0.98]"
              >
                Cancelar renovação
              </button>

              <button
                type="button"
                onClick={() =>
                  setFeedback({
                    type: "success",
                    message:
                      "Reativação iniciada. Quando o backend confirmar pagamento ativo, o entitlement Pro será restaurado.",
                  })
                }
                className="rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-300/15 focus:outline-none focus:ring-2 focus:ring-emerald-200 active:scale-[0.98]"
              >
                Reativar assinatura
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-4">
              <h3 className="font-medium">Microcopy operacional</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Alterações de cobrança devem atualizar o entitlement no backend.
                O registry deve negar acesso quando a conta estiver sem Pro
                ativo.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
