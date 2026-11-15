import type { LeadInput } from "./diagnostico-schema";

export type Recomendacao = { titulo: string; texto: string };
export type Diagnostico = { atencao: string[]; oportunidades: string[]; recomendacoes: Recomendacao[] };

type Candidata = Recomendacao & { peso: number };

/** Regras transparentes: cada resposta soma pontos de prioridade às recomendações. */
export function gerarDiagnostico(d: LeadInput): Diagnostico {
  const atencao: string[] = [];
  const oportunidades: string[] = [];
  const cand: Candidata[] = [];
  const redes = d.redes.filter((r) => r !== "Nenhuma");
  const semPresenca = redes.length === 0;
  const baixaFrequencia = ["Raramente", "Não publico"].includes(d.frequencia);
  const temSite = !!d.instagram_site && d.instagram_site.trim().length > 0;
  const has = (x: string) => (d.dificuldades as string[]).includes(x);

  if (semPresenca) {
    atencao.push("O negócio ainda não utiliza redes sociais, o que limita ser encontrado por novos clientes.");
    cand.push({ peso: 10, titulo: "Criar uma presença digital mínima", texto: "Comece por um perfil profissional no Instagram e no Google Meu Negócio, com foto, descrição clara do que você oferece, cidade e link para o WhatsApp." });
  } else if (redes.length === 1) {
    oportunidades.push(`Você já está no ${redes[0]}; ampliar para um segundo canal pode alcançar novos públicos.`);
  }

  if (!redes.includes("Google Meu Negócio")) {
    oportunidades.push(`Um perfil no Google Meu Negócio ajuda clientes de ${d.cidade} a encontrar seu negócio em buscas e no mapa.`);
    cand.push({ peso: 6, titulo: "Cadastrar o negócio no Google", texto: "Crie ou atualize o perfil no Google Meu Negócio com horário, endereço, fotos e telefone. Peça a clientes satisfeitos que deixem avaliações." });
  }
  if (!redes.includes("WhatsApp Business")) {
    cand.push({ peso: 4, titulo: "Profissionalizar o atendimento no WhatsApp", texto: "Use o WhatsApp Business com catálogo, mensagem de boas-vindas e respostas rápidas para agilizar o atendimento." });
  }

  if (baixaFrequencia && !semPresenca) {
    atencao.push(`A frequência de publicação (${d.frequencia.toLowerCase()}) reduz a visibilidade e a lembrança da marca.`);
    cand.push({ peso: 8, titulo: "Definir uma rotina de publicações", texto: "Estabeleça uma meta realista, como 3 publicações por semana, e reserve um horário fixo para produzir e agendar o conteúdo." });
  }
  if (has("Falta de tempo") || has("Falta de planejamento")) {
    atencao.push("A falta de tempo ou de planejamento faz a comunicação acontecer de forma irregular.");
    cand.push({ peso: 7, titulo: "Montar um calendário mensal de conteúdo", texto: "Planeje em uma única sessão os temas do mês e produza em lote. Isso economiza tempo e mantém a constância." });
  }
  if (has("Não sei o que publicar")) {
    atencao.push("Há dúvida sobre quais conteúdos publicar.");
    cand.push({ peso: 7, titulo: "Organizar seu conteúdo em pilares", texto: `Alterne entre 4 temas: bastidores do negócio, dicas sobre ${d.segmento.toLowerCase()}, depoimentos de clientes e ofertas.` });
  }
  if (has("Pouco engajamento")) {
    atencao.push("O engajamento com o público está abaixo do desejado.");
    cand.push({ peso: 5, titulo: "Estimular a conversa com o público", texto: "Faça perguntas nas legendas, use enquetes nos stories e responda todos os comentários e mensagens no mesmo dia." });
  }
  if (has("Não converto seguidores em clientes")) {
    atencao.push("Os seguidores não estão se transformando em clientes.");
    cand.push({ peso: 8, titulo: "Incluir chamadas para ação claras", texto: "Em cada publicação, diga o próximo passo: \"chame no WhatsApp\", \"agende pelo link da bio\". Deixe o contato visível no perfil." });
  }
  if (has("Dificuldade com fotos e vídeos")) {
    atencao.push("A produção de fotos e vídeos é uma dificuldade.");
    cand.push({ peso: 5, titulo: "Padronizar fotos com o celular", texto: "Use luz natural, fundo limpo e sempre o mesmo enquadramento. Vídeos curtos mostrando o dia a dia funcionam muito bem." });
  }
  if (has("Não sei usar anúncios")) {
    oportunidades.push("Anúncios com pequeno investimento, segmentados por região, podem acelerar resultados.");
    cand.push({ peso: d.objetivo === "Atrair mais clientes" || d.objetivo === "Lançar produto ou serviço" ? 6 : 3, titulo: "Testar anúncios locais com baixo orçamento", texto: `Comece impulsionando a publicação de melhor desempenho para pessoas de ${d.cidade}, com orçamento diário pequeno, e acompanhe as mensagens recebidas.` });
  }
  if (!temSite) {
    oportunidades.push("Ter um link central (site simples ou página de links) facilita o caminho até o contato.");
  }

  const porObjetivo: Record<string, Candidata> = {
    "Atrair mais clientes": { peso: 5, titulo: "Mostrar prova social", texto: "Publique depoimentos e resultados de clientes reais. É o conteúdo que mais gera confiança em quem ainda não conhece você." },
    "Aumentar vendas": { peso: 5, titulo: "Criar ofertas com prazo", texto: "Divulgue ofertas ou combos com prazo definido e direcione para o WhatsApp para fechar a venda." },
    "Fortalecer a marca": { peso: 5, titulo: "Padronizar a identidade visual", texto: "Defina cores, fontes e tom de voz e use em todas as publicações para que seu negócio seja reconhecido rapidamente." },
    "Fidelizar clientes": { peso: 5, titulo: "Manter contato com quem já comprou", texto: "Crie uma lista de transmissão no WhatsApp com novidades e benefícios exclusivos para clientes." },
    "Lançar produto ou serviço": { peso: 5, titulo: "Preparar o lançamento com antecedência", texto: "Gere expectativa por 1 a 2 semanas com bastidores e contagem regressiva antes de anunciar a novidade." },
  };
  const objetivoRec = porObjetivo[d.objetivo];
  if (objetivoRec) cand.push(objetivoRec);
  oportunidades.push(`Seu objetivo de "${d.objetivo.toLowerCase()}" pode orientar todas as ações digitais, tornando a comunicação mais eficiente.`);

  // Recomendações gerais de baixa prioridade garantem sempre três sugestões.
  cand.push({ peso: 1, titulo: "Acompanhar os resultados mensalmente", texto: "Anote todo mês seguidores, mensagens recebidas e vendas vindas do digital para saber o que funciona e ajustar a estratégia." });
  cand.push({ peso: 1, titulo: "Otimizar a descrição do perfil", texto: "Deixe claro na bio o que você faz, para quem, onde atende e como entrar em contato." });

  if (atencao.length === 0) atencao.push("Não identificamos pontos críticos; o foco agora é consistência e mensuração de resultados.");

  const recomendacoes = cand
    .map((c, i) => ({ ...c, i }))
    .sort((a, b) => b.peso - a.peso || a.i - b.i)
    .slice(0, 3)
    .map(({ titulo, texto }) => ({ titulo, texto }));

  return { atencao, oportunidades, recomendacoes };
}
