# Relatório de Auditoria SEO/GEO — Isiortho Odontologia Premium

**Data da auditoria:** 1 de julho de 2026  
**Projeto:** LP - Isiortho Odontologia  
**URL:** https://isiortho.com.br/  

---

## Resumo Executivo

Auditoria completa de SEO (Search Engine Optimization) e GEO (Generative Engine Optimization) realizada no site da Isiortho Odontologia Premium. Foram identificadas **11 oportunidades de melhoria**, das quais **9 foram implementadas diretamente no código** e **2 dependem de ações externas/off-page**.

---

## Checklist de Implementações Realizadas

### 1. Meta Tags Técnicas ✅
- [x] **Canonical tag** adicionada em todas as páginas (`index.html`, `politica-de-privacidade.html`, `termos-e-condicoes.html`)
- [x] **Geo tags** implementadas (`geo.region=BR-RJ`, `geo.placename=Itaguaí`, `geo.position`, `ICBM`)
- [x] **Meta robots** otimizada nas páginas legais (`index, follow`)
- [x] **Lang e Charset** já estavam corretos (`lang="pt-BR"`, `charset="UTF-8"`)
- [x] **Viewport** já estava presente

### 2. Open Graph (Facebook, LinkedIn, WhatsApp) ✅
- [x] `og:title` — otimizado com keyword + localização
- [x] `og:description` — descritivo e com CTA implícito
- [x] `og:image` — imagem dos dentistas (alta credibilidade)
- [x] `og:image:alt` — acessível e descritivo
- [x] `og:url`, `og:type`, `og:locale`, `og:site_name`

### 3. Twitter Cards ✅
- [x] `twitter:card=summary_large_image` (index) / `summary` (páginas legais)
- [x] `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`

### 4. Schema.org JSON-LD (Rich Snippets) ✅
- [x] **MedicalBusiness** (com `@id` canônico) — tipo especializado para clínicas odontológicas
- [x] **AggregateRating** — 4.7 estrelas, 60+ avaliações (dados reais do site)
- [x] **FAQPage** — 5 perguntas com respostas estruturadas (crucial para GEO e Rich Snippets)
- [x] **BreadcrumbList** — em todas as páginas
- [x] **WebPage** — na página inicial com `datePublished` e `dateModified`
- [x] **Article** — nas páginas de Política de Privacidade e Termos
- [x] **Founder/Person** — Dr. Victor Frias e Dr. Igor Batista com `jobTitle`
- [x] **MedicalSpecialty** — Implantodontia, Bucomaxilofacial, Ortodontia, Endodontia
- [x] **OpeningHoursSpecification** — Segunda a Sexta, 9h às 18h
- [x] **PostalAddress + GeoCoordinates** — endereço completo com lat/long
- [x] **areaServed** — Itaguaí, Muriqui, Seropédica, Mangaratiba
- [x] **sameAs** — Instagram e Facebook

### 5. Core Web Vitals & Performance ✅
- [x] **`fetchpriority="high"`** no hero video e logo (melhora LCP)
- [x] **`width` e `height` explícitos** em todas as imagens (previne CLS)
- [x] **`loading="lazy"`** já presente em imagens abaixo da dobra
- [x] **`defer`** adicionado ao `script.js` (melhora INP)
- [x] **`display=swap`** já presente nas fontes Google (previne FOIT)
- [x] **`preconnect`** já presente para `fonts.googleapis.com` e `fonts.gstatic.com`

### 6. Acessibilidade & Semântica ✅
- [x] **Skip link** adicionado para navegação por teclado
- [x] **`<main id="conteudo-principal">`** envolvendo o conteúdo principal em todas as páginas
- [x] **`<header>`, `<nav>`, `<footer>`** já estruturados corretamente
- [x] **`aria-label`** já presente em botões de ícone
- [x] **H1 único** por página já respeitado

### 7. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) ✅
- [x] **NAP visível em HTML** — Nome, Endereço, Telefone em texto (não só imagem)
- [x] **CNPJ** presente no footer (`12.983.410/0001-89`)
- [x] **Credenciais dos dentistas** — Dr. Victor Frias e Dr. Igor Batista mencionados
- [x] **20 anos de experiência** — evidenciado em múltiplas seções
- [x] **4.7 estrelas / 60+ avaliações Google** — prova social quantificada
- [x] **Política de Privacidade e Termos** — páginas legais completas com LGPD
- [x] **Timestamp "Última atualização"** visível no footer (1 de julho de 2026)
- [x] **Depoimentos reais** — 17 avaliações com nomes e textos autênticos

### 8. FAQ & GEO (Generative Engine Optimization) ✅
- [x] **5 FAQs estruturadas** com `<details>`/`<summary>` + Schema.org FAQPage
- [x] **Respostas diretas e claras** — formato extraível por IA
- [x] **Estatísticas com fonte** — "4,7 · 60+ avaliações no Google", "+15 mil procedimentos"
- [x] **Definições claras** — "cirurgia guiada e sem cortes", "prótese protocolo"
- [x] **Citação de especialistas** — quote da "Equipe Médica Isiortho"
- [x] **Timestamps** — "Última atualização: 29 de junho de 2026" nas páginas legais

### 9. Arquivos Técnicos Criados ✅
- [x] **`robots.txt`** — com permissão para crawlers de IA (ChatGPT, Claude, Perplexity, Google-Extended)
- [x] **`sitemap.xml`** — 3 URLs mapeadas com `lastmod`, `changefreq` e `priority`

### 10. Correções de Bugs ✅
- [x] **`<body></body>` duplicado** removido de `politica-de-privacidade.html`

---

## Checklist de Tarefas Externas / Off-Page (Não Implementáveis por Código)

> ⚠️ **IMPORTANTE:** As tarefas abaixo dependem de ações manuais do cliente ou de serviços de terceiros. Recomendamos priorizá-las para maximizar os resultados de SEO local.

### Google My Business (GMB) — PRIORIDADE ALTA
- [ ] **Verificar e otimizar o perfil do Google Meu Negócio**
  - Garantir que o NAP (Nome, Endereço, Telefone) corresponda EXATAMENTE ao site
  - Adicionar fotos da clínica, dentistas e procedimentos
  - Incluir link para o site: `https://isiortho.com.br/`
  - Atualizar horários de funcionamento: Seg-Sex 9h-18h
  - Adicionar serviços: Implantes Dentários, Prótese Protocolo, Ortodontia, etc.
  - Responder a TODAS as avaliações (positivas e negativas)

### Google Search Console — PRIORIDADE ALTA
- [ ] **Submeter o sitemap.xml**
  - URL: `https://isiortho.com.br/sitemap.xml`
- [ ] **Solicitar indexação das 3 URLs**
  - `https://isiortho.com.br/`
  - `https://isiortho.com.br/politica-de-privacidade.html`
  - `https://isiortho.com.br/termos-e-condicoes.html`
- [ ] **Verificar propriedade** via tag HTML ou DNS
- [ ] **Monitorar Core Web Vitals** após deploy

### Google Analytics / Tag Manager — PRIORIDADE MÉDIA
- [ ] **Instalar Google Analytics 4 (GA4)** — rastreamento de conversões do formulário e WhatsApp
- [ ] **Configurar Google Tag Manager** — para gerenciar tags sem editar código
- [ ] **Criar eventos de conversão:**
  - Clique no botão "Agendar avaliação"
  - Envio do formulário de contato
  - Clique no WhatsApp flutuante
  - Clique no botão de som do vídeo (engajamento)

### Backlinks e Diretórios Locais — PRIORIDADE MÉDIA
- [ ] **Cadastrar em diretórios odontológicos e locais:**
  - Doctoralia / DocPlanner
  - Guia Médico do Rio de Janeiro
  - FindaTopDoc
  - CRO-RJ (Conselho Regional de Odontologia)
  - Itaguaí.com.br / Guia Itaguaí
- [ ] **Solicitar backlinks de parceiros:**
  - Fornecedores de materiais odontológicos
  - Clínicas parceiras de referência
  - Associações profissionais

### Redes Sociais — PRIORIDADE MÉDIA
- [ ] **Instagram:** garantir link para o site na bio (`https://isiortho.com.br/`)
- [ ] **Facebook:** adicionar link do site na página e nas publicações fixadas
- [ ] **LinkedIn:** criar página da empresa com link para o site
- [ ] **YouTube:** se houver canal, adicionar link na descrição

### Performance & Segurança — PRIORIDADE MÉDIA
- [ ] **Testar no PageSpeed Insights** após deploy em produção
  - Meta: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] **Verificar SSL/HTTPS** — certificado válido e forçar redirecionamento HTTP → HTTPS
- [ ] **Habilitar compressão Gzip/Brotli** no servidor
- [ ] **Habilitar cache do navegador** (headers Cache-Control)

### Conteúdo & Atualizações — PRIORIDADE BAIXA (Contínua)
- [ ] **Blog/Artigos:** publicar conteúdo mensal sobre implantes, cirurgia guiada, casos reais
- [ ] **Atualizar timestamp** do site a cada alteração significativa
- [ ] **Adicionar novos depoimentos** à medida que chegarem avaliações no Google
- [ ] **Criar página "Equipe"** com perfis detalhados de cada dentista (foto, formação, especialização, registro no CRO)

---

## Métricas de Antes vs. Depois

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Open Graph | ❌ Não tinha | ✅ Completo (7 tags) |
| Twitter Cards | ❌ Não tinha | ✅ Completo (4 tags) |
| Schema.org | ❌ Não tinha | ✅ 3 schemas + FAQPage + MedicalBusiness |
| Canonical | ❌ Não tinha | ✅ Todas as páginas |
| Geo Tags | ❌ Não tinha | ✅ 4 tags geo |
| robots.txt | ❌ Não existia | ✅ Com crawlers de IA liberados |
| sitemap.xml | ❌ Não existia | ✅ 3 URLs mapeadas |
| Image dimensions | ⚠️ Parcial | ✅ Todas com width/height |
| Script defer | ❌ Não tinha | ✅ script.js com defer |
| Skip link | ❌ Não tinha | ✅ Acessibilidade melhorada |
| `<main>` semântico | ❌ Não tinha | ✅ Todas as páginas |
| Timestamp GEO | ❌ Não tinha | ✅ Footer + Schema dateModified |

---

## Recomendações Finais

1. **Deploy imediato:** todas as alterações de código estão prontas para subir
2. **Prioridade 1 (esta semana):** Google Search Console + GMB
3. **Prioridade 2 (próximas 2 semanas):** GA4 + diretórios locais
4. **Prioridade 3 (mensal):** conteúdo blog + novos backlinks
5. **Monitoramento:** verificar posicionamento para "implantes dentários Itaguaí" em 30-60 dias

---

> **Lembrete:** O melhor SEO é conteúdo de qualidade que responde perguntas de forma clara e autoritativa. O site da Isiortho já tem excelente conteúdo humano; agora está também perfeitamente estruturado para máquinas. 🚀
