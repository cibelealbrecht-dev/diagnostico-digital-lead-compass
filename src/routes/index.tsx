import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardList, Compass, Lightbulb, Target, TrendingUp, Clock, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader, WhatsAppButton } from "@/components/site";
import { SLOGAN } from "@/lib/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diagnóstico Digital CA — Diagnóstico gratuito da sua presença digital" },
      { name: "description", content: "Descubra problemas e oportunidades na presença digital do seu pequeno negócio com um diagnóstico gratuito." },
      { property: "og:title", content: "Diagnóstico Digital CA" },
      { property: "og:description", content: "Diagnóstico gratuito da presença digital para pequenos negócios e empreendedores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const passos = [
  { icon: ClipboardList, titulo: "Informe sobre seu negócio", texto: "Responda a um formulário rápido sobre seu negócio e sua rotina digital." },
  { icon: Compass, titulo: "Receba seu diagnóstico", texto: "Veja na hora os principais pontos de atenção da sua presença digital." },
  { icon: Lightbulb, titulo: "Descubra oportunidades", texto: "Conheça três recomendações práticas e prioritárias para evoluir." },
];
const beneficios = [
  { icon: Target, titulo: "Clareza", texto: "Entenda o que está travando seus resultados no digital." },
  { icon: TrendingUp, titulo: "Direcionamento", texto: "Saiba por onde começar, com ações alinhadas ao seu objetivo." },
  { icon: Clock, titulo: "Rapidez", texto: "Em poucos minutos você recebe seu diagnóstico completo." },
  { icon: ShieldCheck, titulo: "Gratuito", texto: "Sem custo e sem compromisso para o seu negócio." },
];

function Index() {
  return (
    <div className="min-h-screen font-sans">
      <SiteHeader />
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-xs font-medium tracking-wide text-gold">{SLOGAN}</p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
            Sua presença digital tem potencial. <span className="text-gold">Descubra como aproveitá-lo.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
            O Diagnóstico Digital CA ajuda pequenos negócios e empreendedores a identificar dificuldades e oportunidades no ambiente digital, com recomendações práticas para atrair mais clientes.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/diagnostico" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 font-semibold text-gold-foreground shadow-soft transition hover:brightness-105">
              Fazer meu diagnóstico gratuito <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton message="Olá! Vim pelo site do Diagnóstico Digital CA e gostaria de mais informações." className="py-3.5">
              Falar no WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">Como funciona</h2>
        <div className="mt-3 h-0.5 w-14 bg-gold" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {passos.map((p, i) => (
            <div key={p.titulo} className="rounded-xl border bg-card p-7 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-secondary"><p.icon className="h-5 w-5" /></span>
                <span className="font-display text-3xl text-gold">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-primary">{p.titulo}</h3>
              <p className="mt-2 text-muted-foreground">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">Benefícios</h2>
          <div className="mt-3 h-0.5 w-14 bg-gold" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((b) => (
              <div key={b.titulo} className="rounded-xl bg-card p-6">
                <b.icon className="h-6 w-6 text-secondary" />
                <h3 className="mt-4 font-semibold text-primary">{b.titulo}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">Pronto para ter mais clareza?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Leva poucos minutos e você recebe seu diagnóstico na hora.</p>
        <Link to="/diagnostico" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:bg-primary/90">
          Fazer meu diagnóstico gratuito <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
