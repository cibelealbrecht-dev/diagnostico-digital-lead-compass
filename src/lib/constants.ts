export const WHATSAPP_NUMBER = "5553999917479";
export const WHATSAPP_DISPLAY = "+55 (53) 99991-7479";
export const APP_NAME = "Diagnóstico Digital CA";
export const SLOGAN = "Clareza para sua presença digital. Estratégia para seu negócio.";

/** Normaliza para o formato internacional aceito pelo wa.me (somente dígitos, com DDI 55). */
export function numeroWhatsapp(numero: string) {
  const digitos = String(numero).replace(/\D/g, "");
  return digitos.startsWith("55") ? digitos : `55${digitos}`;
}

/**
 * Monta o link no formato https://wa.me/<numero> com a mensagem pré-preenchida
 * codificada para URL (espaços viram %20, acentos viram sequências UTF-8).
 */
export function whatsappLink(message = "", numero: string = WHATSAPP_NUMBER) {
  const texto = message.trim();
  const base = `https://wa.me/${numeroWhatsapp(numero)}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** Mensagem padrão dos botões públicos: genérica e profissional. */
export const MENSAGEM_CONTATO =
  "Olá! Vim pelo site do Diagnóstico Digital CA e gostaria de mais informações sobre o diagnóstico digital para o meu negócio.";

type LeadParaMensagem = { objetivo: string };

/** Mensagem do resultado: genérica e profissional, personalizada pelo objetivo informado pelo visitante. */
export function mensagemDiagnostico(lead: LeadParaMensagem) {
  return [
    "Olá! Fiz o Diagnóstico Digital CA e gostaria de solicitar um atendimento.",
    "",
    `Objetivo informado no formulário: ${lead.objetivo}`,
    "",
    "Podem me ajudar a colocar as recomendações em prática?",
  ].join("\n");
}

export const REDES = ["Instagram", "Facebook", "WhatsApp Business", "TikTok", "YouTube", "LinkedIn", "Google Meu Negócio", "Nenhuma"] as const;
export const FREQUENCIAS = ["Diariamente", "Algumas vezes por semana", "Uma vez por semana", "Raramente", "Não publico"] as const;
export const DIFICULDADES = [
  "Falta de tempo",
  "Não sei o que publicar",
  "Pouco engajamento",
  "Não converto seguidores em clientes",
  "Dificuldade com fotos e vídeos",
  "Não sei usar anúncios",
  "Falta de planejamento",
] as const;
export const OBJETIVOS = ["Atrair mais clientes", "Aumentar vendas", "Fortalecer a marca", "Fidelizar clientes", "Lançar produto ou serviço"] as const;
export const ESTADOS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"] as const;
