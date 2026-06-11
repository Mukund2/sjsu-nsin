# SJSU NSIN — Creative Direction

**Concept: GOLDEN HOUR.** Silicon Valley was born at golden hour — Moffett Field,
Lockheed Sunnyvale, jets over the Pacific at dusk. NSIN at SJSU calls students
back to that work. Every visual decision on this site derives from California
evening light. If a choice can't be justified by this sentence, don't make it.

This is not a clone of any reference site. It applies the grammar that separates
agency-built sites from templates (researched June 2026; see tasks/lessons.md):
poster-scale fluid type, two warm neutrals + scarce accent, per-section theme
flips, one choreographed signature sequence, one motion grammar, photography
graded to a single curve, editorial asymmetry, specific copy.

## 1. Color — light as architecture

| Token | Value | Role |
|---|---|---|
| `--color-ink` | `#232020` | warm char — dark ground |
| `--color-ink-deep` | `#1B1918` | shadows, hover-darken |
| `--color-paper` | `#F2EDE3` | fog paper — light ground |
| `--color-paper-dim` | `#E5DECF` | paper hover/secondary surface |
| `--color-gold` | `#C9A958` | aerospace brass. THE accent. |
| (no CSS gradients) | — | golden-hour light comes from PHOTOGRAPHS, never from naked CSS gradients. Scrims for text legibility only. |

Rules: accents are ink or section floods, never button decoration. At most one
gold-flooded element per page. Sections bleed into each other through gradient
seams, never hard cuts. Domain accents (steel/sea/ember/olive in
`src/data/domains.ts`) exist only inside their domain's context. Film grain
overlays everything at low opacity — it is the material that makes flat color
and photography one substance.

## 2. Typography — the artwork

Three voices, already in the stack — Instrument Serif (display), Geist (text),
JetBrains Mono (data labels). No new fonts. No italics as decoration.

Fluid scale (8 steps, clamp-based). THE RULE: as size grows, line-height and
tracking tighten. Display ≈ 0.96 lh / −0.035em; body 1.55 lh / normal.

- `t-display` clamp(3rem → 8.5rem) — one per page, the poster moment
- `t-h1` clamp(2.6rem → 5.25rem)
- `t-h2` clamp(2rem → 3.75rem)
- `t-h3` clamp(1.5rem → 2.25rem)
- `t-lede` clamp(1.2rem → 1.625rem) — standfirst paragraphs
- `t-body` ~1.0625–1.175rem, max-width 65ch always
- `t-caption` 0.9375rem
- `t-label` 0.8125rem mono uppercase — only when it carries information

`text-wrap: balance` on headlines. Body never exceeds 65ch.

## 3. Imagery — one cinematographer

All photography passes through one golden-hour grade (tools/grade-images.mjs):
lifted warm blacks, gently compressed highlights, desaturated ~15%, warmed.
Sources, in order of preference: US gov public-domain archives (DVIDS, NARA,
NASA) → Midjourney with the locked style prompt below → never stock, never
borrowed copyrighted work.

Midjourney style lock (append to every prompt):
"golden hour California light, low sun, warm haze, cinematic 35mm photograph,
muted color grade, lifted blacks, film grain, no text --ar 16:9 --style raw"

Diagrams and data graphics are drawn, not imported: hairline SVG strokes
(1px paper or ink), mono labels, no fills except gold for the single datum that
matters.

## 4. Motion — one grammar

Stack: Lenis (scroll interpolation only — native scroll mapping, no hijack) +
GSAP ScrollTrigger/SplitText. Respect `prefers-reduced-motion` always.

- Entrances: line-mask reveals (SplitText lines), `power4.out`, 0.9s, 0.06 stagger
- Wipes (domain selector): clip-path inset, `expo.inOut`, 0.85s
- Hover: buttons scale to 0.975 (shrink, never grow), 125ms
- Scroll-driven sections: `ease: none` (scrub), pinned beats get ~120vh each
- One signature sequence per page. Never animate the frequent path.

## 5. Layout — composed, not gridded

Per-section composition. Text blocks are asymmetric: cards/columns take ~60–75%
width and anchor bottom-left, leaving deliberate emptiness. Display headlines
may go full-bleed. Sticky mono section markers in margins. Spacing scale on a
1.5rem gutter with xl sections (~6–7.5rem block padding) and deliberate
irregularity — one section per page gets extra air. Square corners on
structure; hairline rules (1px, 50% alpha) are the only ornament.

## 6. Voice

Specific over grand. Name real places, real years, real companies, real
problems. One claim per sentence. No "innovative solutions," no "empowering."
Sentence case everywhere except mono labels. The reader is a smart, skeptical
20-year-old who hates being marketed to.

## 7. Performance is part of the aesthetic

LCP < 1.5s, CLS < 0.05, 60fps or the effect gets cut. Images ≤ 600KB,
lazy-loaded below the fold. The site must feel engineered by the same people
the copy claims we are.
