"use client";

import { useState } from "react";
import Link from "next/link";
import type { SimpleIcon } from "simple-icons";
import {
  siAstro,
  siNextdotjs,
  siNuxt,
  siReact,
  siSvelte,
  siVuedotjs,
} from "simple-icons";

type FrameworkName = "React" | "Next.js" | "Vue" | "Nuxt" | "Svelte" | "Astro";

type HeroFramework = {
  name: FrameworkName;
  icon: SimpleIcon;
};

const heroFrameworks: HeroFramework[] = [
  {
    name: "React",
    icon: siReact,
  },
  {
    name: "Next.js",
    icon: siNextdotjs,
  },
  {
    name: "Vue",
    icon: siVuedotjs,
  },
  {
    name: "Nuxt",
    icon: siNuxt,
  },
  {
    name: "Svelte",
    icon: siSvelte,
  },
  {
    name: "Astro",
    icon: siAstro,
  },
];

const frameworkTabs = [
  {
    name: "React",
    description:
      "Use componentes prontos para criar interfaces modernas em aplicações React, mantendo consistência visual entre telas, fluxos e produtos.",
    installCommand: "npm install @acme-ui/react",
    usageTitle: "Uso básico com React",
    code: [
      'import { Button, Card } from "@acme-ui/react";',
      "",
      "export function Example() {",
      "  return (",
      "    <Card>",
      "      <Button>Começar agora</Button>",
      "    </Card>",
      "  );",
      "}",
    ],
  },
  {
    name: "Next.js",
    description:
      "Construa dashboards, páginas de autenticação, billing e áreas internas em Next.js usando componentes preparados para produtos SaaS.",
    installCommand: "npm install @acme-ui/react",
    usageTitle: "Uso básico com Next.js",
    code: [
      'import { Button, Card } from "@acme-ui/react";',
      "",
      "export default function Page() {",
      "  return (",
      "    <Card>",
      "      <Button>Explorar componentes</Button>",
      "    </Card>",
      "  );",
      "}",
    ],
  },
  {
    name: "Vue",
    description:
      "Leve a mesma experiência visual para aplicações Vue com componentes pensados para produtividade, consistência e interfaces de produto.",
    installCommand: "npm install @acme-ui/vue",
    usageTitle: "Uso básico com Vue",
    code: [
      '<script setup lang="ts">',
      'import { Button, Card } from "@acme-ui/vue";',
      "</script>",
      "",
      "<template>",
      "  <Card>",
      "    <Button>Começar agora</Button>",
      "  </Card>",
      "</template>",
    ],
  },
  {
    name: "Nuxt",
    description:
      "Use componentes UI em projetos Nuxt para acelerar páginas, áreas logadas, fluxos de produto e experiências SaaS completas.",
    installCommand: "npm install @acme-ui/vue",
    usageTitle: "Uso básico com Nuxt",
    code: [
      '<script setup lang="ts">',
      'import { Button, Card } from "@acme-ui/vue";',
      "</script>",
      "",
      "<template>",
      "  <Card>",
      "    <Button>Ver planos</Button>",
      "  </Card>",
      "</template>",
    ],
  },
  {
    name: "Svelte",
    description:
      "Crie interfaces rápidas em Svelte usando componentes reutilizáveis para formulários, dashboards, navegação e estados de produto.",
    installCommand: "npm install @acme-ui/svelte",
    usageTitle: "Uso básico com Svelte",
    code: [
      '<script lang="ts">',
      '  import { Button, Card } from "@acme-ui/svelte";',
      "</script>",
      "",
      "<Card>",
      "  <Button>Começar agora</Button>",
      "</Card>",
    ],
  },
  {
    name: "Astro",
    description:
      "Combine performance, conteúdo e componentes UI em Astro para criar páginas de marketing, documentação e experiências híbridas.",
    installCommand: "npm install @acme-ui/astro",
    usageTitle: "Uso básico com Astro",
    code: [
      "---",
      'import { Button, Card } from "@acme-ui/astro";',
      "---",
      "",
      "<Card>",
      "  <Button>Explorar biblioteca</Button>",
      "</Card>",
    ],
  },
];

const componentPreviews = [
  {
    title: "Formulário de autenticação",
    description:
      "Fluxos de login, cadastro e recuperação de senha prontos para produtos SaaS.",
    variant: "auth",
  },
  {
    title: "Tabela avançada",
    description:
      "Tabelas com filtros, estados vazios, ações rápidas e estrutura preparada para dados reais.",
    variant: "table",
  },
  {
    title: "Card de cobrança",
    description:
      "Blocos para planos, upgrades, trials e páginas de billing com aparência premium.",
    variant: "billing",
  },
  {
    title: "Menu de comandos",
    description:
      "Navegação rápida, busca de ações e atalhos para interfaces modernas e produtivas.",
    variant: "command",
  },
  {
    title: "Painel de configurações",
    description:
      "Seções organizadas para preferências, conta, equipe, segurança e integrações.",
    variant: "settings",
  },
  {
    title: "Estado vazio",
    description:
      "Componentes para guiar usuários quando ainda não existem dados, tarefas ou registros.",
    variant: "empty",
  },
];

const benefits = [
  {
    title: "Desenvolva interfaces mais rápido",
    description:
      "Use componentes prontos para dashboards, formulários, tabelas, autenticação, billing e fluxos comuns de produtos digitais.",
  },
  {
    title: "Comece grátis e evolua para o Pro",
    description:
      "Instale componentes essenciais gratuitamente e desbloqueie componentes avançados quando seu produto precisar escalar.",
  },
  {
    title: "Consistência visual entre projetos",
    description:
      "Use primitives, tokens e padrões de interação compartilhados para manter uma experiência visual coesa.",
  },
  {
    title: "Componentes Pro protegidos",
    description:
      "O código premium é entregue por um registry privado com acesso autenticado, separado dos pacotes públicos.",
  },
  {
    title: "Multi-framework de verdade",
    description:
      "Use uma experiência visual consistente em React, Vue, Svelte, Astro e outras stacks modernas.",
  },
  {
    title: "Feito para produtos reais",
    description:
      "Componentes responsivos, acessíveis e pensados para interfaces SaaS em produção, não apenas exemplos visuais.",
  },
];

const freeFeatures = [
  "Componentes essenciais",
  "Pacotes públicos",
  "Instalação simples",
  "Exemplos básicos",
  "Uso ideal para MVPs e projetos iniciais",
];

const proFeatures = [
  "Componentes avançados",
  "Registry privado",
  "Acesso autenticado por token",
  "Padrões premium de SaaS",
  "Ideal para produtos comerciais e times",
];

const useCases = [
  "Dashboards SaaS",
  "Áreas administrativas",
  "Fluxos de autenticação",
  "Páginas de billing",
  "Tabelas de dados",
  "Painéis de configuração",
  "MVPs rápidos",
  "Design systems internos",
];

const steps = [
  {
    eyebrow: "01",
    title: "Instale o pacote Free",
    description:
      "Comece com componentes essenciais disponíveis em pacotes públicos para acelerar suas primeiras telas.",
  },
  {
    eyebrow: "02",
    title: "Escolha sua stack",
    description:
      "Use componentes e padrões visuais consistentes em React, Vue, Svelte, Astro e outros frameworks modernos.",
  },
  {
    eyebrow: "03",
    title: "Desbloqueie o Pro",
    description:
      "Quando precisar de componentes avançados, acesse os pacotes premium por um registry privado com token.",
  },
];

const faqs = [
  {
    question: "O que é essa biblioteca?",
    answer:
      "É uma biblioteca de componentes UI pronta para acelerar a criação de interfaces modernas em múltiplos frameworks.",
  },
  {
    question: "Posso começar de graça?",
    answer:
      "Sim. O plano Free oferece componentes essenciais em pacotes públicos para você começar rapidamente.",
  },
  {
    question: "O que muda no Pro?",
    answer:
      "O Pro desbloqueia componentes avançados, padrões premium e acesso aos pacotes privados por registry autenticado.",
  },
  {
    question: "Quais frameworks são suportados?",
    answer:
      "A biblioteca foi pensada para múltiplos frameworks, incluindo React, Next.js, Vue, Nuxt, Svelte e Astro.",
  },
  {
    question: "Componentes Pro são enviados dentro dos pacotes públicos?",
    answer:
      "Não. Pacotes públicos e privados ficam fisicamente separados. O código Pro é distribuído apenas pelo registry privado.",
  },
  {
    question: "Existe validação de licença dentro dos componentes instalados?",
    answer:
      "Não. O acesso é controlado na distribuição dos pacotes, não por bloqueios em runtime no frontend.",
  },
];

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7 shrink-0 fill-current"
    >
      <path d={icon.path} />
    </svg>
  );
}

export default function HomePage() {
  const [selectedFramework, setSelectedFramework] = useState(frameworkTabs[0]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.24),transparent_34%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.2),transparent_32%),linear-gradient(to_bottom,rgba(15,23,42,0),rgba(15,23,42,1))]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-20 text-center sm:py-24 lg:px-8 lg:py-28">
          <div className="flex max-w-5xl flex-col items-center justify-center">
            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-6xl">
              Componentes UI para lançar produtos em minutos, em qualquer
              framework.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-6 text-gray-400">
              Uma biblioteca de componentes UI pronta para uso, feita para
              qualquer framework. Você não precisa mais começar do zero, saia na
              frente com a 'empresa'!
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/components"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
              >
                Explorar componentes
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]"
              >
                Ver planos
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-14 lg:px-8 lg:pb-16">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Compatível com as principais stacks frontend
            </p>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-7 sm:gap-x-16 lg:justify-between">
              {heroFrameworks.map((framework) => (
                <div
                  key={framework.name}
                  className="flex items-center gap-3 text-white/85 transition hover:text-white"
                >
                  <BrandIcon icon={framework.icon} />
                  <span className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {framework.name}
                  </span>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Preview dos componentes
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Padrões de interface prontos para produtos reais.
            </h2>
            <p className="mt-4 text-slate-300">
              Componentes pensados para telas que aparecem em praticamente todo
              SaaS: autenticação, dashboards, billing, dados, configurações e
              estados de produto.
            </p>
          </div>

          <Link
            href="/components"
            className="inline-flex w-fit items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Ver catálogo completo
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {componentPreviews.map((preview) => (
            <article
              key={preview.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                {preview.variant === "auth" && (
                  <div className="space-y-3">
                    <div className="mx-auto h-10 w-10 rounded-2xl bg-cyan-300/20" />
                    <div className="mx-auto h-3 w-28 rounded-full bg-white/20" />
                    <div className="h-10 rounded-xl bg-white/10" />
                    <div className="h-10 rounded-xl bg-white/10" />
                    <div className="h-10 rounded-xl bg-cyan-300" />
                  </div>
                )}

                {preview.variant === "table" && (
                  <div className="space-y-3">
                    <div className="flex justify-between gap-3">
                      <div className="h-9 flex-1 rounded-xl bg-white/10" />
                      <div className="h-9 w-20 rounded-xl bg-cyan-300/20" />
                    </div>
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="grid grid-cols-[1fr_0.7fr_0.4fr] gap-3 rounded-xl bg-slate-950 p-3"
                      >
                        <div className="h-3 rounded-full bg-white/20" />
                        <div className="h-3 rounded-full bg-white/10" />
                        <div className="h-5 rounded-full bg-emerald-400/20" />
                      </div>
                    ))}
                  </div>
                )}

                {preview.variant === "billing" && (
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                    <div className="h-3 w-20 rounded-full bg-cyan-200/40" />
                    <div className="mt-4 h-8 w-24 rounded-xl bg-white/20" />
                    <div className="mt-4 space-y-2">
                      <div className="h-3 rounded-full bg-white/20" />
                      <div className="h-3 rounded-full bg-white/15" />
                      <div className="h-3 rounded-full bg-white/10" />
                    </div>
                    <div className="mt-5 h-10 rounded-xl bg-cyan-300" />
                  </div>
                )}

                {preview.variant === "command" && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-white/10 bg-slate-950 px-3 py-3">
                      <div className="h-3 w-40 rounded-full bg-white/20" />
                    </div>
                    {[
                      "Criar projeto",
                      "Abrir dashboard",
                      "Convidar membro",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3"
                      >
                        <div className="h-8 w-8 rounded-lg bg-violet-300/20" />
                        <div className="h-3 flex-1 rounded-full bg-white/15" />
                      </div>
                    ))}
                  </div>
                )}

                {preview.variant === "settings" && (
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-xl bg-slate-950 p-3"
                      >
                        <div>
                          <div className="h-3 w-28 rounded-full bg-white/20" />
                          <div className="mt-2 h-2 w-36 rounded-full bg-white/10" />
                        </div>
                        <div className="h-6 w-11 rounded-full bg-cyan-300/30 p-1">
                          <div className="h-4 w-4 rounded-full bg-cyan-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {preview.variant === "empty" && (
                  <div className="flex min-h-[190px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-950 p-6 text-center">
                    <div className="h-12 w-12 rounded-2xl bg-violet-300/20" />
                    <div className="mt-5 h-4 w-36 rounded-full bg-white/20" />
                    <div className="mt-3 h-3 w-48 rounded-full bg-white/10" />
                    <div className="mt-5 h-9 w-28 rounded-xl bg-cyan-300/20" />
                  </div>
                )}
              </div>

              <h3 className="mt-5 font-semibold text-white">{preview.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {preview.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Valor do produto
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Menos componentes refeitos do zero. Mais produto entregue.
            </h2>
            <p className="mt-4 text-slate-300">
              Use uma base visual pronta para acelerar desenvolvimento, manter
              consistência e evoluir sua interface conforme o produto cresce.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-white/10 bg-slate-950 p-6 transition hover:-translate-y-1 hover:bg-white/[0.04]"
              >
                <h3 className="text-lg font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Free + Pro
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Comece com o Free. Escale com componentes Pro.
          </h2>
          <p className="mt-4 text-slate-300">
            O plano Free oferece os fundamentos para começar. O Pro desbloqueia
            componentes avançados, padrões premium e distribuição privada.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Plano
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white">Free</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-300">
                Público
              </span>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-300">
              Ideal para começar rápido com componentes essenciais e validar a
              experiência visual do seu produto.
            </p>

            <div className="mt-6 space-y-3">
              {freeFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex gap-3 text-sm text-slate-300"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/components"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explorar Free
            </Link>
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6 shadow-2xl shadow-cyan-950/20">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  Plano
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white">Pro</h3>
              </div>
              <span className="rounded-full border border-cyan-300/20 bg-slate-950 px-4 py-2 text-sm font-medium text-cyan-100">
                Privado
              </span>
            </div>

            <p className="relative mt-5 text-sm leading-6 text-slate-200">
              Para produtos que precisam de componentes avançados, padrões de UI
              mais completos e acesso premium por registry autenticado.
            </p>

            <div className="relative mt-6 space-y-3">
              {proFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex gap-3 text-sm text-slate-200"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-200" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/pricing"
              className="relative mt-8 inline-flex w-full items-center justify-center rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Ver planos Pro
            </Link>
          </article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Casos de uso
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Feito para interfaces que todo produto SaaS precisa.
            </h2>
            <p className="mt-4 text-slate-300">
              Em vez de começar cada tela do zero, use blocos prontos para
              montar fluxos comuns com mais velocidade e consistência.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {useCases.map((useCase) => (
              <div
                key={useCase}
                className="rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-sm font-medium text-slate-200"
              >
                {useCase}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Como funciona
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Da instalação ao Pro sem complicar seu fluxo.
          </h2>
          <p className="mt-4 text-slate-300">
            Comece com pacotes públicos, escolha a stack do seu projeto e
            desbloqueie componentes premium quando precisar.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="text-sm font-semibold text-cyan-300">
                {step.eyebrow}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Multi-framework
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Uma biblioteca UI. Várias stacks frontend.
            </h2>
            <p className="mt-4 text-slate-300">
              Escolha o framework do seu projeto e use componentes com a mesma
              experiência visual, mantendo consistência entre produtos, times e
              aplicações.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-cyan-950/10">
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
              {frameworkTabs.map((framework) => {
                const isSelected = selectedFramework.name === framework.name;

                return (
                  <button
                    key={framework.name}
                    type="button"
                    onClick={() => setSelectedFramework(framework)}
                    className={
                      isSelected
                        ? "rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition"
                        : "rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                    }
                  >
                    {framework.name}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-6 p-2 pt-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-6">
              <div className="flex flex-col justify-center">
                <div className="mb-5 inline-flex w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
                  {selectedFramework.name}
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Componentes prontos para {selectedFramework.name}.
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  {selectedFramework.description}
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Instalação
                  </p>
                  <p className="mt-3 font-mono text-sm text-cyan-200">
                    {selectedFramework.installCommand}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-400">
                    {selectedFramework.usageTitle}
                  </span>
                </div>

                <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-200">
                  <code>
                    {selectedFramework.code.map((line, index) => (
                      <span key={`${line}-${index}`} className="block">
                        {line || " "}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 text-center shadow-2xl shadow-cyan-950/20 sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Comece grátis e desbloqueie componentes Pro quando seu produto
            crescer.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Use os componentes Free hoje. Quando precisar de padrões avançados
            para SaaS, billing, dashboards e fluxos complexos, faça upgrade para
            o Pro.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/components"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 active:scale-[0.98]"
            >
              Começar grátis
            </Link>
            <Link
              href="/components/pro"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
            >
              Ver preview Pro
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Perguntas frequentes
          </h2>
        </div>

        <div className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04]">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-6">
              <h3 className="font-semibold text-white">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
