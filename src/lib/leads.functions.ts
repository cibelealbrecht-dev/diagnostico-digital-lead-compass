import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { leadSchema } from "./diagnostico-schema";
import { gerarDiagnostico, type Diagnostico } from "./diagnostico";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const diagnostico = gerarDiagnostico(data);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert({ ...data, instagram_site: data.instagram_site || null, diagnostico })
      .select("id")
      .single();
    if (error) throw new Error("Não foi possível salvar o diagnóstico.");
    return { id: row.id };
  });

export const getResultado = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => ({ id: z.string().uuid().parse(input.id) }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("leads")
      .select("id, responsavel, negocio, segmento, cidade, estado, instagram_site, redes, frequencia, dificuldades, objetivo, diagnostico")
      .eq("id", data.id)
      .maybeSingle();
    if (!row) return null;
    return { ...row, diagnostico: row.diagnostico as unknown as Diagnostico };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) return { isAdmin: false as const, leads: [] };
    const { data, error } = await context.supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { isAdmin: true as const, leads: (data ?? []).map((l) => ({ ...l, diagnostico: l.diagnostico as unknown as Diagnostico })) };
  });
