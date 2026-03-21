# GGP Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the GGP page as a single HTML file with 4 tabs (What It Does, Configure, Research, Feedback), extract shared CSS from the Recruiter into `shared/brand.css`, and refactor the Recruiter to import it.

**Architecture:** Extract the Recruiter's BVVG-compliant CSS (V5 Japandi palette, Noto fonts, chrome mocks, interactive components) into `shared/brand.css`. Build GGP as a new `index.html` that imports this shared CSS plus local styles for GGP-specific components. Refactor the Recruiter to also import `shared/brand.css` and keep only its unique styles inline.

**Tech Stack:** HTML, CSS (custom properties), vanilla JavaScript, Google Fonts (Noto trio)

**Design Doc:** `docs/plans/2026-03-21-ggp-redesign-design.md`

**Reference:** The Recruiter page at `recruiter/index.html` is the source of truth for all shared components.

---

## Task 1: Create `shared/brand.css` — Core Design Tokens

**Files:**
- Create: `shared/brand.css`
- Reference: `recruiter/index.html` (lines 12–60 for variables, lines 1–11 for font imports)

**Step 1: Create the shared CSS file with design tokens**

Extract from `recruiter/index.html` into `shared/brand.css`:

```css
/* === shared/brand.css === */
/* BVVG v3 Compliant Design System — lmherrera0 */
/* Source of truth for V5 Japandi palette, Noto fonts, and shared components */

@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@400;500;600&family=Noto+Sans:wght@300;400;500;600&family=Noto+Sans+Mono:wght@400;500&display=swap');

:root {
    /* Core palette — V5 Japandi (8 colours, no pure black/white) */
    --ivory: #F5F1ED;
    --wine: #6B4C47;
    --pearl: #E8DFD5;
    --mahogany: #5C3D35;
    --almond: #D4C4B9;
    --rose-clay: #C5847B;
    --terracotta: #B8785F;
    --sage: #7A9B8E;

    /* Semantic mappings — Light Mode */
    --canvas: var(--ivory);
    --text-primary: var(--wine);
    --text-heading: var(--mahogany);
    --text-secondary: var(--wine);
    --accent-decorative: var(--terracotta);
    --accent-interactive: var(--sage);
    --surface: var(--pearl);
    --border: var(--pearl);
    --btn-bg: var(--wine);
    --btn-text: var(--ivory);
    --btn-hover: var(--rose-clay);

    /* Shadows — warm, no pure black */
    --shadow-sm: 0 1px 3px rgba(92,61,53,0.06);
    --shadow-md: 0 4px 16px rgba(92,61,53,0.08);
    --shadow-lg: 0 8px 32px rgba(92,61,53,0.10);

    --radius: 12px;
}
```

Also include: base reset (`*, *::before, *::after`), body styles, typography scale from the Recruiter.

**Step 2: Add platform variable zones**

Extract `--cs-*` (M365) and `--gpt-*` (ChatGPT) variable blocks from the Recruiter.

**Step 3: Commit**

```bash
git add shared/brand.css
git commit -m "feat(shared): create brand.css with V5 Japandi design tokens"
```

---

## Task 2: Add Shared Components to `brand.css` — Layout & Navigation

**Files:**
- Modify: `shared/brand.css`
- Reference: `recruiter/index.html` (CSS for `.site-nav`, `.hero`, `.setup-guide`, `.site-footer`)

**Step 1: Extract navigation component**

Copy `.site-nav`, `.nav-back` styles from Recruiter.

**Step 2: Extract hero component**

Copy `.hero`, `.hero-tag`, `.hero-desc` styles.

**Step 3: Extract setup guide component**

Copy `.setup-guide`, `.guide-inner`, `.guide-step`, `.step-num` styles.

**Step 4: Extract footer component**

Copy `.site-footer`, `.handle` styles.

**Step 5: Commit**

```bash
git add shared/brand.css
git commit -m "feat(shared): add nav, hero, setup guide, footer components"
```

---

## Task 3: Add Shared Components to `brand.css` — Platform Chrome Mocks

**Files:**
- Modify: `shared/brand.css`
- Reference: `recruiter/index.html` (CSS for `.cs-chrome`, `.gpt-chrome`, `.platform-btn`)

**Step 1: Extract platform selector**

Copy `.platform-selector`, `.platform-btn`, `.platform-btn--active`, `.platform-sub` styles.

**Step 2: Extract M365 chrome mock**

Copy all `.cs-*` styles: `.cs-chrome`, `.cs-topbar`, `.cs-breadcrumb`, `.cs-tabs`, `.cs-tab`, `.cs-tab--active`.

**Step 3: Extract ChatGPT chrome mock**

Copy all `.gpt-*` styles: `.gpt-chrome`, `.gpt-topbar`, `.gpt-breadcrumb`, `.gpt-tabs`, `.gpt-tab`, `.gpt-content`, `.gpt-section`, `.gpt-field`, `.gpt-textarea`, `.gpt-copy-btn`, `.gpt-expand-btn`, `.gpt-file-card`, `.gpt-download-btn`, `.gpt-capabilities`, `.gpt-toggle`, `.gpt-prompts-grid`, `.gpt-prompt-card`.

**Step 4: Extract config section pattern**

Copy `.config-wrapper`, `.config-panel`, `.config-section`, `.section-label`, `.section-num`, `.section-location`, `.config-field`, `.field-header`, `.field-label`, `.field-textarea` (all size variants), `.copy-btn`, `.expand-btn` styles.

**Step 5: Commit**

```bash
git add shared/brand.css
git commit -m "feat(shared): add platform selector and chrome mock components"
```

---

## Task 4: Add Shared Components to `brand.css` — Sample Output & Feedback

**Files:**
- Modify: `shared/brand.css`
- Reference: `recruiter/index.html` (CSS for `.sample-output`, `.feedback-section`)

**Step 1: Extract sample output components**

Copy `.sample-output`, `.sample-output-header`, `.sample-badge`, `.sample-note`, `.sample-table-wrap`, `.sample-table`, `.tier-badge`, `.sample-chart`, `.chart-legend`, `.chart-row`, `.bar-track`, `.bar-fill`, `.sample-ranking`, `.ranking-list`, `.shortlist-section`, `.shortlist-card` styles.

**Step 2: Extract feedback form**

Copy `.feedback-section`, `.fb-form`, `.fb-field`, `.fb-label`, `.fb-input`, `.fb-select`, `.fb-textarea`, `.fb-submit`, `.fb-success`, `.fb-error`, `.fb-optional` styles.

**Step 3: Add responsive breakpoint**

Copy the `@media (max-width: 700px)` block — only the rules that apply to shared components.

**Step 4: Commit**

```bash
git add shared/brand.css
git commit -m "feat(shared): add sample output, feedback form, and responsive styles"
```

---

## Task 5: Refactor Recruiter to Import `brand.css`

**Files:**
- Modify: `recruiter/index.html`
- Reference: `shared/brand.css` (completed in Tasks 1-4)

**Step 1: Replace `<style>` block preamble with CSS import**

In the `<head>`, before the `<style>` tag, add:

```html
<link rel="stylesheet" href="../shared/brand.css">
```

Remove the `<link>` tags for Google Fonts (now in `brand.css`).

**Step 2: Remove shared CSS from inline `<style>`**

Delete from the Recruiter's `<style>` block everything that is now in `brand.css`:
- `:root` variables (all of them — palette, semantic, shadows, radius, platform zones)
- Base reset + body styles
- `.site-nav`, `.nav-back`
- `.hero`, `.hero-tag`, `.hero-desc`
- `.setup-guide`, `.guide-inner`, `.guide-step`, `.step-num`
- `.platform-selector`, `.platform-btn`
- `.cs-chrome`, `.cs-topbar`, `.cs-breadcrumb`, `.cs-tabs`, `.cs-tab`
- `.gpt-chrome` and all `.gpt-*` styles
- `.config-wrapper`, `.config-panel`, `.config-section`, `.section-label`, `.section-num`, `.section-location`
- `.config-field`, `.field-header`, `.field-label`, `.field-textarea` variants
- `.copy-btn`, `.expand-btn`
- `.sample-output` and all sample/chart/ranking/shortlist styles
- `.feedback-section` and all `.fb-*` styles
- `.site-footer`
- Shared rules from `@media (max-width: 700px)`

Keep only Recruiter-specific styles:
- `.prompts-grid`, `.prompt-card`, `.prompt-header`, `.prompt-num`, `.prompt-title`, `.prompt-expand-row`, `.prompt-expand-btn`
- `.char-badge` and character counter styles
- `.describe-panel`, `.describe-intro`, `.describe-intro-label`, `.describe-footer`, `.describe-cta`
- `.workflow-phases`, `.workflow-phase`, `.phase-tag`, `.phase-title`, `.phase-list`
- Recruiter-specific responsive overrides

**Step 3: Test locally**

Open `recruiter/index.html` in browser. Verify:
- All styles render identically to current version
- Platform switching works (M365 / ChatGPT)
- Tab switching works (Describe / Configure)
- Copy buttons work
- Expand/collapse works
- Feedback form renders correctly
- Responsive layout at 700px breakpoint works

**Step 4: Commit**

```bash
git add recruiter/index.html shared/brand.css
git commit -m "refactor(recruiter): import shared brand.css, remove duplicated styles"
```

---

## Task 6: Build GGP `index.html` — Shell + Tab 1 "What It Does"

**Files:**
- Create: `ggp/index.html` (new file — the old Next.js `index.html` will be replaced)
- Reference: `recruiter/index.html` for structural patterns
- Reference: `docs/plans/2026-03-21-ggp-redesign-design.md` for content spec

**Step 1: Create HTML shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grounded Gate Protocol — Anti-Hallucination Framework</title>
    <meta name="description" content="Open-source anti-hallucination framework for AI-generated professional communications. Visual markers, source verification, and risk screening.">
    <meta name="author" content="Liz Magaly Herrera">
    <meta name="theme-color" content="#5C3D35">
    <link rel="stylesheet" href="../shared/brand.css">
    <style>
        /* GGP-specific local styles */
    </style>
</head>
<body>
    <!-- NAV -->
    <!-- PAGE TABS: What It Does | Configure | Research | Feedback -->
    <!-- TAB 1: What It Does -->
    <!-- TAB 2: Configure -->
    <!-- TAB 3: Research -->
    <!-- TAB 4: Feedback -->
    <!-- FOOTER -->
    <script>
        /* GGP-specific JavaScript */
    </script>
</body>
</html>
```

Note: meta theme-color uses `--mahogany` (#5C3D35) instead of the old burgundy (#4C2632) to comply with V5 palette.

**Step 2: Build nav + page-level tab bar**

Reuse `.site-nav` from `brand.css`. Create page-level tab bar:

```html
<nav class="page-tabs" aria-label="Page sections">
    <button class="page-tab page-tab--active" onclick="switchPageTab('what')" id="ptab-what">What It Does</button>
    <button class="page-tab" onclick="switchPageTab('configure')" id="ptab-configure">Configure</button>
    <button class="page-tab" onclick="switchPageTab('research')" id="ptab-research">Research</button>
    <button class="page-tab" onclick="switchPageTab('feedback')" id="ptab-feedback">Feedback</button>
</nav>
```

Add `.page-tabs`, `.page-tab` styles to GGP local CSS (or to `brand.css` if generic enough).

**Step 3: Build Tab 1 — Hero**

```html
<div class="page-content page-content--active" id="page-what">
    <header class="hero">
        <span class="hero-tag">Anti-Hallucination Framework · v4.5</span>
        <h1>Grounded Gate Protocol</h1>
        <p class="hero-desc">AI sounds confident. But confidence is not accuracy. GGP ensures nothing passes unverified.</p>
    </header>
    ...
</div>
```

**Step 4: Build Tab 1 — The Problem (3 failure cards)**

3 compact cards in a grid using the `.guide-inner` 3-column pattern:

```html
<section class="problem-section">
    <div class="guide-inner">
        <div class="problem-card">
            <span class="problem-severity">Embarrassing</span>
            <p>A client email with a fabricated statistic</p>
        </div>
        <div class="problem-card">
            <span class="problem-severity problem-severity--high">Career-limiting</span>
            <p>Made-up data in a leadership presentation</p>
        </div>
        <div class="problem-card">
            <span class="problem-severity problem-severity--critical">Potentially illegal</span>
            <p>False information in a regulatory submission</p>
        </div>
    </div>
</section>
```

Add `.problem-card`, `.problem-severity` to local CSS.

**Step 5: Build Tab 1 — Workflow Phases (3-column)**

Reuse `.workflow-phases` pattern from Recruiter (or extract to `brand.css` if not already):

```html
<div class="workflow-phases">
    <div class="workflow-phase">
        <span class="phase-tag">Phase 01 · Load</span>
        <div class="phase-title">Load Rules</div>
        <ul class="phase-list">
            <li>8 non-negotiable verification rules</li>
            <li>4-tier source hierarchy (Gold to Caution)</li>
            <li>Select mode: Fast or Deep Audit</li>
        </ul>
    </div>
    <div class="workflow-phase">
        <span class="phase-tag">Phase 02 · Configure</span>
        <div class="phase-title">Channel + Conditionals</div>
        <ul class="phase-list">
            <li>Select from 22 channel templates</li>
            <li>Activate conditional modules</li>
            <li>Data analytics, style learning</li>
        </ul>
    </div>
    <div class="workflow-phase">
        <span class="phase-tag">Phase 03 · Validate</span>
        <div class="phase-title">Create + Verify + Deliver</div>
        <ul class="phase-list">
            <li>Information audit with 5 markers</li>
            <li>Devil's Advocate 8-dimension gate</li>
            <li>8/8 required for delivery</li>
        </ul>
    </div>
</div>
```

**Step 6: Build Tab 1 — 5 Verification Markers**

```html
<section class="markers-section">
    <h2>Verification Markers</h2>
    <div class="markers-grid">
        <div class="marker-card marker--confirmed">
            <span class="marker-flag">CONFIRMED</span>
            <p>Fact verified with a cited source. Tier 1-3, full citation.</p>
        </div>
        <div class="marker-card marker--gap">
            <span class="marker-flag">GAP</span>
            <p>Missing critical information requiring completion.</p>
        </div>
        <div class="marker-card marker--inference">
            <span class="marker-flag">INFERENCE</span>
            <p>Assumption declared — reasoned from confirmed facts.</p>
        </div>
        <div class="marker-card marker--unverified">
            <span class="marker-flag">UNVERIFIED</span>
            <p>Low-quality source requiring corroboration.</p>
        </div>
        <div class="marker-card marker--risk">
            <span class="marker-flag">RISK</span>
            <p>Reputational, legal, or credibility concern flagged.</p>
        </div>
    </div>
</section>
```

Add marker colour variables and `.marker-card`, `.marker-flag` styles to local CSS.

**Step 7: Build Tab 1 — Features Summary (compact)**

```html
<section class="features-summary">
    <div class="feature-chips">
        <span class="feature-chip">8 Risk Dimensions</span>
        <span class="feature-chip">22 Channel Templates</span>
        <span class="feature-chip">7 Analysis Templates</span>
        <span class="feature-chip">Bias Detection</span>
        <span class="feature-chip">Data Integrity</span>
        <span class="feature-chip">Anti-Fatigue</span>
        <span class="feature-chip">Fast + Deep Audit Modes</span>
    </div>
</section>
```

**Step 8: Build Tab 1 — Sample Output (LinkedIn Post)**

This is the centrepiece. Structure:

```html
<div class="sample-output">
    <div class="sample-output-header">
        <span class="sample-badge">Sample Output</span>
        <span class="sample-note">Illustrative — fictional LinkedIn post, real GGP format</span>
    </div>

    <!-- Verification Table -->
    <div class="sample-table-wrap">
        <table class="sample-table" aria-label="Claim verification table">
            <thead>
                <tr>
                    <th>Claim</th><th>Marker</th><th>Source</th><th>Tier</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>"Enterprise AI market reached $184bn in 2025"</td>
                    <td><span class="marker-inline marker--confirmed">CONFIRMED</span></td>
                    <td>Gartner, 2025</td>
                    <td><span class="tier-badge tier-gold">Gold</span></td>
                </tr>
                <tr>
                    <td>"70% of Fortune 500 have deployed AI at scale"</td>
                    <td><span class="marker-inline marker--unverified">UNVERIFIED</span></td>
                    <td>Industry blog</td>
                    <td><span class="tier-badge tier-caution">Caution</span></td>
                </tr>
                <tr>
                    <td>"AI will replace 40% of knowledge work within 3 years"</td>
                    <td><span class="marker-inline marker--inference">INFERENCE</span></td>
                    <td>Extrapolation</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>"Our team increased efficiency by 3x using AI tools"</td>
                    <td><span class="marker-inline marker--gap">GAP</span></td>
                    <td>No data provided</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>"McKinsey projects $4.4 trillion in annual AI value"</td>
                    <td><span class="marker-inline marker--confirmed">CONFIRMED</span></td>
                    <td>McKinsey Global Institute</td>
                    <td><span class="tier-badge tier-solid">Solid</span></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Devil's Advocate Score -->
    <div class="da-score">
        <div class="da-score-header">
            <span class="da-score-label">Devil's Advocate</span>
            <span class="da-score-value">19/24 — Pass</span>
        </div>
        <div class="da-bar-track"><div class="da-bar-fill" style="width:79%"></div></div>
        <div class="da-dimensions">
            <!-- 8 compact dimension chips with scores -->
            <span class="da-dim">Hostile Reader 2/3</span>
            <span class="da-dim">Screenshot 3/3</span>
            <span class="da-dim">CEO Test 2/3</span>
            <span class="da-dim">Regulatory 3/3</span>
            <span class="da-dim">Competitor 2/3</span>
            <span class="da-dim">Legal 3/3</span>
            <span class="da-dim">Reputation 2/3</span>
            <span class="da-dim">Data Integrity 2/3</span>
        </div>
    </div>

    <!-- Verified Output -->
    <div class="verified-output">
        <span class="verified-output-label">Verified Post</span>
        <div class="verified-post">
            <p>The enterprise AI market reached $184 billion in 2025
                <span class="marker-inline marker--confirmed">CONFIRMED · Gartner</span>,
                with McKinsey projecting $4.4 trillion in annual value creation
                <span class="marker-inline marker--confirmed">CONFIRMED · McKinsey GI</span>.
            </p>
            <p>While adoption is accelerating across the Fortune 500, specific deployment
                figures vary by source and definition
                <span class="marker-inline marker--inference">INFERENCE</span>.
                The competitive advantage lies not in AI adoption itself, but in the
                governance frameworks that ensure accuracy and accountability.
            </p>
            <p class="verified-removed"><s>"Our team increased efficiency by 3x"</s>
                — Removed: no supporting data
                <span class="marker-inline marker--gap">GAP</span>
            </p>
        </div>
    </div>
</div>
```

Add all GGP-specific sample output styles to local CSS: `.marker-inline`, `.tier-gold/solid/decent/caution`, `.da-score`, `.da-bar-track`, `.da-bar-fill`, `.da-dim`, `.verified-output`, `.verified-post`, `.verified-removed`.

**Step 9: Commit**

```bash
git add ggp/index.html
git commit -m "feat(ggp): add page shell and Tab 1 — What It Does with sample output"
```

---

## Task 7: Build GGP Tab 2 — "Configure"

**Files:**
- Modify: `ggp/index.html`
- Reference: `recruiter/index.html` for chrome mock HTML patterns
- Reference: GGP content from existing `ggp/downloads/` and current GGP page

**Step 1: Add setup guide**

Reuse `.setup-guide` with GGP-specific steps:
- 01 Choose your platform
- 02 Copy each field below
- 03 Upload knowledge files and test

**Step 2: Add platform selector (4 platforms)**

```html
<div class="platform-selector" role="group" aria-label="Select platform">
    <button class="platform-btn platform-btn--active" id="btn-claude" onclick="switchGgpPlatform('claude')">Claude Projects</button>
    <button class="platform-btn" id="btn-ggp-gpt" onclick="switchGgpPlatform('gpt')">ChatGPT</button>
    <button class="platform-btn" id="btn-ggp-m365" onclick="switchGgpPlatform('m365')">M365 Copilot</button>
    <button class="platform-btn" id="btn-gems" onclick="switchGgpPlatform('gems')">Google Gems</button>
</div>
```

**Step 3: Build Claude Projects chrome mock**

New chrome mock style (`.claude-chrome`) — light theme with Claude purple accent. Sections:
- 01 Project Name [Copy]
- 02 Project Instructions [Copy All] [Expand]
- 03 Knowledge Files — file cards for each PDF + download buttons

The instructions content should be the GGP core rules adapted for Claude Projects format.

Knowledge files section should list and link to existing downloads:
- `downloads/GGP-Core-Rules.pdf` → [Download]
- `downloads/GGP-Channel-Templates.pdf` → [Download]
- `downloads/GGP-Analysis-Templates.pdf` → [Download]
- `downloads/ggp-knowledge-base.zip` → [Download All]

Add `.claude-chrome` and `--claude-*` variables to GGP local CSS.

**Step 4: Build ChatGPT chrome mock**

Reuse `.gpt-chrome` from `brand.css`. Sections:
- 01 Name + Description [Copy]
- 02 Instructions (XML-structured, as per GPT best practices) [Copy All] [Expand]
- 03 Knowledge — file cards + download links
- 04 Capabilities (Web Search ON, Code Interpreter ON, DALL-E OFF)
- 05 Conversation Starters (4 prompts: Verify a draft, Deep audit, Fast mode, Channel template)

**Step 5: Build M365 Copilot chrome mock**

Reuse `.cs-chrome` from `brand.css`. Sections:
- 01 Identity (Name + Description) [Copy]
- 02 Instructions (plain prose) [Copy All] [Expand]
- 03 Starter Prompts (4-6 prompt cards)

**Step 6: Build Google Gems chrome mock**

New chrome mock (`.gem-chrome`) — light, clean. Sections:
- 01 Gem Name [Copy]
- 02 Instructions [Copy All] [Expand]
- Note: "Gems don't support file uploads — all rules must be in the instructions field"

Add `.gem-chrome` and `--gem-*` variables to GGP local CSS.

**Step 7: Add `switchGgpPlatform()` JavaScript**

```javascript
function switchGgpPlatform(name) {
    const platforms = ['claude', 'gpt', 'm365', 'gems'];
    platforms.forEach(p => {
        const wrapper = document.getElementById('ggp-' + p + '-wrapper');
        const btn = document.getElementById('btn-' + (p === 'gpt' ? 'ggp-gpt' : p === 'm365' ? 'ggp-m365' : p));
        if (wrapper) wrapper.style.display = (p === name) ? 'block' : 'none';
        if (btn) {
            btn.classList.toggle('platform-btn--active', p === name);
            btn.setAttribute('aria-pressed', String(p === name));
        }
    });
}
```

**Step 8: Commit**

```bash
git add ggp/index.html
git commit -m "feat(ggp): add Tab 2 — Configure with 4 platform chrome mocks"
```

---

## Task 8: Build GGP Tab 3 "Research" + Tab 4 "Feedback"

**Files:**
- Modify: `ggp/index.html`
- Reference: Current GGP page research content (via web fetch or `ggp/index.txt`)

**Step 1: Build Tab 3 — Research**

Content from existing GGP page:
- Paper title, author (L.M. Herrera), DOI badge linking to Zenodo (10.5281/zenodo.18751614)
- Abstract (2 paragraphs)
- 5-component architecture as compact cards
- Theoretical foundations (Bovens 2007, Coady 1992, Lackey 2008)
- Core principle blockquote
- Download button for GGP-About.pdf

Use `.config-section` pattern for visual consistency but without chrome mock framing.

**Step 2: Build Tab 4 — Feedback**

Reuse feedback form HTML from Recruiter, changing:
- `_subject` → "GGP — Website Feedback"
- Platform dropdown options → Claude, ChatGPT, M365 Copilot, Google Gems, Other

**Step 3: Add `switchPageTab()` JavaScript**

```javascript
function switchPageTab(name) {
    const tabs = ['what', 'configure', 'research', 'feedback'];
    tabs.forEach(t => {
        const content = document.getElementById('page-' + t);
        const tab = document.getElementById('ptab-' + t);
        if (content) content.classList.toggle('page-content--active', t === name);
        if (tab) tab.classList.toggle('page-tab--active', t === name);
    });
}
```

**Step 4: Commit**

```bash
git add ggp/index.html
git commit -m "feat(ggp): add Tab 3 Research and Tab 4 Feedback"
```

---

## Task 9: Clean Up Old Next.js Files

**Files:**
- Delete: `ggp/_next/` (entire directory — static chunks, manifests, fonts)
- Delete: `ggp/404.html` (Next.js generated)
- Delete: `ggp/.nojekyll` (Next.js specific)
- Delete: `ggp/.htaccess` (not needed for GitHub Pages)
- Delete: `ggp/index.txt` (old text version)
- Keep: `ggp/downloads/` (PDFs and markdown files)
- Keep: `ggp/robots.txt`
- Keep: `ggp/sitemap.xml`
- Keep: `ggp/ggp-knowledge-base.zip`

**Step 1: Verify new GGP page works**

Open `ggp/index.html` in browser. Check all 4 tabs, all platform chrome mocks, copy buttons, expand/collapse, feedback form, downloads.

**Step 2: Remove old Next.js build artifacts**

```bash
rm -rf ggp/_next/
rm ggp/404.html ggp/.nojekyll ggp/.htaccess ggp/index.txt
```

**Step 3: Update `sitemap.xml`**

Ensure `<lastmod>` date is updated to current date.

**Step 4: Commit**

```bash
git add -A ggp/
git commit -m "chore(ggp): remove Next.js build artifacts, keep downloads and SEO files"
```

---

## Task 10: Final Review + Visual QA

**Files:**
- Review: `shared/brand.css`, `ggp/index.html`, `recruiter/index.html`

**Step 1: Cross-browser check**

Open both pages side by side:
- `recruiter/index.html` — verify no visual regressions from refactor
- `ggp/index.html` — verify all 4 tabs work correctly

**Step 2: BVVG 16-point checkpoint**

Run through all 16 checks from the design doc against the new GGP page.

**Step 3: Responsive check**

Resize browser to 700px and below. Verify grids collapse, tabs remain accessible, chrome mocks are usable.

**Step 4: Accessibility check**

- All interactive elements have `aria-*` attributes
- Colour contrast meets WCAG AA
- Tab order is logical
- Screen reader announces tab switches

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat(ggp): complete GGP v4.5 redesign — 4 tabs, BVVG compliant, shared brand.css"
```
