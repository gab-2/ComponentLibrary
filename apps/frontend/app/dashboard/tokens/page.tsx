"use client";

import { useMemo, useState } from "react";

type TokenStatus = "active" | "revoked";

type RegistryToken = {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt: string | null;
  status: TokenStatus;
};

const initialTokens: RegistryToken[] = [
  {
    id: "tok_1",
    name: "Ambiente local",
    prefix: "smui_live_8K2",
    createdAt: "03 maio 2026",
    lastUsedAt: "Hoje às 10:42",
    status: "active",
  },
  {
    id: "tok_2",
    name: "CI antigo",
    prefix: "smui_live_R9Q",
    createdAt: "20 abril 2026",
    lastUsedAt: "22 abril 2026",
    status: "revoked",
  },
];

function createMockRawToken() {
  const random = Math.random().toString(36).slice(2, 18);
  return `smui_live_${random}_${Date.now().toString(36)}`;
}

function StatusBadge({ status }: { status: TokenStatus }) {
  const styles = {
    active: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
    revoked: "border-red-300/20 bg-red-300/10 text-red-100",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status === "active" ? "Ativo" : "Revogado"}
    </span>
  );
}

export default function DashboardTokensPage() {
  const [tokens, setTokens] = useState<RegistryToken[]>(initialTokens);
  const [tokenName, setTokenName] = useState("");
  const [newRawToken, setNewRawToken] = useState<string | null>(null);
  const [pendingRevokeId, setPendingRevokeId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<null | {
    type: "success" | "warning" | "error";
    message: string;
  }>(null);

  const activeTokens = useMemo(
    () => tokens.filter((token) => token.status === "active"),
    [tokens],
  );

  function handleCreateToken() {
    if (!tokenName.trim()) {
      setFeedback({
        type: "error",
        message: "Informe um nome para identificar onde este token será usado.",
      });
      return;
    }

    const raw = createMockRawToken();
    const prefix = raw.slice(0, 13);

    const nextToken: RegistryToken = {
      id: `tok_${Date.now()}`,
      name: tokenName.trim(),
      prefix,
      createdAt: "Agora",
      lastUsedAt: null,
      status: "active",
    };

    setTokens((current) => [nextToken, ...current]);
    setNewRawToken(raw);
    setTokenName("");
    setFeedback({
      type: "success",
      message:
        "Token criado. Copie o valor agora: ele não será exibido novamente.",
    });
  }

  function handleCopyToken() {
    if (!newRawToken) return;

    navigator.clipboard
      .writeText(newRawToken)
      .then(() => {
        setFeedback({
          type: "success",
          message: "Token copiado para a área de transferência.",
        });
      })
      .catch(() => {
        setFeedback({
          type: "error",
          message: "Não foi possível copiar. Selecione e copie manualmente.",
        });
      });
  }

  function handleRevokeToken() {
    if (!pendingRevokeId) return;

    setTokens((current) =>
      current.map((token) =>
        token.id === pendingRevokeId ? { ...token, status: "revoked" } : token,
      ),
    );

    setPendingRevokeId(null);
    setFeedback({
      type: "warning",
      message:
        "Token revogado. O registry deve bloquear novas instalações usando esse token.",
    });
  }

  const pendingToken = tokens.find((token) => token.id === pendingRevokeId);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Tokens
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Gerencie tokens do registry privado.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              Tokens liberam instalação de pacotes Pro. O valor raw aparece
              apenas uma vez; depois disso, apenas o hash deve permanecer
              armazenado no backend.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3">
            <p className="text-sm font-semibold text-emerald-100">
              {activeTokens.length} token(s) ativo(s)
            </p>
          </div>
        </section>

        {feedback ? (
          <div
            role={feedback.type === "error" ? "alert" : "status"}
            aria-live="polite"
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

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Criar token</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Dê um nome operacional para identificar onde o token será usado:
              local, CI, preview, produção.
            </p>

            <div className="mt-6">
              <label
                htmlFor="token-name"
                className="text-sm font-medium text-slate-200"
              >
                Nome do token
              </label>
              <input
                id="token-name"
                value={tokenName}
                onChange={(event) => setTokenName(event.target.value)}
                placeholder="Ex: Produção Vercel"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30"
              />
            </div>

            <button
              type="button"
              onClick={handleCreateToken}
              className="mt-5 w-full rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
            >
              Gerar token
            </button>

            {newRawToken ? (
              <div className="mt-6 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
                <h3 className="font-semibold text-amber-100">
                  Copie agora. Este token não será exibido novamente.
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Armazene em um gerenciador de segredos ou variável de
                  ambiente. Depois de fechar este aviso, apenas o hash deve
                  existir no backend.
                </p>

                <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm text-cyan-100">
                  <code>{newRawToken}</code>
                </pre>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleCopyToken}
                    className="rounded-xl bg-amber-200 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-100 active:scale-[0.98]"
                  >
                    Copiar token
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewRawToken(null)}
                    className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
                  >
                    Já salvei com segurança
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-4">
              <h3 className="font-medium">Regra de segurança</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                A geração real deve acontecer no backend. A UI nunca deve
                armazenar token raw depois da criação.
              </p>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold">Boas práticas</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
              <li>
                • Use tokens separados por ambiente: local, CI, preview e
                produção.
              </li>
              <li>• Revogue tokens sem uso ou expostos acidentalmente.</li>
              <li>• Nunca faça commit do token raw no repositório.</li>
              <li>• Use variáveis de ambiente para produção.</li>
              <li>
                • Revogação deve bloquear acesso no registry imediatamente.
              </li>
              <li>
                • Expiração, cancelamento, unpaid ou past_due devem remover
                entitlement Pro.
              </li>
            </ul>
          </article>
        </section>

        {pendingToken ? (
          <section
            role="alert"
            className="mt-8 rounded-3xl border border-red-300/20 bg-red-300/10 p-6"
          >
            <h2 className="text-xl font-semibold text-red-100">
              Revogar token “{pendingToken.name}”?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Esta ação é destrutiva. Novas instalações usando este token devem
              ser bloqueadas pelo registry. Ambientes que dependem dele podem
              falhar com 401 ou 403.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRevokeToken}
                className="rounded-xl bg-red-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-200 active:scale-[0.98]"
              >
                Confirmar revogação
              </button>
              <button
                type="button"
                onClick={() => setPendingRevokeId(null)}
                className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
              >
                Cancelar
              </button>
            </div>
          </section>
        ) : null}

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-2xl font-semibold">Tokens existentes</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Por segurança, mostramos apenas prefixo, status, criação e último
              uso.
            </p>
          </div>

          {tokens.length === 0 ? (
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold">Nenhum token criado</h3>
              <p className="mt-2 text-sm text-slate-400">
                Crie seu primeiro token para instalar pacotes Pro pelo registry
                privado.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-900 text-slate-300">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Nome</th>
                    <th className="px-6 py-4 font-semibold">Prefixo</th>
                    <th className="px-6 py-4 font-semibold">Criado em</th>
                    <th className="px-6 py-4 font-semibold">Último uso</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {tokens.map((token) => (
                    <tr key={token.id} className="hover:bg-white/[0.03]">
                      <td className="px-6 py-4 font-medium text-white">
                        {token.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-cyan-100">
                        {token.prefix}...
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {token.createdAt}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {token.lastUsedAt ?? "Nunca usado"}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={token.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {token.status === "active" ? (
                          <button
                            type="button"
                            onClick={() => setPendingRevokeId(token.id)}
                            className="rounded-xl border border-red-300/30 bg-red-300/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-300/15 focus:outline-none focus:ring-2 focus:ring-red-200 active:scale-[0.98]"
                          >
                            Revogar
                          </button>
                        ) : (
                          <span className="text-sm text-slate-500">
                            Sem ação
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
