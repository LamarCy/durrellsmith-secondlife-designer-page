# Second Life Software — Durrell Smith Portfolio

## Original Problem Statement
User shared two videos (a NomadaToast / Emergent portfolio screen recording and a selfie video of Durrell Smith) and asked for a portfolio landing page in that cinematic, editorial, generative-art style — but customized for **Durrell Smith, Designer at Second Life Software**.

## User Choices Provided
- Name / brand: **Durrell Smith, designer for Second Life Software**
- Hero treatment: **selfie photo with creative WebGL distortion**
- Sections: **only the Work / projects showcase** (defaults filled in for nav, hero, subscribe-placeholder, footer)
- Subscribe: **visual placeholder only** (no backend write)
- Color palette: **lighter — desert, pastel, red family**

## Architecture
- **Frontend**: React 19 + CRA + Tailwind. No backend changes required (subscribe is a visual placeholder).
- **3D / Visual**: Vanilla Three.js inside `useEffect` (R3F's JSX intrinsics collide with the Emergent visual-edits Babel plugin, so we mount the renderer imperatively). Custom GLSL shader builds a 200×200 point cloud, samples a still frame from Durrell's selfie video, displaces each particle by brightness + noise + mouse pull + scroll scatter, and color-ramps it through cocoa → terracotta → cream.
- **Selfie still**: extracted from `IMG_1155.MOV` via ffmpeg to `/app/frontend/public/img/durrell.jpg`.

## Implemented (2026-06-03)
- Sticky glass top nav with logo, bracketed hover nav links, Subscribe CTA.
- Hero: full-viewport WebGL particle portrait of Durrell + editorial headline ("Designing / content that / connects."), top-left and top-right mono meta (portfolio #, geo coords), name + role block, scroll cue.
- Selected Work bento grid (6 projects, asymmetric 8/4/4/6/6/12 col layout) — warm/desert imagery, hover zoom, mono meta, serif overlay titles.
- Subscribe placeholder section with massive serif "So much info." headline and a visual-only email field (no DB write).
- Footer with huge "second life software." watermark, 4-column meta grid, "Made by Second Life Software using Emergent." attribution.
- Floating glass Heart counter (terracotta heart, click increments + burst animation).
- Desert/pastel/red palette: sand `#F1E6D1` bg, ink `#2A1810`, rust `#C4432C`, rose `#E8A094` — replacing the reference's monochrome grey.
- Typography: Cormorant Garamond (editorial serif) + JetBrains Mono (mono accents) + Manrope (body).
- SVG grain overlay + radial pastel-rose/clay gradients for warmth.

## Backlog / Not Built (per user scope)
- P1 — Stats section ("Over one million curious people")
- P1 — Topics editorial list
- P1 — About section
- P2 — Wire Subscribe form to a backend `/api/subscribe` MongoDB endpoint (currently placeholder)
- P2 — Individual project case-study pages
- P2 — Lenis smooth scroll + scroll-pinned text reveals

## Next Action Items
- Get user feedback on hero/work treatment.
- If they want more sections, build out stats/topics/about as next iteration.
