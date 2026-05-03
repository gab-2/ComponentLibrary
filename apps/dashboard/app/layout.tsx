import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard — Sua Marca UI",
  description:
    "Gerencie plano, billing, tokens de registry e instalação dos pacotes privados Pro.",
};

const navigation = [
  {
    label: "Home",
    href: "/",
    description: "Hub principal",
  },
  {
    label: "Overview",
    href: "/dashboard/overview",
    description: "Estado da conta",
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    description: "Cobrança e plano",
  },
  {
    label: "Instalação",
    href: "/dashboard/install-instructions",
    description: "Registry privado",
  },
  {
    label: "Tokens",
    href: "/dashboard/tokens",
    description: "Acesso ao registry",
  },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-white antialiased">
        <div className="min-h-screen bg-slate-950 text-white">
          <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Ir para a home do dashboard"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-sm font-bold text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
                  UI
                </span>

                <span className="flex flex-col leading-none">
                  <span className="text-sm font-semibold tracking-tight text-white">
                    Sua Marca UI
                  </span>
                  <span className="mt-1 hidden text-xs text-slate-400 sm:inline">
                    Dashboard Pro Registry
                  </span>
                </span>
              </Link>

              <div className="hidden items-center gap-1 lg:flex">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <Link
                  href="/dashboard/install-instructions"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
                >
                  Ver instalação
                </Link>

                <Link
                  href="/dashboard/tokens"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
                >
                  Gerenciar tokens
                </Link>
              </div>

              <details className="group relative lg:hidden">
                <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                  <span className="sr-only">Abrir menu do dashboard</span>

                  <span className="relative h-4 w-5">
                    <span className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition group-open:translate-y-[7px] group-open:rotate-45" />
                    <span className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition group-open:opacity-0" />
                    <span className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition group-open:-translate-y-[7px] group-open:-rotate-45" />
                  </span>
                </summary>

                <div className="absolute right-0 mt-3 w-[min(22rem,calc(100vw-3rem))] rounded-3xl border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-black/40">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                      >
                        <span className="block text-sm font-semibold">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
                    <Link
                      href="/dashboard/install-instructions"
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
                    >
                      Ver instalação
                    </Link>

                    <Link
                      href="/dashboard/tokens"
                      className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
                    >
                      Gerenciar tokens
                    </Link>
                  </div>

                  <p className="mt-3 px-1 text-xs leading-5 text-slate-400">
                    O acesso Pro é controlado por backend, registry e
                    entitlements. Tokens revogados devem bloquear novas
                    instalações.
                  </p>
                </div>
              </details>
            </nav>
          </header>

          <div className="border-b border-white/10 bg-white/[0.03]">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div>
                <p className="text-sm font-medium text-white">
                  Ambiente do dashboard
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Gerencie plano, billing, tokens e instalação dos pacotes
                  privados Pro.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                  Entitlement no backend
                </span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  Registry privado
                </span>
                <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                  Tokens seguros
                </span>
              </div>
            </div>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
