# Design QA — Página de materiais desbloqueados

## Source visual truth

- Selected visual direction: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/selected-direction.png`
- Content/reference capture: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/source-desktop.jpg`
- Mobile content/reference capture: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/source-mobile.jpg`
- Comparison input: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/qa-comparison-hero-fit.png`

## Implementation evidence

- Local URL: `http://localhost:4174/Pos/registro-e-documentacao/registro-e-documentacao-materiais/materiais.html`
- Desktop screenshot: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/local-browser-hero-fit.jpg`
- Mobile screenshot: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/local-mobile-header-shorter.jpg`
- Desktop fit viewport: 1280 × 720 CSS px; captured viewport: 1265 × 712 px; device density: 1. An additional wide check was performed at 1440 × 1024 px.
- Mobile viewport: 390 × 844 CSS px; captured viewport: 375 × 812 px; device density: 1. The browser content width was checked at 390 px.
- Source visual target: 864 × 1821 px. The side-by-side comparison was normalized to 650 px per column in the comparison input.
- State: no filtering controls, all eight aulas visible, reduced heading scale, clear compact header adapted from the supplied reference, professor image anchored to the hero base, three lesson cards per row on desktop, each lesson card fully clickable, desktop hero height constrained for viewport fit, images loaded, page at the top.

## Comparison

The refined rendered page keeps the target direction's editorial hierarchy while improving the content journey: the hero states the access status and the next action, the library has a clear point of entry, and the final sections continue the learning journey. The header follows the supplied reference with a clean white surface, compact Phorte logo, discreet institutional navigation (Pós-graduação, Cursos gratuitos, Para empresas, Sobre a Phorte, Conteúdos), and a light outlined “Entrar” action. The header, hero, and indicators share the same light page canvas, so the top of the page reads as one continuous composition instead of a dark interruption. The professor portrait is now rendered at the full height of the art panel and aligns to its bottom edge, removing the floating gap visible in the supplied screenshot. The heading scale was reduced to improve proportion and scanability while preserving the hierarchy. The desktop hero is now constrained to 560 px, so the first viewport reaches the light proof strip instead of letting the tall portrait determine the page height; the mobile hero remains fluid. The aula library now presents up to three cards per row on desktop, with each card implemented as one semantic link so the thumbnail, copy, and CTA all activate the same lesson destination. The implementation uses the real Phorte logo, the available Cristiano Alcântara photography, and the eight real YouTube thumbnails from the briefing. The content is intentionally adapted to the source materials page rather than using generated placeholder imagery.

Focused regions were inspected in the hero, aula-card grid, recommendation block, and bonus cards. No additional crop was required because these regions are readable in the full desktop capture and were separately inspected in the mobile capture.

## Required fidelity surfaces

- Fonts and typography: Poppins is loaded as the sole page font for body copy, headings, controls, navigation, and metadata; wrapping and hierarchy remain readable at both tested viewports.
- Spacing and layout rhythm: the page uses a centered max-width, consistent card gaps, generous section breaks, and a single-column mobile flow without horizontal overflow.
- Colors and tokens: ink, warm paper, Phorte red, and violet accents remain consistent across the clear header, hero, light indicators, CTA, cards, and footer surfaces; the supplied reference informed header proportion and hierarchy while the Phorte palette remains the source of truth.
- Image quality and asset fidelity: real local brand assets and local YouTube thumbnails are used; no visible logo, portrait, or course art is replaced by CSS art or inline SVG approximations. Lazy-loaded assets were scrolled into view and rechecked before capture.
- Copy and content: briefing copy and all eight source lesson descriptions are present; external lesson and course links point to the supplied destinations.
- Interaction and accessibility: semantic headings, keyboard-reachable links, alt text, skip link, and visible focus styles are present. Section navigation, full-card aula links, course links, responsive header behavior, and the absence of filtering controls were verified.

## Findings

- No actionable P0, P1, or P2 findings remain.
- P3 follow-up: add optional duration/level metadata only if those fields become available in the content model; the briefing does not supply reliable values for them.

## Comparison history

1. Initial desktop capture showed offscreen lazy images blank in a full-page capture. This was a capture-state issue, not a product rendering issue. The page was scrolled through, assets were confirmed loaded, and the desktop/mobile captures were recaptured from the top.
2. Editorial refinement pass: clarified the hero promise, shortened and corrected lesson copy, added title/topic search, improved result feedback, strengthened next-step messaging, and aligned tokens to the Phorte system.
3. User-directed refinement pass: removed title/topic search and its supporting empty state, consolidated all page typography to Poppins, added an institutional utility line, aligned header and hero containers, and added an active navigation cue.
4. User-directed filtering removal pass: removed the filter toolbar, filter-related attributes, dynamic script, and unused filtering styles; tightened the library-to-grid spacing.
5. User-directed heading-scale pass: reduced H1/H2/H3 sizes across desktop and mobile to prevent oversized typography from dominating the content.
6. Post-fix evidence: `local-desktop-headings-smaller.jpg`, `local-mobile-headings-smaller.jpg`, and `qa-comparison-headings-smaller.png`; no P0/P1/P2 visual drift was found.
7. User-directed Bling-structure pass: replaced the detached utility/header treatment with a single dark band, Phorte brand capsule, compact materials pill, white rounded navigation capsule, and red CTA; the mobile breakpoint kept only the essential brand and CTA.
8. User-directed reference-header pass: replaced the dark Bling-like treatment with the supplied compact white header, small institutional navigation, and outlined “Entrar” button; removed the active underline to match the reference's quieter navigation treatment.
9. Post-fix evidence: `local-desktop-header-reference.jpg`, `local-mobile-header-reference.jpg`, and `qa-comparison-header-reference.png`; all local assets loaded, no filter controls or script remained, and no P0/P1/P2 visual drift was found.
10. User-directed surface pass: changed the black indicators strip to the same light page background, updated the metric text to ink/muted tokens, and changed mobile dividers to the shared border token; desktop and mobile checks reported no overflow.
11. User-directed header cleanup: removed the header background, bottom border, and blur treatment so the header no longer reads as a separate box; the navigation remains intact and aligned with the page container.
12. User-directed hero image pass: removed the desktop/mobile image max-height constraint so the professor image fills the art panel and its bottom edge aligns with the panel base; measured gap is 0 px at 1440 × 1024 and 390 × 844.
13. User-directed aula-grid pass: changed the desktop library from four to three cards per row, retained two columns at tablet and one at mobile, and converted each lesson card into one full-card YouTube link; the rendered grid was checked against the supplied four-column reference.
14. User-directed header-height pass: reduced the header inner height from 74 px to 64 px on desktop and from 68 px to 60 px on mobile, with a smaller mobile logo inset; both breakpoints retain aligned navigation, CTA, and hero spacing without overflow.
15. User-directed viewport-fit pass: constrained the desktop hero panel to 560 px (with mobile override returning to natural height), reduced desktop hero copy padding to keep all content inside the panel, and verified at 1280 × 720 that the proof strip begins at y=642 while the professor image remains bottom-aligned; no horizontal overflow or console warnings were found.

## Second page — inscrição e desbloqueio

- Source visual/reference capture: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/source-signup-desktop.jpg`
- Mobile source/reference capture: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/source-signup-mobile.jpg`
- Comparison input: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/qa-comparison-signup.png`
- Local URL: `http://localhost:4174/Pos/registro-e-documentacao/registro-e-documentacao-inscricao/inscricao.html`
- Desktop evidence: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/local-signup-desktop.jpg`
- Mobile evidence: `C:/Users/Marcelo.vignola/Desktop/Git Projects/lp-phorte/output/registro-redesign/local-signup-mobile.jpg`

The second page adapts the original signup journey to the approved materials identity: compact Phorte header, Poppins throughout, warm light canvas, red conversion actions, violet editorial accents, and the real local Cristiano Alcântara assets. The first viewport combines the promise, four concrete content benefits, and the form in one scan-friendly composition. The supporting sections answer why the subject matters and who conducts the cycle before repeating the CTA.

The form now uses the official RD Station embed supplied for this campaign, preserving the configured lead fields for name, phone, e-mail, education level, interest, and communication consent. Its generated controls are restyled into the Phorte card with Poppins, compact spacing, labelled fields, the country selector aligned beside the phone input, violet choice treatment, and a red conversion button. A valid submission sets the local completion state and redirects to `../registro-e-documentacao-materiais/materiais.html`, the local materials page that completes the journey.

The desktop check at 1440 × 1024 keeps the hero panel within the first viewport without horizontal overflow. The mobile check at 390 × 844 collapses the hero into a single column, keeps the CTA reachable, and preserves readable field sizing. All local images loaded successfully and the full page was inspected through the context, instructor, final CTA, and footer sections.

16. User-requested signup-page pass: created the second local page from the original reference, connected the form to the materials page, added responsive editorial sections, validated valid-submit redirection, and captured a reference/prototype comparison; no actionable P0, P1, or P2 findings remain.
17. User-supplied RD Station embed pass: replaced the prototype form with the official RD Station form, restyled its generated fields and button to the Phorte system, aligned the phone country selector, preserved required lead fields, and verified that an incomplete submission stays on the page while a completed submission redirects to the local materials page.
18. User-directed navbar surface pass: changed the shared sticky header from transparent to an opaque Phorte surface with a subtle border and shadow, re-enabled sticky behavior on the signup page, and checked both pages while scrolled at 1440 × 1024 with no content overlap or horizontal overflow.

## Implementation checklist

- [x] Desktop composition checked against the selected visual direction.
- [x] Mobile composition checked at 390 × 844.
- [x] Section navigation and link destinations checked.
- [x] Console checked: no warnings or errors returned.
- [x] No horizontal overflow detected at the tested breakpoint.

final result: passed
