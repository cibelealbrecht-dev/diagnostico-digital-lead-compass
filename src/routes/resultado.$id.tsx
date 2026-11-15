import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, WhatsAppButton } from "@/components/site";
import { DiagnosticoView } from "@/components/diagnostico-view";
import { getResultado } from "@/lib/leads.functions";

export const Route = createFileRoute("/resultado/$id")({
  loader: async ({ params }) => {
    const r = await getResultado({ data: { id: params.id } }).catch(() => null);
    if (!r) throw notFound();
    return r;
  },
  head: () => ({
    meta: [
      { title: "Seu resultado — Diagnóstico Digital CA" },
      { name: "description", content: "Resultado do diagnóstico da presença digital do seu negócio." },
      { property: "og:title", content: "Resultado do diagnóstico — Diagnóstico Digital CA" },
      { property: "og:description", content: "Pontos de atenção, oportunidades e recomendações para o seu negócio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div><h1 className="font-display text-2xl text-primary">Diagnóstico não encontrado</h1>
      <Link to="/diagnostico" className="mt-4 inline-block text-secondary underline">Fazer um novo diagnóstico</Link></div>
    </div>
  ),
  component: Resultado,
});

function Resultado() {
  const r = Route.useLoaderData();
  const resumo: [string, string][] = [
    ["Responsável", r.responsavel], ["Negócio", r.negocio], ["Segmento", r.segmento],
    ["Localização", `${r.cidade} / ${r.estado}`], ["Instagram ou site", r.instagram_site || "Não informado"],
    ["Redes sociais", r.redes.join(", ")], ["Frequência de publicação", r.frequencia],
    ["Dificuldades", r.dificuldades.join(", ")], ["Objetivo", r.objetivo],
  ];
  const msg = `Olá! Sou ${r.responsavel}, do negócio ${r.negocio} (${r.segmento}, ${r.cidade}/${r.estado}). Fiz o Diagnóstico Digital CA e gostaria de solicitar um atendimento para trabalhar meu objetivo de "${r.objetivo.toLowerCase()}".`;
  return (
    <div className="min-h-screen bg-muted font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-12">
        <p className="text-sm font-medium text-secondary">Diagnóstico concluído</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-primary sm:text-4xl">{r.negocio}, aqui está seu diagnóstico</h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <aside className="h-fit rounded-xl border bg-card p-6 shadow-soft">
            <h2 className="font-semibold text-primary">Resumo das informações</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {resumo.map(([k, v]) => <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-foreground">{v}</dd></div>)}
            </dl>
          </aside>
          <DiagnosticoView d={r.diagnostico} />
        </div>
        <div className="mt-10 rounded-xl border border-gold/40 bg-card p-6 text-center shadow-soft sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">Quer ajuda para colocar isso em prática?</h2>
          <p className="mt-2 text-muted-foreground">Fale conosco e receba um atendimento personalizado.</p>
          <WhatsAppButton message={msg} className="mt-6 px-6 py-3.5">Solicitar atendimento pelo WhatsApp</WhatsAppButton>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
