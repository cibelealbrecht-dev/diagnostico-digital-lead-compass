export const WHATSAPP_NUMBER = "5553999917479";
export const WHATSAPP_DISPLAY = "+55 (53) 99991-7479";
export const APP_NAME = "Diagnóstico Digital CA";
export const SLOGAN = "Clareza para sua presença digital. Estratégia para seu negócio.";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
