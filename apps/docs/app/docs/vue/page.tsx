const installCode = `npm install @sua-marca-ui/vue
npm install @sua-marca-ui/styles`;

const stylesCode = `// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import "@sua-marca-ui/styles/base.css";

createApp(App).mount("#app");`;

const usageCode = `<script setup lang="ts">
import { UiButton, UiCard, UiInput } from "@sua-marca-ui/vue";
</script>

<template>
  <UiCard>
    <h2>Criar conta</h2>
    <UiInput label="E-mail" type="email" placeholder="voce@empresa.com" />
    <UiButton>Criar conta</UiButton>
  </UiCard>
</template>`;

const compositionCode = `<script setup lang="ts">
import { ref } from "vue";
import { UiButton } from "@sua-marca-ui/vue";

const isSaving = ref(false);
</script>

<template>
  <UiButton :disabled="isSaving" :aria-busy="isSaving">
    {{ isSaving ? "Salvando..." : "Salvar alterações" }}
  </UiButton>
</template>`;

const toc = [
  ["Setup", "#setup"],
  ["Instalação", "#instalacao"],
  ["Uso básico", "#uso-basico"],
  ["Composição", "#composicao"],
  ["Troubleshooting", "#troubleshooting"],
  ["FAQ", "#faq"],
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

export default function VueDocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_18rem]">
        <article>
          <section id="setup" className="scroll-mt-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Vue
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              Guia público para Vue.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-300">
              Use o adapter Vue com Single File Components, Composition API e
              styles compartilhados por tokens.
            </p>
          </section>

          <section id="instalacao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Instalação</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Instale o adapter Vue e importe os styles públicos na entrada do
              app.
            </p>
            <div className="mt-6 grid gap-4">
              <CodeBlock title="Instalar pacotes" code={installCode} />
              <CodeBlock title="Importar styles" code={stylesCode} />
            </div>
          </section>

          <section id="uso-basico" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Uso básico</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Use componentes com prefixo claro para evitar conflito com
              componentes internos do app.
            </p>
            <div className="mt-6">
              <CodeBlock title="Componente Vue" code={usageCode} />
            </div>
          </section>

          <section id="composicao" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Estilização e composição</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Mantenha estado local com Composition API e deixe tokens/styles
              controlarem consistência visual.
            </p>
            <div className="mt-6">
              <CodeBlock title="Composição Vue" code={compositionCode} />
            </div>

            <aside className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <h3 className="font-semibold text-cyan-100">Boa prática Vue</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Prefira props, slots e eventos para adaptar componentes sem
                duplicar estilos.
              </p>
            </aside>
          </section>

          <section id="troubleshooting" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">Troubleshooting Vue</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                [
                  "Componente não registrado",
                  "Confirme se está importando o componente correto do adapter Vue.",
                ],
                [
                  "Styles não carregam",
                  "Importe @sua-marca-ui/styles/base.css no main.ts.",
                ],
                [
                  "Conflito de nomes",
                  "Use prefixos como UiButton para diferenciar componentes da biblioteca.",
                ],
                [
                  "Pro indisponível",
                  "Pacotes Pro exigem registry privado e não existem no pacote público Vue.",
                ],
              ].map(([title, description]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="faq" className="mt-12 scroll-mt-28">
            <h2 className="text-3xl font-semibold">FAQ</h2>
            <div className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04]">
              {[
                [
                  "Funciona com Nuxt?",
                  "Sim. Importe os styles no ponto global do Nuxt e use o adapter Vue normalmente.",
                ],
                [
                  "Preciso registrar plugin global?",
                  "Não necessariamente. A recomendação inicial é importar componentes sob demanda.",
                ],
              ].map(([question, answer]) => (
                <div key={question} className="p-6">
                  <h3 className="font-semibold">{question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-32 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-semibold">Nesta página</p>
            <nav className="mt-4 space-y-2 text-sm">
              {toc.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}
