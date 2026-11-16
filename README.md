# Diagnóstico Digital CA

**Clareza para sua presença digital. Estratégia para seu negócio.**

Aplicativo desenvolvido como MVP no desafio final do Bootcamp Santander 2026 — DIO: **Construa seu Primeiro App com IA**.

🌐 **Aplicativo publicado:** https://diagnostico-digital-lead-compass.lovable.app

📂 **Repositório:** https://github.com/cibelealbrecht-dev/diagnostico-digital-lead-compass

---

## 1. Problema e oportunidade

Pequenos negócios e empreendedores frequentemente enfrentam dificuldades para estruturar sua presença digital. Entre os principais desafios estão:

- Falta de planejamento sobre o que publicar e por quê.
- Dificuldade para manter frequência e consistência.
- Perfis digitais sem posicionamento ou objetivos claros.
- Dificuldade para transformar visualizações em conversas com potenciais clientes.
- Falta de tempo e orientação estratégica.

O Diagnóstico Digital CA foi idealizado para oferecer uma primeira visão organizada da presença digital do negócio, identificando pontos de atenção e oportunidades de melhoria.

## 2. Público-alvo

Pequenos negócios, profissionais autônomos e empreendedores que desejam melhorar sua presença digital, mas ainda não possuem planejamento ou estrutura definidos.

## 3. TAM, SAM e SOM — análise preliminar de mercado

As estimativas abaixo representam uma dimensão inicial do mercado potencial, não uma pesquisa de demanda validada.

| Indicador | Mercado considerado | Estimativa |
|---|---|---:|
| TAM | Pequenos negócios no Brasil | 24 milhões |
| SAM | Universo de negócios no Rio Grande do Sul | Aproximadamente 1,5 milhão |
| SOM | Estabelecimentos ativos em Dom Pedrito/RS | Aproximadamente 5.058 |

**Ressalvas metodológicas:**

- Os números são estimativas preliminares utilizadas na etapa de planejamento.
- A referência de Dom Pedrito considera estabelecimentos ativos na base de CNPJ de setembro de 2026, incluindo diferentes portes e atividades, não somente o público ideal do produto.
- As estimativas precisam ser atualizadas e refinadas para representar exclusivamente negócios com perfil e interesse no serviço.
- O SOM representa um universo geográfico de referência, não uma previsão de clientes ou faturamento.

Referências institucionais para aprofundamento: Sebrae e dados cadastrais da Receita Federal do Brasil.

## 4. Business Model Canvas (BMC)

| Bloco | Definição |
|---|---|
| Segmentos de clientes | Pequenos negócios e empreendedores. |
| Proposta de valor | Diagnóstico inicial da presença digital, identificação de pontos de atenção e recomendações práticas. |
| Canais | Aplicativo, Instagram, WhatsApp e canais digitais. |
| Relacionamento | Atendimento personalizado e orientação estratégica. |
| Fontes de receita | Possíveis serviços de diagnóstico aprofundado e planejamento de presença digital. |
| Recursos principais | Aplicativo, ferramentas de IA, conhecimento em marketing digital e processos de análise. |
| Atividades principais | Coletar informações, analisar respostas, apresentar recomendações e captar contatos interessados. |
| Parcerias principais | Plataformas de desenvolvimento, ferramentas de IA e serviços digitais. |
| Estrutura de custos | Ferramentas, hospedagem, infraestrutura, manutenção e evolução do produto. |

O modelo representa uma hipótese de negócio em desenvolvimento, não uma operação comercial com receitas comprovadas.

## 5. Tese do MVP

A hipótese central é que pequenos negócios podem se beneficiar de um diagnóstico simples e acessível para compreender melhor sua presença digital e identificar próximos passos.

O MVP foi desenvolvido para testar quatro hipóteses:

1. Empreendedores reconhecem dificuldades na organização da presença digital.
2. Um diagnóstico estruturado pode despertar interesse em compreender essas dificuldades.
3. Recomendações práticas podem gerar interesse em orientação profissional.
4. Um canal direto pelo WhatsApp pode facilitar o início de conversas comerciais.

Essas hipóteses ainda precisam ser validadas com usuários reais. Os testes técnicos realizados não representam validação de mercado.

## 6. Escopo e funcionalidades do MVP

O aplicativo contempla:

- Página inicial com apresentação da proposta.
- Formulário para coleta de informações do negócio.
- Apresentação do resultado do diagnóstico.
- Resumo, pontos de atenção, oportunidades e três recomendações.
- Cadastro e armazenamento de leads.
- Autenticação de acesso administrativo.
- Painel administrativo para visualizar os leads e seus diagnósticos.
- Botões de contato pelo WhatsApp com mensagem pré-preenchida.

### Como funciona o diagnóstico

O usuário preenche o formulário com informações sobre seu negócio e sua presença digital. O aplicativo processa as respostas por meio de regras previamente definidas e apresenta recomendações correspondentes.

**Importante:** a versão publicada utiliza regras de negócio determinísticas. A IA foi utilizada no processo de concepção e construção do aplicativo, mas não há geração de recomendações por um modelo de IA em tempo real dentro da aplicação.

## 7. O que permanece manual ou não foi implementado

Para manter o MVP simples e viável, algumas atividades permanecem fora da automação:

- Atendimento e continuidade da conversa pelo WhatsApp.
- Interpretação estratégica aprofundada dos resultados.
- Personalização de serviços e propostas comerciais.
- Acompanhamento dos leads e relacionamento comercial.

Funcionalidades ainda não implementadas:

- Notificações automáticas por e-mail.
- Pagamentos e assinaturas.
- Edição e exclusão de leads pelo painel.
- Integração com CRM externo.
- Geração de diagnósticos por IA generativa em tempo real.

## 8. Mega prompt — direcionamento de construção

A construção do aplicativo foi orientada por um prompt estruturado com os seguintes requisitos:

> Atue como especialista em desenvolvimento de produtos digitais, UX/UI e aplicações web com IA. Construa um MVP chamado Diagnóstico Digital CA, voltado a pequenos negócios e empreendedores que precisam organizar sua presença digital.
>
> Utilize uma identidade visual profissional, sofisticada e acessível, com azul-marinho, azul médio, branco, cinza-claro e detalhes dourados discretos. Utilize Fraunces nos títulos e Manrope nos textos.
>
> Desenvolva uma página inicial, formulário de diagnóstico, página de resultados com resumo, pontos de atenção, oportunidades e três recomendações práticas. Inclua contato pelo WhatsApp e uma área administrativa protegida por autenticação para visualizar os leads e seus diagnósticos.
>
> Garanta que os dados dos leads sejam protegidos e que somente o administrador autorizado possa consultar todos os registros. Mantenha uma experiência simples, responsiva e adequada ao público de pequenos negócios.
>
> Priorize um MVP funcional, com escopo controlado, sem funcionalidades pagas desnecessárias e sem prometer resultados não comprovados.

Esta é uma síntese documentada do direcionamento de construção, não uma transcrição literal do histórico completo de prompts.

## 9. Testes e correções realizados

Durante a construção e validação do MVP foram realizados testes e ajustes:

- Verificação do fluxo de preenchimento do diagnóstico.
- Verificação da apresentação dos resultados.
- Testes de armazenamento e visualização dos leads.
- Configuração e confirmação da conta administrativa.
- Ajuste das regras de acesso administrativo.
- Correção do link de contato pelo WhatsApp, utilizando o formato `wa.me`.
- Teste do botão de WhatsApp após a correção.
- Verificação do funcionamento do painel administrativo.
- Publicação e teste da aplicação.

Os testes confirmaram o funcionamento dos fluxos principais na versão publicada. Não representam comprovação de desempenho comercial ou validação estatística das hipóteses.

## 10. Tecnologias e ferramentas

- **Lovable:** desenvolvimento assistido por IA.
- **Lovable Cloud:** infraestrutura utilizada para autenticação e armazenamento de dados.
- **GitHub:** versionamento e disponibilização pública do código.
- **WhatsApp:** canal externo de contato.

## 11. Identidade visual

- Nome: Diagnóstico Digital CA.
- Slogan: Clareza para sua presença digital. Estratégia para seu negócio.
- Cores principais: azul-marinho, azul médio, branco e cinza-claro.
- Detalhes: dourado discreto.
- Tipografia: Fraunces e Manrope.

## 12. Como executar localmente

É necessário ter Node.js e npm instalados.

```bash
git clone https://github.com/cibelealbrecht-dev/diagnostico-digital-lead-compass.git

cd diagnostico-digital-lead-compass

npm install

npm run dev
```

## 13. Links do projeto

- **Aplicativo publicado:** https://diagnostico-digital-lead-compass.lovable.app
- **Repositório público:** https://github.com/cibelealbrecht-dev/diagnostico-digital-lead-compass

## 14. Evidências

A documentação pode ser complementada com capturas de tela da aplicação publicada, formulário, resultado do diagnóstico e painel administrativo.

---

**Projeto desenvolvido por Cibele Albrecht**

Desafio de Projeto — Bootcamp Santander 2026 | DIO

**Diagnóstico Digital CA — Clareza para sua presença digital. Estratégia para seu negócio.**
