import { describe, it, expect } from "vitest";
import { MENSAGEM_CONTATO, WHATSAPP_NUMBER, mensagemDiagnostico, whatsappLink } from "@/lib/constants";

const proibido = /cibele|jeová|jeova|jireh/i;

describe("whatsappLink", () => {
  it("usa o formato https://wa.me/<numero> com a mensagem codificada", () => {
    const url = whatsappLink("Olá! Objetivo: Aumentar vendas — Pelotas/RS");
    expect(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`)).toBe(true);
    expect(url).not.toContain("api.whatsapp.com");
    expect(url).not.toContain(" ");
    expect(url).toContain("Aumentar%20vendas");
    expect(decodeURIComponent(url.slice(url.indexOf("?text=") + 6))).toBe("Olá! Objetivo: Aumentar vendas — Pelotas/RS");
  });

  it("sem mensagem gera apenas o número, normalizado para o DDI 55", () => {
    expect(whatsappLink("", "(53) 99999-9999")).toBe("https://wa.me/5553999999999");
    expect(whatsappLink("")).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
  });

  it("a mensagem do resultado usa o objetivo informado pelo visitante e não cita nomes", () => {
    const msg = mensagemDiagnostico({
      responsavel: "Ana", negocio: "Doce", segmento: "Confeitaria",
      cidade: "Pelotas", estado: "RS", objetivo: "Aumentar vendas",
    } as never);
    expect(msg).toContain("Objetivo informado no formulário: Aumentar vendas");
    expect(msg).not.toContain("Ana");
    expect(msg).not.toContain("Doce");
    expect(msg).not.toMatch(proibido);
    expect(MENSAGEM_CONTATO).not.toMatch(proibido);
  });
});
