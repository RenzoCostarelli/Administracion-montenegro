# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server (localhost:4321)
pnpm build            # Build to ./dist/
pnpm preview          # Preview production build
```

When running a dev server for ongoing work, use background mode:

```bash
astro dev --background
astro dev stop        # Stop background server
astro dev status      # Check server status
astro dev logs        # View server logs
```

## Architecture

Astro 7 static site with Prismic as headless CMS, Tailwind CSS v4, GSAP animations, and Lenis smooth scrolling.

**Data flow**: Prismic CMS → `src/lib/getHomepage.ts` / `src/lib/getManifiesto.ts` → typed interfaces in `src/types/` → Astro page components → section components.

All CMS content lives in two Prismic documents fetched at build time: `homapage` (note the typo — this is the actual document type name in Prismic) and `manifiesto`.

**Pages** (file-based routing):
- `/` → `src/pages/index.astro`
- `/manifiesto/` → `src/pages/manifiesto/index.astro`

**Styling**: Tailwind CSS v4 is integrated via `@tailwindcss/vite` (not the PostCSS plugin). Custom fonts and CSS variables are defined in `src/styles/global.css`.

## Conventions

- Never use `:any` for types
- All components go in `src/components/`
- All types/interfaces go in `src/types/`
- Always use `pnpm`, never `npm`
- Never use opacity modifiers on text-color utilities (e.g. `text-mont-dark/70`, `text-mont-cream/50` are not allowed). Use a solid color token instead:
  - Secondary text on light backgrounds → `text-mont-dark-muted`
  - Secondary text on dark/blue backgrounds → `text-mont-sand`
  - If neither fits, add a new solid `--color-mont-*` token to `src/styles/global.css` rather than reaching for an opacity suffix.
  - This restriction is for `text-*` and `placeholder:text-*` only — opacity is still fine on `bg-*`/`border-*` (e.g. `border-mont-cream/20`, decorative blur blobs).
- No eyebrows/kickers: never put a small uppercase label above a headline to name or categorize the section (e.g. a "MONTENEGRO" tag above a quote, or "ADMINISTRACIÓN DE CONSORCIOS · INMOBILIARIA" above the hero title). The headline and body copy must stand on their own. This does not apply to functional uppercase labels that aren't headline kickers — nav links, form field labels, property tags (`ALQUILER`/`VENTA`), button text.

## GSAP

Always import `gsap`, `ScrollTrigger`, and `SplitText` from `lib/gsap.ts` — never directly from the `gsap` package.

Timelines must be defined separately and paused, then passed to `ScrollTrigger.create()` via the `animation` property. Always use `scrub: true`:

```ts
const tl = gsap.timeline({ paused: true });

tl.to(element, { ... });

ScrollTrigger.create({
  trigger: element,
  start: "top 80%",
  end: "bottom 20%",
  animation: tl,
  scrub: true,
});
```

## Environment Variables

- `PRISMIC_ACCESS_TOKEN` — required for fetching CMS content
- `COMING_SOON` — optional. En `true` (string) muestra la landing temporal en `/` (`src/components/ComingSoon.astro`) en vez del sitio real. Es un flag de build-time: el build estático solo contiene la rama activa en el momento de correr `pnpm build`.

## Business Context

**Client:** Montenegro
**Full name:** Administración Montenegro
**Industry:** Property management and real estate (Argentina)
**Tagline:** "Gestión que proyecta"
**Nav tagline:** "Administración de consorcios · Inmobiliaria"

Montenegro is a single brand with two service arms operating under a shared management philosophy: clarity, follow-through, and criterion.

### Two service areas

**1. Administración de consorcios**
Building/strata management. Core message: "Cada peso, explicado."
- Expensas claras — información comprensible y ordenada
- Seguimiento — consultas y gestiones con responsables definidos
- Proveedores y mantenimiento — coordinación de servicios y necesidades del edificio
- Asambleas y documentación — organización de la información y acompañamiento formal
- Cambio de administrador — proceso en 4 pasos: Diagnóstico → Propuesta → Traspaso → Inicio

**2. Montenegro Inmobiliaria**
Real estate. Core message: "Conocer más para decidir mejor."
- Alquiler
- Venta
- Tasación

### Key copy (verbatim from site)

- Hero title: "Gestión que proyecta."
- Hero body: "Administramos consorcios y acompañamos decisiones inmobiliarias con información clara, seguimiento, experiencia y criterio."
- Philosophy: "Gestionar el presente. Proyectar lo que viene. / Claridad para gestionar. / Información para decidir. / Experiencia para proyectar."
- Brand statement: "Hay decisiones que resuelven el presente. Y hay decisiones que también construyen lo que viene. Conocer, ordenar, anticipar y decidir con criterio. Esa es la idea detrás de una gestión que proyecta."
- Two areas headline: "Una marca. Dos áreas. Una misma forma de trabajar."
- Two areas body: "Montenegro reúne Administración de consorcios e Inmobiliaria bajo una lógica común de gestión: claridad, seguimiento y criterio."
- Admin description: "Claridad para gestionar. Criterio para decidir. Una administración que ordena, informa y acompaña las decisiones del consorcio con seguimiento y responsabilidad."
- Admin card: "Cada peso, explicado. Expensas que se entienden, gastos respaldados y una gestión que hace visible qué pasa, por qué y cómo se resuelve."
- Inmobiliaria card: "Conocer más para decidir mejor. Alquiler, venta y tasación con acompañamiento profesional y una experiencia simple en cada etapa."
- Cambio de admin: "Más simple de lo que parece. Un proceso ordenado para cambiar de gestión sin perder continuidad ni información."
- Contact title: "¿Hablamos?"
- Contact body: "Administración de consorcios, cambio de administrador, alquiler, venta o tasación."
- Contact CTA: "Pedir presupuesto"

### Brand voice

- Professional, precise, trustworthy — like a reliable advisor
- Warm but not casual; no jargon, clarity above all
- Confidence through specificity, never superlatives

### Home page section structure

| Component | Section ID | Background |
|---|---|---|
| `home/Hero.astro` | `#hero` | `mont-dark` |
| `home/TeSuena.astro` | `#te-suena` | `mont-off-white` |
| `home/Hacemos.astro` | `#hacemos` | `mont-blue` |
| `home/Servicios.astro` | `#servicios` | white |
| `home/Inmobiliaria.astro` | `#inmobiliaria` | `mont-off-white` |
| `home/Diferenciales.astro` | `#diferenciales` | `mont-dark` |
| `home/Somos.astro` | `#somos` | `mont-off-white` |
| `home/Contacto.astro` | `#contacto` | `mont-dark` |

### Color palette (Tailwind tokens with `mont-` prefix)

| Token | Hex | Usage |
|---|---|---|
| `mont-dark` | `#1E1816` | Primary text on light backgrounds; dark buttons/badges |
| `mont-blue` | `#00577F` | Hero philosophy box, Contacto section background; accent labels |
| `mont-cream` | `#E2D9CF` | Primary text on dark/blue backgrounds |
| `mont-sand` | `#D3C9C2` | Secondary/muted text on dark/blue backgrounds; decorative blur elements; subtle borders |
| `mont-off-white` | `#F7F7F5` | Light section backgrounds (Hero, About, property cards) |
| `mont-dark-muted` | `#6B6763` | Secondary/muted text on light backgrounds — solid, no opacity |

Tokens defined in `src/styles/global.css` via `@theme { --color-mont-*: ... }`. Use as `bg-mont-dark`, `text-mont-cream`, `border-mont-sand`, etc.

### Typography

- **Serif (Playfair Display):** Headlines, section titles, pull quotes, italic accents
- **Sans (Source Sans):** Body text, labels, UI elements, descriptions

### Target audience

- Consorcio owners and residents — looking for reliable management
- Building administrators considering switching management companies
- Property buyers, sellers, and renters

### Visual design direction

- **Section rhythm (alternating for impact):** Dark → Cream → Blue → White → Cream → Dark → Cream → Dark
- Large serif headlines, tight tracking, generous whitespace
- GSAP: SplitText word reveals, fade+blur entrances, scrub-based exits
- Warmth through cream/warm dark tones — no cold pure whites or blues
- No eyebrows/kickers above headlines (no small uppercase label naming the section before the title/quote) — see the no-eyebrows rule under Conventions
- No opacity modifiers on text colors — see the solid-color-tokens rule under Conventions
