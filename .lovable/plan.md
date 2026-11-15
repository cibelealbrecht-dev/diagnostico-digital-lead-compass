# Diagnóstico Digital CA — MVP

Slogan: "Clareza para sua presença digital. Estratégia para seu negócio."

## Visual
- Azul-marinho (principal), azul médio (secundário), fundos branco/cinza-claro, detalhes dourados discretos.
- Tipografia: Fraunces (títulos) + Manrope (texto). Ícones Lucide, sem imagens geradas.
- Totalmente adaptado a celular e computador.

## Páginas
1. **Início (/)** — título "Sua presença digital tem potencial. Descubra como aproveitá-lo.", texto explicativo, "Como funciona" (3 etapas), benefícios, botão "Fazer meu diagnóstico gratuito", botão WhatsApp, rodapé.
2. **Diagnóstico (/diagnostico)** — formulário com todos os campos pedidos (obrigatórios validados; Instagram/site opcional; redes sociais e dificuldades em múltipla escolha; frequência e objetivo em lista). Mensagem de sucesso ao enviar e redirecionamento ao resultado.
3. **Resultado (/resultado/:id)** — resumo das respostas, pontos de atenção, oportunidades, 3 recomendações prioritárias e botão "Solicitar atendimento pelo WhatsApp" com mensagem pré-preenchida.
4. **Entrar (/auth)** — login por e-mail e senha do administrador.
5. **Painel (/admin)** — protegido; lista de leads (mais recentes primeiro, busca por nome/negócio/cidade) e detalhe completo de cada formulário com o diagnóstico gerado.

## Recomendações
Geradas por regras transparentes baseadas nas respostas (frequência baixa, sem site, poucas redes, dificuldades marcadas, objetivo). Não haverá menção a IA.

## Dados e acesso (Lovable Cloud)
- Cada envio é salvo como lead. Visitantes só podem enviar; não podem ler leads de outros.
- Somente usuários com papel de administrador veem o painel. O primeiro admin será o e-mail que você indicar.

## Detalhes técnicos
- Tabelas: `leads` (respostas + diagnóstico em JSON), `user_roles` + função `has_role`.
- Envio e leitura do resultado via server functions (resultado lido por id UUID não adivinhável); painel via `requireSupabaseAuth` + checagem de admin.
- Motor de regras em `src/lib/diagnostico.ts` com testes unitários.
- Rotas: `/admin` em `_authenticated`; head() próprio em cada página.

## Pendências (vou usar provisórios se não informados)
- Número de WhatsApp para contato.
- E-mail do administrador.
