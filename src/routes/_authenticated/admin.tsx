import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { ArrowLeft, Loader2, LogOut, Search, Users } from "lucide-react";
import { Logo, WhatsAppAnchor } from "@/components/site";
import { DiagnosticoView } from "@/components/diagnostico-view";
import { whatsappLink } from "@/lib/constants";
import { listLeads } from "@/lib/leads.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel de leads — Diagnóstico Digital CA" },
      { name: "description", content: "Painel administrativo com os leads e diagnósticos recebidos." },
      { property: "og:title", content: "Painel de leads — Diagnóstico Digital CA" },
      { property: "og:description", content: "Área restrita para administradores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const fmt = (d: string) => new Date(d).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

function AdminPage() {
  const fetchLeads = useServerFn(listLeads);
  const { data, isLoading, error } = useQuery({ queryKey: ["leads"], queryFn: () => fetchLeads() });
  const [q, setQ] = useState("");
  const [selId, setSelId] = useState<string | null>(null);
  const qc = useQueryClient();
  const navigate = useNavigate();

  const leads = data?.leads ?? [];
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return leads;
    return leads.filter((l) => [l.responsavel, l.negocio, l.cidade, l.segmento].some((x) => x.toLowerCase().includes(t)));
  }, [leads, q]);
  const sel = leads.find((l) => l.id === selId);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-muted font-sans">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          <button onClick={signOut} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><LogOut className="h-4 w-4" /> Sair</button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">
        {isLoading ? (
          <div className="grid place-items-center py-20"><Loader2 className="h-6 w-6 animate-spin text-secondary" /></div>
        ) : error ? (
          <p className="text-destructive">Não foi possível carregar os leads.</p>
        ) : !data?.isAdmin ? (
          <div className="rounded-xl border bg-card p-8 text-center"><h1 className="font-display text-2xl text-primary">Acesso restrito</h1><p className="mt-2 text-muted-foreground">Sua conta não tem permissão de administrador.</p></div>
        ) : sel ? (
          <div>
            <button onClick={() => setSelId(null)} className="mb-6 inline-flex items-center gap-2 text-sm text-secondary hover:underline"><ArrowLeft className="h-4 w-4" /> Voltar para a lista</button>
            <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
              <aside className="h-fit rounded-xl border bg-card p-6 shadow-soft">
                <h1 className="font-display text-2xl font-semibold text-primary">{sel.negocio}</h1>
                <p className="text-sm text-muted-foreground">Recebido em {fmt(sel.created_at)}</p>
                <dl className="mt-5 space-y-3 text-sm">
                  {([
                    ["Responsável", sel.responsavel], ["WhatsApp", sel.whatsapp], ["Segmento", sel.segmento],
                    ["Localização", `${sel.cidade} / ${sel.estado}`], ["Instagram ou site", sel.instagram_site || "Não informado"],
                    ["Redes sociais", sel.redes.join(", ")], ["Frequência", sel.frequencia],
                    ["Dificuldades", sel.dificuldades.join(", ")], ["Objetivo", sel.objetivo],
                  ] as [string, string][]).map(([k, v]) => <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}
                </dl>
                <WhatsAppAnchor href={whatsappLink("", sel.whatsapp)} className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground">Chamar no WhatsApp</WhatsAppAnchor>
              </aside>
              <DiagnosticoView d={sel.diagnostico} />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-semibold text-primary">Leads cadastrados</h1>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Users className="h-4 w-4" /> {leads.length} no total</p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar nome, negócio, cidade" className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring" />
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border bg-card shadow-soft">
              {filtered.length === 0 ? (
                <p className="p-10 text-center text-muted-foreground">Nenhum lead encontrado.</p>
              ) : (
                <ul className="divide-y">
                  {filtered.map((l) => (
                    <li key={l.id}>
                      <button onClick={() => setSelId(l.id)} className="grid w-full gap-1 px-5 py-4 text-left transition hover:bg-accent sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center sm:gap-4">
                        <span><span className="block font-semibold text-primary">{l.negocio}</span><span className="text-sm text-muted-foreground">{l.responsavel}</span></span>
                        <span className="text-sm">{l.segmento}</span>
                        <span className="text-sm text-muted-foreground">{l.cidade}/{l.estado}</span>
                        <span className="text-xs text-muted-foreground">{fmt(l.created_at)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
