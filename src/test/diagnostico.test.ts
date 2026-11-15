import { describe, it, expect } from "vitest";
import { gerarDiagnostico } from "@/lib/diagnostico";
import type { LeadInput } from "@/lib/diagnostico-schema";

const base: LeadInput = {
  responsavel: "Ana", negocio: "Doce", segmento: "Confeitaria", cidade: "Pelotas", estado: "RS",
  whatsapp: "53999999999", instagram_site: "", redes: ["Instagram"], frequencia: "Raramente",
  dificuldades: ["Falta de tempo"], objetivo: "Aumentar vendas",
};

describe("gerarDiagnostico", () => {
  it("sempre retorna exatamente 3 recomendações", () => {
    expect(gerarDiagnostico(base).recomendacoes).toHaveLength(3);
    expect(gerarDiagnostico({ ...base, redes: ["Instagram", "Google Meu Negócio", "WhatsApp Business"], frequencia: "Diariamente" }).recomendacoes).toHaveLength(3);
  });
  it("sem redes sociais prioriza criar presença digital", () => {
    expect(gerarDiagnostico({ ...base, redes: ["Nenhuma"] }).recomendacoes[0]?.titulo).toBe("Criar uma presença digital mínima");
  });
  it("baixa frequência gera ponto de atenção e rotina de publicações", () => {
    const r = gerarDiagnostico(base);
    expect(r.recomendacoes.map((x) => x.titulo)).toContain("Definir uma rotina de publicações");
  });
});
