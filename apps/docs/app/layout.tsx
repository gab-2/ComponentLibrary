import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs — Sua Marca UI",
  description:
    "Documentação da biblioteca de componentes UI multi-framework com pacotes públicos e Pro privados.",
};

const navigation = [
  {
    label: "Docs Home",
    href: "/",
  },
  {
    label: "Público",
    href: "/docs/public",
  },
  {
    label: "React",
    href: "/docs/react",
  },
  {
    label: "Vue",
    href: "/docs/vue",
  },
  {
    label: "Angular",
    href: "/docs/angular",
  },
  {
    label: "Svelte",
    href: "/docs/svelte",
  },
  {
    label: "Web Components",
    href: "/docs/web-components",
  },
  {
    label: "Pro React",
    href: "/docs/pro/react",
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
                aria-label="Ir para a página inicial da documentação"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-sm font-bold text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
                  UI
                </span>

                <span className="flex flex-col leading-none">
                  <span className="text-sm font-semibold tracking-tight text-white">
                    Sua Marca UI Docs
                  </span>
                  <span className="mt-1 hidden text-xs text-slate-400 sm:inline">
                    Público + Pro privado
                  </span>
                </span>
              </Link>

              <div className="hidden items-center gap-1 xl:flex">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <Link
                  href="/docs/public"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
                >
                  Começar
                </Link>

                <Link
                  href="/docs/pro/react"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
                >
                  Docs Pro
                </Link>
              </div>

              <details className="group relative xl:hidden">
                <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                  <span className="sr-only">Abrir menu de documentação</span>

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
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <p className="mt-3 border-t border-white/10 px-1 pt-3 text-xs leading-5 text-slate-400">
                    A camada Pro depende de entitlement ativo e token de
                    registry privado. Código Pro não é enviado em pacotes
                    públicos.
                  </p>
                </div>
              </details>
            </nav>
          </header>

          <div className="border-b border-white/10 bg-white/[0.03]">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div>
                <p className="text-sm font-medium text-white">
                  Documentação técnica
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Tokens → styles → core/headless → adapters por framework.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  Multi-framework
                </span>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                  Pacotes públicos
                </span>
                <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                  Pro privado
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
