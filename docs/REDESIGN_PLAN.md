# ToolPilot — UI/UX Redesign Plan & Handoff

> **Purpose:** Self-contained execution plan for turning ToolPilot into a visually
> consistent, premium SaaS product. Written so any developer or AI coding tool can
> pick it up with **zero prior context**. Based on a full design audit of the
> `main` branch.
>
> **Golden rule:** _Enforce the system that already exists — don't reinvent it._
> The design tokens in `src/index.css` and the `ToolPageWrapper` are good. Almost
> every problem is **inconsistent adoption**, not a missing foundation.

---

## 0. Context you need before touching anything

**Stack:** React 19 · Vite 8 · Tailwind CSS v4 · Framer Motion · Zustand · react-router v7 · react-helmet-async · Chart.js. Icons: **Lucide is the chosen standard** (migrate away from `@heroicons/react`).

**Key files (single sources of truth):**
| Concern | File |
|---|---|
| Design tokens, all component CSS classes | `src/index.css` |
| Tool catalog + derived maps + counts | `src/config/tools.ts` |
| Module catalog + color maps | `src/config/modules.ts` |
| Universal tool page shell (SEO, header, FAQ, related) | `src/components/shared/ToolPageWrapper.tsx` |
| Universal module page shell (SEO) | `src/components/shared/ModulePageWrapper.tsx` |
| Shared UI primitives | `src/components/ui/*` (barrel: `index.ts`) |
| App chrome | `src/components/layout/{Header,Footer,AppLayout}.tsx` |

**Design tokens already defined in `src/index.css`** (use these, never hardcode):
- Color: `--primary`, `--primary-hover`, `--success/warning/danger/info`, `--text-primary/secondary/tertiary/disabled/inverse/link`, `--bg-base/surface/elevated/overlay`, `--border-subtle/default/strong/focus`.
- Spacing (8px grid): `--space-4/8/12/16/20/24/32/40/48/64/80/96`.
- Radius: `--radius-sm/md/lg/xl/2xl/full`. Shadows: `--shadow-sm/md/lg/xl`.
- Typography utility classes: `.text-h1/h2/h3/h4`, `.text-body-large`, `.text-body`, `.text-caption`, `.text-small`, `.text-label`.
- Module color helper: `getModuleColors(key)` in `modules.ts` → `{accent, bg, border}`.

**Themes:** `[data-theme="light|dark"]` + a `[data-design="minimal"]` mode that flattens radius/shadow. **Anything using inline `style={{}}` with hardcoded hex bypasses both themes** — that's the core anti-pattern to eliminate.

**Verification gate (run after every phase — all must pass):**
```bash
npm run type-check      # tsc --noEmit
npm run lint            # eslint . --max-warnings 0
npm run build           # tsc -b + vite build + sitemap
npm test                # vitest (40 tests today)
```
Also manually check: light theme, dark theme, and mobile width for every page you touch.

---

## ✅ Phase 0 — DONE (baseline restored)

Already completed on `main` (uncommitted at time of writing). For reference:
- Added missing CSS classes that were rendering unstyled: `.feature-card`, `.features-grid`,
  `.cta-banner__inner`, `.tools-grid--compact`, `.section__header--center`,
  `.workspace-tab__emoji/__name`, `.module-card__emoji`, `.faq-question`, `.faq-answer`,
  plus a reusable `.empty-state`.
- Deleted dead `src/App.css` (Vite boilerplate, imported nowhere).
- Honest counts: `IMPLEMENTED_TOOL_IDS` allowlist (50 real tools) →
  `LIVE_TOOL_COUNT`, `TOOL_COUNT_LABEL` ("50+"), `isComingSoon()`. Replaced all "500+" copy.
- `noindex` for placeholder tools (via `ToolPageWrapper`) + excluded them from the sitemap.
- Shared `src/components/shared/ComingSoon.tsx` replaces 17 duplicated stub bodies.
- Removed duplicate `<main id="main-content">` in HomePage; fixed `theme-color` to `#6366F1`.

---

## Phase 1 — Design-system hardening (foundation)

**Goal:** Every reusable pattern has exactly one home. Nothing visibly changes yet;
this unblocks Phases 3–4.

### 1.1 Add missing primitives (in `src/components/ui/`, export from `index.ts`)
Create these as token-driven components (CSS classes in `index.css`, not inline hex):

- **`Card`** — wraps the existing `.card` class. Props: `as?`, `padding?: 'sm'|'md'|'lg'`, `interactive?: boolean`, `className`. Replaces the ~35 bespoke bordered divs.
- **`Section`** + **`SectionHeader`** — wraps `.section`, `.section__header`, `.section__title`, `.section__subtitle`, `.section__view-all`. Props: `title`, `subtitle?`, `icon?`, `viewAllHref?`, `center?`.
- **`Textarea`** — mirror of `Input.tsx` API (`label`, `error`, `helperText`) using `textarea.input-base`. There is **no shared textarea today** and 16 files hand-roll `<textarea className="input-base">`.
- **`ResultBox`** — one component for `.result-box`/`.result-label`/`.result-value`. **Merge `StatCard` into this** (StatCard is currently 100% inline styles → can't be themed by minimal mode). Props: `label`, `value`, `prefix?`, `suffix?`, `highlight?`.
- **`EmptyState`** — wraps the new `.empty-state` classes. Used by `ComingSoon`, SearchPage "no results", etc.
- **`Badge`** — wraps `.badge` + `.module-badge-*`. Props: `variant`, `module?`.
- **`Callout`** — the Tips / Examples boxes currently hand-built inside `ToolPageWrapper` (the amber "Pro Tips" and indigo "Examples" panels). Props: `tone: 'tip'|'info'|'example'`, `title`, `icon`.
- **`Accordion`/`FAQ`** — extract the FAQ accordion logic (currently inline in `ToolPageWrapper.tsx` lines ~440–491).
- **`Tabs`** — extract the `.workspace-tabs` pattern from `HomePage.tsx` (also reusable for module pages).

### 1.2 Kill duplication
- **Two `ToolCard`s exist.** Delete the private one inside `src/components/shared/RelatedTools.tsx` and make it use `src/components/ui/ToolCard.tsx`.
- **`getToolEmoji` is duplicated** verbatim in `ui/ToolCard.tsx` and `shared/RelatedTools.tsx`. Extract to `src/utils/toolIcons.ts` (single export).
- Migrate `StatCard` and `Breadcrumb` off inline styles onto CSS classes (both are ~100% inline `style={{}}` today).

### 1.3 Icon unification → Lucide
- Standardize on `lucide-react` (already a dependency; matches the Linear/Vercel aesthetic).
- Migrate the 28 files importing `@heroicons/react` to Lucide equivalents (e.g. `MagnifyingGlassIcon`→`Search`, `XMarkIcon`→`X`, `HeartIcon`→`Heart`, `ChevronDownIcon`→`ChevronDown`, `ArrowDownTrayIcon`→`Download`, `Bars3Icon`→`Menu`, `SunIcon`/`MoonIcon`→`Sun`/`Moon`).
- **Decision to confirm:** the per-tool "icon" on `ToolCard` currently maps Heroicon-name strings → emoji. Either keep colorful emoji (playful) or map to Lucide glyphs tinted with `getModuleColors().accent` (more premium/consistent). Recommend the latter for a SaaS feel — but this is a visual-identity call.
- Enforce one stroke width (Lucide default 2) everywhere.
- After migration, remove `@heroicons/react` from `package.json`.

### 1.4 Acceptance criteria
- `grep -rn "@heroicons" src` → **0 results**.
- No component in `src/components/` contains a hardcoded hex color or a hardcoded Tailwind palette class (`bg-slate-*`, `text-red-*`, etc.) — all via tokens/`getModuleColors`.
- `src/components/ui/index.ts` exports: Card, Section, SectionHeader, Textarea, ResultBox, EmptyState, Badge, Callout, Accordion, Tabs (plus existing).
- Verification gate passes.

---

## Phase 2 — Global chrome (highest visibility)

**Goal:** Header, footer, and both search surfaces feel premium and behave correctly.

### 2.1 Header (`src/components/layout/Header.tsx`)
- Replace inline `style={{}}` blobs with token classes.
- Fix the **tablet dead zone (768–1024px):** currently shows both the full search field *and* a hamburger whose drawer only contains "Favorites." Decide one nav model across breakpoints; the drawer should carry real module navigation (map over `MODULES`), not just a single link.
- Keep: sticky, 64px height, ⌘K, blur background, scroll shadow (these are good).
- Favorites heart links to `/#favorites` which only exists when you have favorites — make it degrade gracefully (e.g. route to `/search` or a dedicated favorites view, or hide when empty).

### 2.2 Footer (`src/components/layout/Footer.tsx`)
- **Newsletter input + "Join" button have no handler** — either wire to a real endpoint or remove until one exists (don't ship fake capability).
- **Social links point to bare `twitter.com`/`github.com`** — set real URLs or remove.
- Some footer links (`/about`, `/blog`, `/privacy`, `/terms`, `/contact`) have **no routes** — create stub pages or remove the links (dead links hurt trust + SEO).
- Convert to token classes; align columns on the 8px grid (Vercel/Stripe density).

### 2.3 Search
- **SearchPage (`src/pages/search/SearchPage.tsx`) has NO search input** — you land on `/search`, see "Search Tools," and can only filter by category/trending chips. **Add a real text input** bound to the `q` query param.
- Reuse the fuzzy `performSearch` already in that file; consider sharing logic with the ⌘K `SearchDialog` (the dialog is genuinely good — keyboard nav, recent searches — keep it).
- Empty state → use the new `EmptyState` primitive.

### 2.4 Acceptance criteria
- No dead links in header/footer. No non-functional form controls.
- SearchPage has a working text input synced to the URL.
- Header works cleanly at 375px / 768px / 1024px / 1440px.
- Verification gate passes.

---

## Phase 3 — Module pages (normalize all 14)

**Goal:** All module pages use one structure and pull color from config.

**Current problems (from audit):**
- 4 structural patterns: flat grid / categorized+FAQ / coming-soon / hand-rolled.
- `TravelModule.tsx` and `UtilitiesModule.tsx` **skip `ModulePageWrapper`** → lose JSON-LD, canonical, OG/Twitter tags. **Fix: wrap them.**
- Module header colors **contradict `modules.ts` config in ~10 of 14 modules** (e.g. Text config=cyan but page renders amber; Image config=amber but page renders red; Health=green vs rose). **Fix: drive all color from `getModuleColors(key)` — delete per-page `iconColorClass`/`accentBgColor` literals.**
- Title suffixes inconsistent ("X Tools" vs "X Module" vs "AI Writing"). **Standardize to "{name} Tools".**
- `moduleName` prop diverges from config `name` (Conversion passes "Conversion" vs config "Converters"; PDF passes "PDF" vs "PDF Tools"). **Read from config.**
- Page icon imports differ from config `icon` field. **Pick one; recommend deriving from config.**
- `toolCount` in `modules.ts` is hand-maintained and wrong (finance=35 but far fewer exist). **Drive live counts from `TOOLS_BY_MODULE[key].length`; either fix or delete the static field.**
- There is **no `CalculatorsModule.tsx`** though `calculators` is in the config (14 modules, 13 pages). Decide: build it, or remove `calculators` from `MODULES`.

**Target structure (one template):**
```
<ModulePageWrapper moduleKey moduleName={config.name} description>
  <ModuleHeader ...colors from getModuleColors(key)... toolCount={live} />
  {categories.map(cat => <Section title={cat.title}><ToolsGrid tools={cat.tools}/></Section>)}
  {faq && <FAQ items={faq} />}   // optional, via Phase 1 Accordion
</ModulePageWrapper>
```
Keep per-module category buckets (Finance/Developer already do this well) but express them as data, not hardcoded JSX blocks.

### 3.1 Acceptance criteria
- All module pages use `ModulePageWrapper` (grep confirms none hand-roll `<Helmet>`).
- `ModuleHeader` colors match `getModuleColors(key)` for every module.
- Live tool counts everywhere; no stale `toolCount`.
- Verification gate passes; JSON-LD present on all module pages (view source).

---

## Phase 4 — Tool page bodies (the big one, folder by folder)

**Goal:** All 50 implemented tool pages share one visual language: `tool-layout` +
shared primitives + tokens + 8px spacing. Do it **one folder at a time** and run the
gate + a visual check after each folder.

**Current state (audit):**
- Consistency is **per-folder, not global.** Finance (~24 pages) is the reference-conformant cluster. Image (9), Developer (13), Text (4) each invented their own conventions.
- Layout: 3 `tool-layout` variants + 14 pages using bespoke containers.
- Result display 3-way split: 19 `.result-box`, 4 `StatCard`, 31 bespoke.
- ~40 pages hardcode Tailwind color classes; image tools use `bg-slate-*` throughout.
- Spacing drift: image folder standardized on `p-5`; finance on `p-6`; developer/text scatter `gap-2/3/4`.

**Recommended order (easiest → hardest):**
1. **Finance** (mostly conformant) — just unify result display: convert the 4 `StatCard` users (`GSTCalculator`, `CompoundInterestCalculator`, `TipCalculator`, + `developer/TimestampConverter`) to the merged `ResultBox`; token-ize Chart.js colors where sensible; fix `LoanComparison.tsx` (the finance outlier: 37 hardcoded Tailwind colors, `p-5`).
2. **Text** (4 files) — small, gets a repeatable pattern locked in. `TextDiff.tsx` imports no shared UI at all → adopt primitives.
3. **Developer** (13 files) — token-ize `ColorPicker` (17 hardcoded colors + 5 hex), `DiffChecker`, `JwtDecoder`, `HashGenerator`; migrate `space-y-*`/`flex` containers to `tool-layout` where appropriate.
4. **Image** (9 files, biggest lift) — the whole folder is a separate design language: no `tool-layout`, no shared UI, no `.card`, `bg-slate-*` everywhere, `p-5`. Migrate to `tool-layout` + `Card` + tokens + shared file-upload dropzone (extract a shared `Dropzone` primitive — every image tool reinvents it).

**Per-file checklist (apply to each tool page):**
- [ ] Top-level container is `tool-layout` (or the documented 2-col variant for editors).
- [ ] Inputs use shared `Slider`/`Input`/`Select`/`Switch`/`Textarea`/`Button` — no raw `<select>`/`<button>`.
- [ ] Results use `ResultBox`.
- [ ] Panels use `Card`.
- [ ] Zero hardcoded hex / Tailwind palette classes — colors via tokens or `getModuleColors`. (Chart.js dataset arrays are the one allowed exception; pull from a shared `chartColors` util.)
- [ ] Spacing on the 8px scale: `p-4/6/8`, `gap-2/4/6`. No `p-5`, `gap-3`, `gap-5`.
- [ ] Works in light + dark + mobile.

### 4.1 Acceptance criteria
- `grep -rn "bg-slate-\|text-slate-\|bg-indigo-\|#[0-9a-fA-F]\{6\}" src/pages/tools` → only allowed Chart.js color utils remain.
- No raw `<select>`/`<button className>` in tool pages (grep).
- Verification gate passes.

---

## Phase 5 — QA & consistency sweep

- **Theme pass:** click through every page in light, dark, and `[data-design="minimal"]`.
- **Responsive pass:** 375 / 768 / 1024 / 1440 px — no overflow, clipping, or wrap bugs.
- **A11y pass:** keyboard-only nav, visible focus (already have `:focus-visible`), screen-reader labels, WCAG AA contrast (verify token pairs, esp. `--text-tertiary` on `--bg-surface`).
- **Perf:** confirm no unused CSS shipped; Lighthouse ≥ 95 (a stated product claim).
- **Consistency lint:** consider an ESLint rule / CI grep to fail builds on hardcoded hex or `@heroicons` imports so drift can't return.
- **Config cleanup:** remove the unused `ModuleKey` values with no module (`lifestyle`, `generators`, `data`, `browser`) or build them; `NEW_TOOLS` filter is always empty (no tool sets `isNew`) — set flags or drop it.

---

## Analytics / config loose ends (do before public launch)
- `index.html` ships placeholder analytics IDs: `G-XXXXXXXXXX` (GA4) and `clarity...xxxxxxxxxx`. Replace with real IDs or remove.
- `Input.tsx` / `Select.tsx` generate ids with `Math.random()` → SSR/hydration mismatch risk. Switch to React `useId()`.

---

## Suggested branch / commit strategy
- One branch per phase: `redesign/phase-1-primitives`, `redesign/phase-2-chrome`, etc.
- Within Phase 4, one commit per tool folder so regressions are bisectable.
- Run the full verification gate before every commit.

## Definition of done (whole project)
Open any two pages side by side — same spacing, same card, same button, same icon
stroke, same type scale, same color language. If one page looks different from
another, it's not done.
