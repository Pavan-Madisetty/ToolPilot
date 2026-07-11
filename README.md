# ToolPilot — Browser-Based Productivity Platform

> **The world's largest browser-based productivity platform with 100+ free tools.**

[![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-blue?logo=github)](https://toolskyt.com)
[![Lighthouse](https://img.shields.io/badge/lighthouse-95%2B-green?logo=lighthouse)](https://toolskyt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

---

## 🚀 About

ToolPilot is an enterprise-grade, browser-based productivity platform offering 100+ free tools across 14+ modules including Finance, Developer, PDF, Image, Text, AI Writing, Business, Productivity, Education, Travel, Health, and more.

**Key highlights:**
- 🌐 **100% Browser-based** — No backend, no database, no hosting costs
- ⚡ **Blazing Fast** — Lighthouse score > 95 across all categories
- 📱 **Mobile First** — Pixel-perfect at every screen size
- 🔒 **Privacy First** — No user data ever leaves your browser
- ♿ **WCAG 2.1 AA** — Fully accessible to everyone
- 🔍 **SEO Optimized** — Every tool has unique, indexed pages
- 📲 **PWA Ready** — Install and use offline

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + TypeScript (Strict) |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| State | Zustand |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Heroicons + Lucide React |
| Charts | Chart.js + React Chart.js 2 |
| PWA | Vite PWA Plugin + Workbox |
| Testing | Vitest + Testing Library + Playwright |
| CI/CD | GitHub Actions |
| Deploy | GitHub Pages |

---

## 📦 Project Structure

```
ToolPilot/
├── .github/            # GitHub Actions workflows
├── docs/               # All documentation
├── design-system/      # Design system specification
├── architecture/       # Architecture documentation
├── specifications/     # Per-module specifications
├── prompts/            # AI prompts for tool generation
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/         # Atomic UI components
│   │   ├── layout/     # Layout components
│   │   ├── features/   # Feature-specific components
│   │   └── shared/
│   ├── config/         # Tool registry & module config
│   ├── constants/
│   ├── hooks/
│   ├── pages/
│   ├── stores/
│   ├── styles/
│   ├── types/
│   └── utils/
└── tests/
```

---

## 🏃 Getting Started

```bash
git clone https://github.com/Pavan-Madisetty/ToolPilot.git
cd toolpilot
npm install
npm run dev
```

### Scripts

```bash
npm run dev          # Dev server (port 3000)
npm run build        # Production build
npm run preview      # Preview build
npm run test         # Unit tests
npm run test:cov     # Coverage report
npm run test:e2e     # Playwright E2E
npm run lint         # ESLint
npm run format       # Prettier
npm run type-check   # TypeScript check
```

---

## 📋 Iterations

| # | Focus | Status |
|---|-------|--------|
| 1 | Repository, Architecture, Design System | ✅ |
| 2 | Homepage, Navigation, Search, Theme | ✅ |
| 3-13 | All Product Modules (101+ Core Tools) | ✅ |
| 14-18 | SEO Audit, Performance Optimization, A11y Verification, CI/CD Deploy | ✅ |

---

## 📄 License

MIT © ToolPilot Team
