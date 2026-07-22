# Plano: Landing Page Profissional — Curso de Extensão SUAS 2026

## Visão Geral

Transformar o design compacto do Instagram (`versao_e.html`, 1080×1080px) em uma **landing page web profissional, responsiva e elegante** usando **Astro + React + TypeScript**. A página será o destino público de divulgação do curso, com todas as informações extraídas dos documentos `.docx`.

---

## 1. Arquitetura Técnica

### Stack
| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework | **Astro 5** | Zero JS por padrão, ideal para landing pages de conteúdo. React como "islands" interativas. |
| Componentes | **React 19 + TypeScript** | Componentes tipados para seções interativas (schedule expansível, formulário, animações). |
| Estilização | **Tailwind CSS 4** + tokens de design CSS custom properties | Design system extraído do `versao_e.html`; Tailwind para produtividade com `@theme` para as cores customizadas. |
| Fonte | Google Fonts — **Inter** (body) + **Merriweather** (headings) | Consistente com o design original. |
| Deploy | **Cloudflare Pages** ou **Vercel** | Static site, deploy gratuito e rápido. |

### Por que Astro (e não só React)?
- Página é 95% conteúdo estático — Astro gera HTML puro, sem hidratação desnecessária.
- React usado apenas onde há interatividade real (schedule tabs/accordion, carrossel de logos).
- Performance máxima: Lighthouse 100 esperado.
- SEO nativo com `<Head>` e metatags do Astro.

### Estrutura de Diretórios
```
src/
├── pages/
│   └── index.astro              # Página principal
├── components/
│   ├── HeroSection.astro        # Título + metadata + CTA (estático)
│   ├── GoldInfoBar.astro        # Barra dourada: período, horário, vagas (estático)
│   ├── AboutSection.astro       # Sobre o curso (estático)
│   ├── ScheduleSection.tsx      # Cronograma interativo com accordion (React island)
│   ├── ModuleCard.tsx           # Card de módulo expansível (React)
│   ├── LessonItem.tsx           # Item de aula individual (React)
│   ├── SelectionCriteria.astro  # Critérios de seleção (estático)
│   ├── RegistrationTimeline.astro # Timeline de inscrição (estático)
│   ├── CTASection.astro         # Call-to-action final (estático)
│   ├── Footer.astro             # Footer com logos + carrossel (estático)
│   └── LogoCarousel.tsx         # Carrossel de logos (React island)
├── data/
│   └── course-data.ts           # Dados tipados do curso, cronograma, critérios
├── styles/
│   └── tokens.css               # Design tokens (cores, fontes, espaçamento)
└── layouts/
    └── BaseLayout.astro         # Layout base com fontes, metatags, header/footer wrapper
```

---

## 2. Design System (extraído de `versao_e.html`)

### Paleta de Cores
| Token | Cor | Uso |
|---|---|---|
| `--color-navy` | `#0b1e3d` | Títulos, backgrounds escuros |
| `--color-gold` | `#c9a84c` | Destaques, CTAs, barra de info |
| `--color-burgundy` | `#8b1e34` | Tags, acentos, dots ativos |
| `--color-cream` | `#f5f1eb` | Background principal |
| `--color-white` | `#ffffff` | Cards, backgrounds de seção |
| `--color-gray` | `#6b7280` | Subtítulos, texto secundário |

### Tipografia
- **Headings**: Merriweather, weight 900, letter-spacing -0.5px
- **Body**: Inter, weights 400-700
- **Tags/Labels**: Inter, weight 700, letter-spacing 1.2–1.8px, uppercase
- **Scale** (mobile-first, expandindo para desktop): headings de 20px–48px

### Elementos Visuais
- **Gold bar**: `linear-gradient(135deg, #c9a84c, #d4b65f, #bf9a35)` com border-radius 8px
- **Módulos**: Cards brancos com borda esquerda colorida (navy/gold/burgundy)
- **Linha superior**: gradiente horizontal navy → gold → burgundy (4px)
- **Formas decorativas**: círculos sutis no fundo (opacidade 0.04)

---

## 3. Estrutura da Página (Seções — Top → Bottom)

### 3.1 Header / Top Bar
- Linha gradiente superior (navy → gold → burgundy, 4px)
- Tag "Curso de Extensão" + ano "2026"
- **Estático** (`.astro`)

### 3.2 Hero Section
- Título principal: "O Trabalho de Assistentes Sociais no Âmbito do SUAS"
- Subtítulo: "Formação, prática e desafios profissionais"
- **Estático** (`.astro`)

### 3.3 Gold Info Bar
- 3 colunas: Período (06/08 a 10/12 · Quintas-feiras) | Horário (14h às 17h · Remoto · 60h) | Vagas (50 sendo 30 prof. + 20 disc.)
- Fundo gradiente dourado, texto navy
- **Estático** (`.astro`)

### 3.4 CTA Principal
- "Inscrições gratuitas · 20/07 a 31/07/2026 · Resultado: 03/08"
- Botão "Inscreva-se" (link externo, dourado)
- **Estático** (`.astro`)

### 3.5 Sobre o Curso
- Descrição extraída do `.docx`
- Destaque: formato remoto, 60h, quintas-feiras
- **Estático** (`.astro`)

### 3.6 Cronograma (React Island — Accordion Interativo)
- Título: "Programação Completa"
- 3 módulos como **accordion cards** (expandir/recolher):
  - **Módulo I** (navy) — Proteção Social, Política Social e Assistência Social (7 aulas)
  - **Módulo II** (gold) — Análise de Dados Sociais do SUAS (4 aulas)
  - **Módulo III** (burgundy) — Trabalho Profissional e Serviço Social (7 aulas)
- Cada aula mostra: data, tópico, professor(a) com instituição
- Estado: primeiro módulo aberto por padrão
- **React** (.tsx — necessário para estado de accordion)

### 3.7 Critérios de Seleção
- Lista com ícones/checkmarks
- 5 critérios extraídos do `.docx`
- **Estático** (`.astro`)

### 3.8 Timeline de Inscrição
- 3 etapas visuais:
  1. Divulgação: 16/07 a 31/07/2026
  2. Inscrição: 20/07 a 31/07/2026
  3. Resultado: 03/08/2026 (via e-mail)
- **Estático** (`.astro`)

### 3.9 CTA Final
- Reforço do botão de inscrição
- **Estático** (`.astro`)

### 3.10 Footer
- Logos dos parceiros (4 imagens de `assets/`)
- Carrossel de dots (React island se tiver muitas logos)
- Copyright ou info institucional
- **Misto** (`.astro` + React island)

---

## 4. Dados Tipados (`course-data.ts`)

Interface TypeScript centralizada com todo o conteúdo:

```typescript
interface CourseData {
  title: string
  subtitle: string
  period: { start: string; end: string; day: string }
  schedule: { time: string; format: string; workload: string }
  vacancies: { total: number; professional: number; student: number }
  registration: { start: string; end: string; resultDate: string; link?: string }
  modules: Module[]
  criteria: string[]
  partners: { name: string; logo: string }[]
}

interface Module {
  id: number
  title: string
  color: 'navy' | 'gold' | 'burgundy'
  lessons: Lesson[]
}

interface Lesson {
  date: string
  topic: string
  professor: string
  institution: string
}
```

---

## 5. Responsividade

- **Mobile** (< 768px): Seções em coluna única, accordion, fonte menor
- **Tablet** (768–1024px): 2 colunas onde aplicável (gold bar, footer)
- **Desktop** (> 1024px): Layout completo, max-width ~1200px centralizado

---

## 6. Plano de Execução (Ordem)

### Fase 1 — Setup do Projeto
1. Inicializar projeto Astro com React + TypeScript + Tailwind
2. Configurar design tokens CSS (`tokens.css`)
3. Configurar Google Fonts (Inter + Merriweather)
4. Criar `BaseLayout.astro`

### Fase 2 — Dados
5. Criar `course-data.ts` com todos os dados tipados extraídos dos `.docx`

### Fase 3 — Componentes Estáticos (Astro)
6. `HeroSection.astro`
7. `GoldInfoBar.astro`
8. `AboutSection.astro`
9. `SelectionCriteria.astro`
10. `RegistrationTimeline.astro`
11. `CTASection.astro`
12. `Footer.astro`

### Fase 4 — Componentes Interativos (React)
13. `ScheduleSection.tsx` + `ModuleCard.tsx` + `LessonItem.tsx` (accordion)
14. `LogoCarousel.tsx` (se necessário)

### Fase 5 — Montagem
15. `index.astro` — compor todas as seções
16. Ajustes de responsividade e espaçamento
17. Testar em mobile/tablet/desktop

### Fase 6 — Refinamento
18. Animações sutis (fade-in, hover transitions)
19. SEO: metatags, Open Graph, favicon
20. Lighthouse audit → garantir score ≥ 95

---

## 7. Observações

- O link de inscrição está como "CRIAR LINK" no `.docx` — deixaremos um placeholder (`#inscricao`) que pode ser atualizado.
- Os logos em `assets/` serão referenciados diretamente. 
- A cor da instituição da Dra. Heloísa Mesquita está como "XXXX" no cronograma — deixamos como está até definição.
- O design original é 1080×1080 para Instagram — a landing page expande isso para um formato web fluido preservando a identidade visual.

---

## TODOs

### Fase 1 — Setup do Projeto
- [x] 1. Inicializar projeto Astro com React + TypeScript + Tailwind CSS 4 — `npm create astro` com todas as dependências
- [x] 2. Configurar design tokens CSS (`tokens.css`) + Tailwind theme com cores customizadas do `versao_e.html`
- [x] 3. Configurar Google Fonts (Inter + Merriweather) e criar `BaseLayout.astro`

### Fase 2 — Dados
- [x] 4. Criar `src/data/course-data.ts` com interfaces tipadas e todos os dados extraídos dos `.docx`

### Fase 3 — Componentes Estáticos (Astro)
- [x] 5. Criar `HeroSection.astro` com título, subtítulo e barra gradiente superior
- [x] 6. Criar `GoldInfoBar.astro` com 3 colunas (período, horário/formato, vagas)
- [x] 7. Criar `CTASection.astro` com info de inscrição + botão dourado
- [x] 8. Criar `AboutSection.astro` com descrição do curso
- [x] 9. Criar `SelectionCriteria.astro` com 5 critérios em lista com checkmarks
- [x] 10. Criar `RegistrationTimeline.astro` com timeline visual de 3 etapas
- [x] 11. Criar `Footer.astro` com logos dos parceiros + copyright

### Fase 4 — Componentes Interativos (React)
- [x] 12. Criar `ScheduleSection.tsx` + `ModuleCard.tsx` + `LessonItem.tsx` com accordion expansível

### Fase 5 — Montagem
- [x] 13. Criar `index.astro` compondo todas as seções + ajustes de responsividade

### Fase 6 — Refinamento
- [x] 14. Adicionar animações sutis (fade-in, hover) + SEO metatags + favicon → Lighthouse ≥ 95

## Final Verification Wave
- [x] F1. Oracle review — goal/constraint verification
- [x] F2. Oracle review — code quality
- [x] F3. Oracle review — security
- [x] F4. Visual QA — design fidelity check
- [x] F5. Build verification — `npm run build` passes, page loads correctly
