# GGP Redesign — Design Document

**Date:** 2026-03-21
**Author:** lmherrera0 + Claude
**Status:** Approved

## Problem

The current GGP page (Next.js static export) is monolithic — users report not knowing how to use it. It mixes "what it does" with "how to configure it" with "research" in a single scroll. It also fails BVVG v3 compliance: wrong fonts (system fonts instead of Noto), wrong palette (burgundy `#4C2632` instead of V5 Japandi), and no shared design system with the rest of the site.

## Decision

**Approach C — Recruiter Template System**: Rewrite GGP as a single HTML file (like the Recruiter page), extract shared CSS into `shared/brand.css`, and refactor the Recruiter to import it. Both pages share the same BVVG-compliant design system with zero build step.

## Architecture

### File Structure

```
lmherrera.github.io/
├── shared/
│   └── brand.css              # V5 Japandi palette, Noto fonts, semantic mappings,
│                              # shadow system, radius, page-level tab system,
│                              # chrome mocks (M365 + ChatGPT), sample output
│                              # components, feedback form, nav, footer,
│                              # responsive @media 700px
│
├── recruiter/
│   └── index.html             # Refactored: <link href="../shared/brand.css">
│   └── scoring-rubric.txt     # + local <style> for recruiter-specific CSS only
│
├── ggp/
│   └── index.html             # NEW single HTML with 4 tabs
│   └── downloads/             # Existing PDFs/zips preserved
│   └── robots.txt             # Preserved
│   └── sitemap.xml            # Preserved
```

### What Goes in `brand.css` (extracted from Recruiter)

- CSS variables: 8 V5 Japandi colours + semantic mappings (--canvas, --text-primary, etc.)
- Platform variable zones: `--cs-*` (M365), `--gpt-*` (ChatGPT)
- Google Fonts import: Noto Serif Display + Noto Sans + Noto Sans Mono
- Base reset + body styles
- Shadow system: --shadow-sm/md/lg (warm mahogany-tinted)
- --radius: 12px
- `.site-nav`, `.nav-back` — minimal navigation
- `.hero`, `.hero-tag`, `.hero-desc` — hero section
- `.setup-guide`, `.guide-step` — 3-step onboarding
- `.platform-btn`, `.platform-selector` — platform toggle
- `.cs-chrome`, `.cs-topbar`, `.cs-tabs`, `.cs-tab` — M365 chrome mock
- `.gpt-chrome`, `.gpt-topbar`, `.gpt-tabs`, `.gpt-tab` — ChatGPT chrome mock
- `.config-section`, `.section-num`, `.section-location` — numbered sections
- `.field-textarea`, `.copy-btn`, `.expand-btn` — interactive fields (M365 variant)
- `.gpt-textarea`, `.gpt-copy-btn`, `.gpt-expand-btn` — interactive fields (GPT variant)
- `.gpt-file-card`, `.gpt-download-btn` — knowledge file + download
- `.gpt-capabilities`, `.gpt-toggle` — capability toggles
- `.sample-output`, `.sample-table`, `.sample-chart` — sample output components
- `.tier-badge`, `.shortlist-card` — tier badges and cards
- `.feedback-section`, `.fb-form`, `.fb-field`, `.fb-submit` — feedback form
- `.site-footer` — footer
- `@media (max-width: 700px)` — responsive breakpoint

### What Stays as Local CSS

**Recruiter local:**
- Prompt card grid (`.prompts-grid`, `.prompt-card`)
- Character counter badges (`.char-badge`)
- Recruiter-specific textarea sizes

**GGP local:**
- Verification marker badges (5 colours: green, red, yellow, orange, warning)
- Source tier cards (Gold, Solid, Decent, Caution)
- Feature summary compact cards
- Sample output specific to GGP (verification table, inline markers, Devil's Advocate bar)
- Claude Projects chrome mock (new — `.claude-chrome`, `--claude-*` variables)
- Google Gems chrome mock (new — `.gem-chrome`, `--gem-*` variables)

## GGP Page Design — 4 Tabs

### Tab 1: "What It Does"

Content flow (top to bottom):

1. **Hero** — title, tagline "AI sounds confident. But confidence is not accuracy.", version badge
2. **The Problem** — 3 compact failure cards (Embarrassing / Career-limiting / Potentially illegal)
3. **Workflow Phases** — 3-column grid (reuses `.workflow-phases` pattern from Recruiter):
   - Phase 01 Load Rules: 8 non-negotiable rules, source tier hierarchy, fast/deep mode
   - Phase 02 Configure: channel template selection, conditional modules
   - Phase 03 Validate: information audit with markers, Devil's Advocate gate, 8/8 required
4. **5 Verification Markers** — visual flag cards with colour coding
5. **Features Summary** — compact single-line cards: "8 risk dimensions, 22 channels, 7 analysis templates, bias detection, data integrity, anti-fatigue"
6. **Sample Output** — LinkedIn post scenario:
   - Header: "Sample Output" badge + "Illustrative — fictional LinkedIn post, real GGP format"
   - Verification table: Claim | Marker | Source | Tier (4-5 rows showing mix of CONFIRMED, GAP, INFERENCE, UNVERIFIED, RISK)
   - Final verified post with inline markers
   - Devil's Advocate score bar (visual, like Recruiter's chart bars)

### Tab 2: "Configure"

Content flow:

1. **Setup Guide** — 3-step onboarding (reuses `.setup-guide`):
   - 01 Choose your platform
   - 02 Copy each field below
   - 03 Upload knowledge files and test
2. **Platform Selector** — 4 buttons: Claude Projects | ChatGPT | M365 Copilot | Google Gems
3. **Chrome Mock per platform** — each with numbered sections:

   **Claude Projects mock:**
   - 01 Project Name → "Grounded Gate Protocol" [Copy]
   - 02 Project Instructions → GGP core rules [Copy All] [Expand]
   - 03 Knowledge Files → file cards for each PDF + [Download] buttons
   - Hint: "Upload in Projects → Project Knowledge"

   **ChatGPT mock (dark theme):**
   - 01 Name + Description [Copy]
   - 02 Instructions (XML-structured) [Copy All] [Expand]
   - 03 Knowledge → file cards + [Download] buttons
   - 04 Capabilities toggles (Web Search ON for source verification, Code Interpreter ON)
   - 05 Conversation Starters (4 prompts: Verify a draft, Deep audit, Fast mode check, Channel template)

   **M365 Copilot mock:**
   - 01 Identity (Name + Description) [Copy]
   - 02 Instructions (plain prose format) [Copy All] [Expand]
   - 03 Starter Prompts (6 prompt cards)

   **Google Gems mock:**
   - 01 Gem Name [Copy]
   - 02 Instructions [Copy All] [Expand]
   - Hint: "Gems don't support file uploads — all rules must be in the instructions field"

### Tab 3: "Research"

Content flow:

1. Paper title, author, DOI badge (linked to Zenodo)
2. Abstract (2 paragraphs)
3. Five-component architecture (compact cards)
4. Theoretical foundations (Bovens, Coady, Lackey — brief)
5. Core principle quote: "Verification is a workflow property, not a model property."
6. [Download GGP-About.pdf] button

### Tab 4: "Feedback"

Identical to Recruiter feedback form (from `brand.css`), with:
- Hidden `_subject`: "GGP — Website Feedback"
- Platform dropdown: Claude, ChatGPT, M365 Copilot, Google Gems, Other
- Same Formspree endpoint or separate one

## Sample Output Content — LinkedIn Post Scenario

**Scenario:** A professional drafts a LinkedIn post about enterprise AI adoption. GGP verifies it before publishing.

**Original draft claims (fictional):**
1. "The enterprise AI market reached $184.0 billion in 2025" — CONFIRMED (Gartner, Tier 1)
2. "70% of Fortune 500 companies have deployed AI at scale" — UNVERIFIED (industry blog, Tier 3)
3. "AI will replace 40% of knowledge work within 3 years" — INFERENCE (extrapolation, no direct source)
4. "Our team increased efficiency by 3x using AI tools" — GAP (no supporting data provided)
5. "McKinsey projects $4.4 trillion in annual AI value" — CONFIRMED (McKinsey Global Institute, Tier 2)

**Devil's Advocate dimensions (sample scores):**
- Hostile Reader: 2/3
- Screenshot Test: 3/3
- CEO Test: 2/3
- Regulatory: 3/3
- Competitor: 2/3
- Legal: 3/3
- Reputation: 2/3
- Data Integrity: 2/3
- **Total: 19/24 — PASS**

**Verified output:** The post with problematic claims either removed, flagged, or rewritten with proper sourcing.

## BVVG Compliance

The redesigned GGP will pass all 16 BVVG checkpoints:

| # | Check | Status |
|---|-------|--------|
| 1 | Handle: lmherrera0 / Liz Magaly Herrera | Via brand.css footer |
| 2 | Colours: V5 Japandi only | Via brand.css variables |
| 3 | Fonts: Noto trio | Via brand.css import |
| 4 | Voice: 2/4 pillars + anti-consultancy | Content review |
| 5 | White space >= 20%, WCAG AA | Via brand.css spacing + contrast |
| 6 | Symbol: infinity yes, number 8 never | Content review |
| 7 | Tagline: "Clarity infinity Decisions infinity Impact" | Via brand.css footer |
| 8 | Track: Business Applicant | Narrative alignment |
| 9 | SEO keywords | Meta tags + content |
| 10 | Evidence contribution | Academic section + portfolio |
| 11 | GGP verified | Self-referential — the page IS GGP |
| 12 | Light/dark mode | Light mode default, dark in GPT mock |
| 13 | Anti-consultancy | No "consultant" as primary identity |
| 14 | Accessibility: WCAG AA | Inherited from brand.css patterns |
| 15 | Format: British English, Oxford comma | Content review |
| 16 | Audience tier | Primary (tech professionals) |

## SEO Preservation

- Keep existing `robots.txt` and `sitemap.xml`
- Migrate meta tags from Next.js `<head>` to new HTML `<head>`
- Add structured data (JSON-LD) for the academic paper
- Maintain the same URL structure (`/ggp/` → `index.html`)

## Out of Scope

- Internationalisation (ES toggle) — future enhancement
- Dark mode toggle for the page itself — only dark theme in GPT chrome mock
- Next.js source project cleanup — separate task
