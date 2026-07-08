# Architecture Documentation

**Project:** ToolPilot  
**Version:** 1.0.0  
**Date:** 2026-07-08  
**Status:** Approved  
**Author:** Technical Architecture Team

---

## 1. Executive Summary
ToolPilot is designed as a browser-first, zero-backend, client-side productivity suite compiled via Vite, bundled with React and TypeScript, and hosted on GitHub Pages. This document outlines the structural, routing, data, performance, and SEO architecture patterns required to support 500+ independent tools.

---

## 2. Architectural Principles

1. **Browser-First Computing:** All calculation logic, file parsing, code formatting, and transformations occur on the client side. No data is sent to external servers.
2. **Offline-First Resilience:** Leverage service workers via Workbox to cache critical assets, pages, and dependencies, enabling offline accessibility.
3. **Strict Route Code-Splitting:** All tool modules and page layouts are lazy-loaded dynamically to maintain a tiny initial bundle footprint (< 150KB gzipped).
4. **State Isolation:** Global application state is managed cleanly using Zustand stores (theme, favorites, search, navigation), while individual tool calculations rely on local React state.
5. **SEO-Native Content Delivery:** Inject semantic headers, unique descriptions, sitemaps, and JSON-LD structured data on all pages for search engine indexability.

---

## 3. Technology Stack Rationale

| Layer | Selected Tech | Rationale |
|---|---|---|
| **Core Framework** | React 19 + TypeScript | Standard component model, robust ecosystem, strict compile-time safety. |
| **Build & Bundler** | Vite 6 | Rapid hot module replacement (HMR), tree-shaking, and code-splitting capabilities. |
| **Style System** | Tailwind CSS v4 | Utility-first compilation resulting in highly efficient CSS footprint, consistent design system. |
| **Routing** | React Router v7 | Seamless declarative client-side routing, query parameter synchronization, lazy loading. |
| **Global State** | Zustand | Lightweight store model, avoids context re-renders, out-of-the-box local storage persistence. |
| **Forms & Validation**| React Hook Form + Zod | Uncontrolled inputs for UI performance, declarative schema-based validation. |
| **Client PWA** | Vite PWA Plugin | Automated service worker building, asset pre-caching, and desktop/mobile installation support. |

---

## 4. Application Structure

```
ToolPilot/
├── src/
│   ├── components/
│   │   ├── ui/         # Base UI components (Buttons, Inputs, Cards, etc.)
│   │   ├── layout/     # Structural shell components (Header, Footer, MainLayout)
│   │   └── features/   # Common search, toast, modal overlays
│   ├── config/         # Central tool registrations and category structures
│   ├── stores/         # Zustand global stores (themeStore, userStore, uiStore)
│   ├── pages/          # Lazy-loaded page controllers and layout groups
│   ├── utils/          # Standalone formatting and calculation helpers
│   ├── types/          # Core TypeScript interfaces and type mappings
│   ├── index.css       # Design tokens and tailwind imports
│   ├── main.tsx        # React mounting and theme initialization
│   └── App.tsx         # Route registry and top-level providers
```

---

## 5. Routing Architecture
We implement declarative client-side routing using `react-router-dom`. The routing definition in [App.tsx](file:///Users/Pavan.Madisetty/Pavan/Projects/ToolPilot/src/App.tsx) splits routes into three key categories:
- **Global Routes:** Homepage `/`, Search `/search`, and Fallback `*`.
- **Category Modules:** Module hubs (e.g. `/finance`, `/developer`).
- **Tool Sandbox Pages:** Specific URL paths mapping directly to a single tool (e.g., `/finance/emi-calculator`).

Every route is lazy-loaded:
```typescript
const EMICalculator = lazy(() => import('@/pages/tools/finance/EMICalculator'));
```

---

## 6. Data & Persistence Architecture
ToolPilot uses standard browser persistence mechanisms, managed inside Zustand stores to ensure synchronization with the React lifecycle.

```
┌────────────────────────────────────────────────────────┐
│                      Zustand Store                     │
├────────────────────────────────────────────────────────┤
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │     Theme Store       │   │      User Store      │  │
│  │   (themeStore.ts)     │   │    (userStore.ts)    │  │
│  └──────────┬────────────┘   └──────────┬───────────┘  │
│             │                           │              │
│             ▼                           ▼              │
│     LocalStorage                LocalStorage           │
│  (toolpilot_theme)          (toolpilot_favorites)      │
│                             (toolpilot_recently_used)  │
└────────────────────────────────────────────────────────┘
```

- **LocalStorage Schema:**
  - `toolpilot_theme`: Theme state (`"light" | "dark"`).
  - `toolpilot_favorites`: List of favorite tool IDs.
  - `toolpilot_recently_used`: History stack of recently visited tools (maximum 20).
  - `toolpilot_tool_history_[tool_id]`: Up to 5 past calculations for a specific tool.

---

## 7. Build and Deployment Pipeline
The application deployment is fully automated via GitHub Actions, building the application and pushing compiled assets to GitHub Pages.

```
┌──────────────┐      ┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│  git push    ├─────►│ Lint & Type ├─────►│ Build Vite  ├─────►│ deploy-pages │
│  to main     │      │ Verification│      │ Production  │      │ (GH Pages)   │
└──────────────┘      └─────────────┘      └─────────────┘      └──────────────┘
```

1. **Lint & Verification:** Verifies types using `tsc --noEmit` and checks code guidelines using `eslint`.
2. **Build Optimization:** Vite bundles assets, groups vendor code into chunks, minifies with esbuild, and outputs static assets to the `/dist` directory.
3. **Deployment:** The build artifact is uploaded and deployed to GitHub Pages securely using Actions tokens.
