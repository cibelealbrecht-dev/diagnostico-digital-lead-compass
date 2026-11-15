import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site";
import { DIFICULDADES, ESTADOS, FREQUENCIAS, OBJETIVOS, REDES } from "@/lib/constants";
import { leadSchema } from "@/lib/diagnostico-schema";
import { submitLead } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Fazer diagnóstico gratuito — Diagnóstico Digital CA" },
      { name: "description", content: "Responda ao formulário e receba um diagnóstico da presença digital do seu negócio." },
      { property: "og:title", content: "Faça seu diagnóstico digital gratuito" },
      { property: "og:description", content: "Formulário rápido para identificar dificuldades e oportunidades no digital." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiagnosticoPage,
});

type Form = {
  responsavel: string; negocio: string; segmento: string; cidade: string; estado: string; whatsapp: string;
  instagram_site: string; redes: string[]; frequencia: string; dificuldades: string[]; objetivo: string;
};
const vazio: Form = { responsavel: "", negocio: "", segmento: "", cidade: "", estado: "", whatsapp: "", instagram_site: "", redes: [], frequencia: "", dificuldades: [], objetivo: "" };
const inputCls = "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20";

function Field({ label, error, optional, children }: { label: string; error?: string | undefined; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-primary">
        {label} {optional ? <span className="font-normal text-muted-foreground">(opcional)</span> : <span className="text-gold">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Chips({ options, value, onChange, multi }: { options: readonly string[]; value: string[] | string; onChange: (v: any) => void; multi?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = multi ? (value as string[]).includes(o) : value === o;
        return (
          <button
            type="button"
            key={o}
            aria-pressed={active}
            onClick={() => {
              if (!multi) return onChange(o);
              const arr = value as string[];
              if (o === "Nenhuma") return onChange(active ? [] : ["Nenhuma"]);
              const base = arr.filter((x) => x !== "Nenhuma");
              onChange(active ? base.filter((x) => x !== o) : [...base, o]);
            }}
            className={cn("rounded-full border px-3.5 py-1.5 text-sm transition", active ? "border-secondary bg-secondary text-secondary-foreground" : "border-input bg-card text-foreground hover:border-secondary")}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function DiagnosticoPage() {
  const [f, setF] = useState<Form>(vazio);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [loading, setLoading] = useState(false);
  const submit = useServerFn(submitLead);
  const navigate = useNavigate();
  const set = (k: keyof Form) => (v: any) => setF((p) => ({ ...p, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = leadSchema.safeParse(f);
    if (!parsed.success) {
      const errs: Partial<Record<keyof Form, string>> = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof Form] ??= i.message;
      setErrors(errs);
      toast.error("Verifique os campos destacados.");
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const { id } = await submit({ data: parsed.data });
      toast.success("Formulário enviado com sucesso! Seu diagnóstico está pronto.");
      navigate({ to: "/resultado/$id", params: { id } });
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="font-display text-3xl font-semibold text-primary sm:text-4xl">Seu diagnóstico gratuito</h1>
        <p className="mt-2 text-muted-foreground">Leva poucos minutos. Campos com <span className="text-gold">*</span> são obrigatórios.</p>
        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-8">
          <section className="space-y-5 rounded-xl border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-semibold text-primary">Sobre você e seu negócio</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome do responsável" error={errors.responsavel}><input className={inputCls} value={f.responsavel} onChange={(e) => set("responsavel")(e.target.value)} maxLength={100} /></Field>
              <Field label="Nome do negócio" error={errors.negocio}><input className={inputCls} value={f.negocio} onChange={(e) => set("negocio")(e.target.value)} maxLength={120} /></Field>
              <Field label="Segmento de atuação" error={errors.segmento}><input className={inputCls} placeholder="Ex.: confeitaria, estética" value={f.segmento} onChange={(e) => set("segmento")(e.target.value)} maxLength={100} /></Field>
              <Field label="WhatsApp" error={errors.whatsapp}><input className={inputCls} inputMode="tel" placeholder="(53) 99999-9999" value={f.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} maxLength={20} /></Field>
              <Field label="Cidade" error={errors.cidade}><input className={inputCls} value={f.cidade} onChange={(e) => set("cidade")(e.target.value)} maxLength={100} /></Field>
              <Field label="Estado" error={errors.estado}>
                <select className={inputCls} value={f.estado} onChange={(e) => set("estado")(e.target.value)}>
                  <option value="">Selecione</option>
                  {ESTADOS.map((uf) => <option key={uf}>{uf}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Instagram ou site" optional error={errors.instagram_site}><input className={inputCls} placeholder="@seunegocio ou www.seunegocio.com.br" value={f.instagram_site} onChange={(e) => set("instagram_site")(e.target.value)} maxLength={200} /></Field>
          </section>

          <section className="space-y-6 rounded-xl border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-semibold text-primary">Sua presença digital</h2>
            <Field label="Redes sociais utilizadas" error={errors.redes}><Chips multi options={REDES} value={f.redes} onChange={set("redes")} /></Field>
            <Field label="Frequência de publicação" error={errors.frequencia}><Chips options={FREQUENCIAS} value={f.frequencia} onChange={set("frequencia")} /></Field>
            <Field label="Principais dificuldades na divulgação digital" error={errors.dificuldades}><Chips multi options={DIFICULDADES} value={f.dificuldades} onChange={set("dificuldades")} /></Field>
            <Field label="Objetivo principal do negócio" error={errors.objetivo}><Chips options={OBJETIVOS} value={f.objetivo} onChange={set("objetivo")} /></Field>
          </section>

          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Ver meu diagnóstico
          </button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
