import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sua Marca UI — Componentes UI Multi-framework",
  description:
    "Biblioteca de componentes UI pública e privada para times que precisam construir produtos SaaS mais rápido.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-white antialiased">
        <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              aria-label="Ir para a página inicial"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-sm font-bold text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
                UI
              </span>

              <span className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-tight text-white">
                  Sua Marca UI
                </span>
                <span className="mt-1 hidden text-xs text-slate-400 sm:inline">
                  Free público + Pro privado
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              <Link
                href="/"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Início
              </Link>

              <Link
                href="/components"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Componentes
              </Link>

              <Link
                href="/components/free"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Free
              </Link>

              <Link
                href="/components/pro"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Pro
              </Link>

              <Link
                href="/pricing"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Planos
              </Link>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/components"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
              >
                Explorar
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
              >
                Ver planos
              </Link>
            </div>

            <details className="group relative md:hidden">
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <span className="sr-only">Abrir menu</span>

                <span className="relative h-4 w-5">
                  <span className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition group-open:translate-y-[7px] group-open:rotate-45" />
                  <span className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition group-open:opacity-0" />
                  <span className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition group-open:-translate-y-[7px] group-open:-rotate-45" />
                </span>
              </summary>

              <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-3rem))] rounded-3xl border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-black/40">
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    Início
                  </Link>

                  <Link
                    href="/components"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    Componentes
                  </Link>

                  <Link
                    href="/components/free"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    Free
                  </Link>

                  <Link
                    href="/components/pro"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    Pro
                  </Link>

                  <Link
                    href="/pricing"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    Planos
                  </Link>
                </div>

                <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
                  <Link
                    href="/components"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
                  >
                    Explorar componentes
                  </Link>

                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
                  >
                    Ver planos
                  </Link>
                </div>

                <p className="mt-3 px-1 text-xs leading-5 text-slate-400">
                  Pacotes Free são públicos. Pacotes Pro são entregues via
                  registry privado com acesso por token.
                </p>
              </div>
            </details>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}