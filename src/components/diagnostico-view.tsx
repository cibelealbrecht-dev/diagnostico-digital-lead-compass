import { AlertTriangle, Sparkles, CheckCircle2 } from "lucide-react";
import type { Diagnostico } from "@/lib/diagnostico";

export function DiagnosticoView({ d }: { d: Diagnostico }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-semibold text-primary"><AlertTriangle className="h-5 w-5 text-gold" /> Principais pontos de atenção</h2>
        <ul className="mt-4 space-y-2.5">{d.atencao.map((t) => <li key={t} className="flex gap-2 text-sm text-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{t}</li>)}</ul>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-semibold text-primary"><Sparkles className="h-5 w-5 text-secondary" /> Oportunidades identificadas</h2>
        <ul className="mt-4 space-y-2.5">{d.oportunidades.map((t) => <li key={t} className="flex gap-2 text-sm text-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />{t}</li>)}</ul>
      </div>
      <div className="rounded-xl bg-primary p-6 text-primary-foreground shadow-soft sm:p-8">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold"><CheckCircle2 className="h-5 w-5 text-gold" /> 3 recomendações prioritárias</h2>
        <ol className="mt-6 space-y-5">
          {d.recomendacoes.map((r, i) => (
            <li key={r.titulo} className="flex gap-4">
              <span className="font-display text-2xl text-gold">{i + 1}</span>
              <div><p className="font-semibold">{r.titulo}</p><p className="mt-1 text-sm text-primary-foreground/80">{r.texto}</p></div>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-xs text-muted-foreground">Este diagnóstico é gerado por regras definidas com base nas suas respostas ao formulário.</p>
    </div>
  );
}
