import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/site";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Diagnóstico Digital CA" },
      { name: "description", content: "Acesso ao painel administrativo do Diagnóstico Digital CA." },
      { property: "og:title", content: "Entrar — Diagnóstico Digital CA" },
      { property: "og:description", content: "Acesso restrito ao painel administrativo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const inputCls = "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20";

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 8) { toast.error("A senha deve ter pelo menos 8 caracteres."); return; }
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      setLoading(false);
      if (error) { toast.error("E-mail ou senha inválidos, ou e-mail ainda não confirmado."); return; }
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Conta criada! Confirme pelo link enviado ao seu e-mail e depois entre.");
      setMode("login");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-muted px-5 font-sans">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border bg-card p-7 shadow-soft">
          <h1 className="font-display text-2xl font-semibold text-primary">{mode === "login" ? "Painel administrativo" : "Primeiro acesso"}</h1>
          <div><label className="mb-1.5 block text-sm font-medium text-primary">E-mail</label><input type="email" required className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><label className="mb-1.5 block text-sm font-medium text-primary">Senha</label><input type="password" required minLength={8} className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}{mode === "login" ? "Entrar" : "Criar conta"}
          </button>
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="w-full text-center text-sm text-secondary hover:underline">
            {mode === "login" ? "Primeiro acesso? Criar conta" : "Já tenho conta. Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
