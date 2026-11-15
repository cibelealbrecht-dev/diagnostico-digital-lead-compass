import { z } from "zod";
import { DIFICULDADES, ESTADOS, FREQUENCIAS, OBJETIVOS, REDES } from "./constants";

export const leadSchema = z.object({
  responsavel: z.string().trim().min(2, "Informe seu nome").max(100),
  negocio: z.string().trim().min(2, "Informe o nome do negócio").max(120),
  segmento: z.string().trim().min(2, "Informe o segmento").max(100),
  cidade: z.string().trim().min(2, "Informe a cidade").max(100),
  estado: z.enum(ESTADOS, { errorMap: () => ({ message: "Selecione o estado" }) }),
  whatsapp: z.string().trim().regex(/^[\d\s()+-]{10,20}$/, "WhatsApp inválido (inclua o DDD)"),
  instagram_site: z.string().trim().max(200).optional().or(z.literal("")),
  redes: z.array(z.enum(REDES)).min(1, "Selecione ao menos uma opção"),
  frequencia: z.enum(FREQUENCIAS, { errorMap: () => ({ message: "Selecione a frequência" }) }),
  dificuldades: z.array(z.enum(DIFICULDADES)).min(1, "Selecione ao menos uma dificuldade"),
  objetivo: z.enum(OBJETIVOS, { errorMap: () => ({ message: "Selecione o objetivo" }) }),
});
export type LeadInput = z.infer<typeof leadSchema>;
