# ToolPilot — Coding Standards & Conventions

**Version:** 1.0.0  
**Scope:** All source code in /src  
**Enforced by:** ESLint + Prettier + TypeScript Strict Mode  
**Date:** 2026-07-08

---

## 1. TypeScript Standards

### 1.1 Strict Mode (Required)

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 1.2 Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Variables | camelCase | `userName`, `toolCount` |
| Constants | SCREAMING_SNAKE | `MAX_HISTORY_ITEMS` |
| Functions | camelCase | `calculateEMI()` |
| React Components | PascalCase | `ToolCard`, `EMICalculator` |
| Interfaces | PascalCase with I prefix (optional) | `ToolConfig`, `EMIResult` |
| Types | PascalCase | `ThemeMode`, `ModuleKey` |
| Enums | PascalCase | `ModuleEnum` |
| Files (Components) | PascalCase | `ToolCard.tsx` |
| Files (Utils) | camelCase | `formatCurrency.ts` |
| Files (Hooks) | camelCase with `use` prefix | `useToolHistory.ts` |
| Files (Stores) | camelCase | `themeStore.ts` |
| CSS Classes | kebab-case | `tool-card`, `nav-item` |

### 1.3 Type vs Interface

```typescript
// Use `type` for unions, intersections, primitives
type ThemeMode = 'light' | 'dark';
type ToolId = string;
type ModuleColors = Record<ModuleKey, string>;

// Use `interface` for object shapes that may be extended
interface ToolConfig {
  id: string;
  name: string;
  description: string;
  module: ModuleKey;
  slug: string;
  icon: string;
  tags: string[];
}

// Extend interfaces, not types
interface EMIToolConfig extends ToolConfig {
  hasAmortization: boolean;
}
```

### 1.4 Forbidden Patterns

```typescript
// ❌ NEVER use `any`
const data: any = {};

// ✅ Use `unknown` instead, then narrow
const data: unknown = {};
if (typeof data === 'object' && data !== null) { ... }

// ❌ NEVER use non-null assertion without comment
const el = document.getElementById('app')!;

// ✅ Guard or use assertion with explanation
const el = document.getElementById('app');
if (!el) throw new Error('Root element not found');

// ❌ NEVER use `var`
var count = 0;

// ✅ Use `const` by default, `let` only when reassignment needed
const count = 0;
```

---

## 2. React Standards

### 2.1 Component Structure

Every component file follows this exact order:

```typescript
// 1. External library imports
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// 2. Internal imports (absolute paths via tsconfig paths)
import { Button } from '@/components/ui/Button';
import { useToolHistory } from '@/hooks/useToolHistory';
import { formatCurrency } from '@/utils/formatters';

// 3. Types / Interfaces
interface Props {
  toolId: string;
  onResult?: (result: EMIResult) => void;
}

// 4. Constants
const MAX_PRINCIPAL = 100_000_000;

// 5. Component
export function EMICalculator({ toolId, onResult }: Props): JSX.Element {
  // 5a. State
  const [principal, setPrincipal] = useState<number>(0);
  
  // 5b. Derived state / computed values
  const monthlyEMI = calculateEMI(principal, rate, tenure);
  
  // 5c. Effects
  useEffect(() => { ... }, []);
  
  // 5d. Handlers
  const handleCalculate = useCallback(() => { ... }, []);
  
  // 5e. Render helpers (if needed, keep small)
  const renderAmortizationTable = () => { ... };
  
  // 5f. JSX
  return (
    <div>...</div>
  );
}

// 6. Default export (if needed for lazy loading)
export default EMICalculator;
```

### 2.2 Component Rules

- **Always** use named exports for components
- **Always** add default export for lazy-loaded route components
- **Never** use class components
- **Always** use functional components with hooks
- **Never** use `React.FC<Props>` — use explicit return type
- **Always** destructure props in function signature
- **Always** use `useCallback` for event handlers in expensive components
- **Always** use `useMemo` for expensive computed values

### 2.3 Hook Rules

```typescript
// Hooks MUST:
// 1. Start with `use`
// 2. Only be called at top level
// 3. Return stable references (use useMemo/useCallback)
// 4. Document their purpose with JSDoc

/**
 * Manages tool calculation history in LocalStorage.
 * @param toolId - Unique identifier for the tool
 * @param maxItems - Maximum history entries to retain (default: 10)
 */
export function useToolHistory(toolId: string, maxItems = 10) {
  // ...
}
```

### 2.4 State Management Rules

```typescript
// ✅ Local state for component-specific data
const [isOpen, setIsOpen] = useState(false);

// ✅ Zustand for global/cross-component state
const theme = useThemeStore(state => state.theme);

// ✅ React Hook Form for form state
const { register, handleSubmit } = useForm<FormValues>();

// ❌ Never lift state unnecessarily to global stores
// ❌ Never use Redux (not in our stack)
// ❌ Never use Context for high-frequency updates
```

---

## 3. File & Folder Standards

### 3.1 Folder Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/
│   ├── ui/          # Atomic UI components (Button, Input, Card...)
│   ├── layout/      # Layout components (Header, Footer, Sidebar)
│   ├── features/    # Feature-specific components
│   └── shared/      # Shared business components
├── hooks/           # Custom React hooks
├── pages/           # Route page components
│   ├── home/
│   ├── modules/
│   └── tools/
├── stores/          # Zustand stores
├── utils/           # Pure utility functions
├── types/           # TypeScript types and interfaces
├── constants/       # App-wide constants
├── config/          # Tool registry, module config
├── lib/             # Third-party library wrappers
├── styles/          # Global CSS, Tailwind config
└── test/            # Test utilities
```

### 3.2 Index Files

```typescript
// ✅ Every folder with multiple exports has an index.ts
// components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';

// Usage
import { Button, Input, Card } from '@/components/ui';
```

### 3.3 Path Aliases

```typescript
// tsconfig.json paths
{
  "@/*": ["./src/*"],
  "@/components/*": ["./src/components/*"],
  "@/hooks/*": ["./src/hooks/*"],
  "@/stores/*": ["./src/stores/*"],
  "@/utils/*": ["./src/utils/*"],
  "@/types/*": ["./src/types/*"],
  "@/config/*": ["./src/config/*"],
  "@/constants/*": ["./src/constants/*"]
}
```

---

## 4. CSS / Tailwind Standards

### 4.1 Class Organization Order

```tsx
// Order: Position → Display → Sizing → Spacing → Typography → Visual → Animation → State
<div className="
  relative           // position
  flex items-center  // display
  w-full max-w-md    // sizing
  p-4 gap-3          // spacing
  text-sm font-medium text-gray-900  // typography
  bg-white rounded-xl border border-gray-200 shadow-sm  // visual
  transition-all duration-200  // animation
  hover:shadow-md hover:border-gray-300  // state
  dark:bg-gray-800 dark:border-gray-700 dark:text-white  // dark mode
">
```

### 4.2 Custom Classes

```css
/* Only create custom classes when Tailwind utilities are insufficient */
/* Use @layer components for custom component styles */
@layer components {
  .tool-card {
    @apply relative flex flex-col gap-4 p-5 bg-white rounded-xl border border-gray-200 
           shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md
           dark:bg-gray-800 dark:border-gray-700;
  }
}
```

### 4.3 Dark Mode

- Use `dark:` prefix for all dark mode variants
- Never hardcode dark mode colors — use CSS variables via `dark:` prefix
- Dark mode toggled by `data-theme="dark"` on `<html>` element

---

## 5. Performance Standards

### 5.1 Code Splitting

```typescript
// ✅ Always lazy-load route components
const EMICalculator = lazy(() => import('@/pages/tools/finance/EMICalculator'));

// ✅ Always lazy-load heavy libraries
const { jsPDF } = await import('jspdf');

// ✅ Dynamic imports for conditionally used features
const pdfWorker = await import('pdfjs-dist/build/pdf.worker');
```

### 5.2 Bundle Budget

| Chunk | Max Size (gzipped) |
|-------|--------------------|
| Initial (main) | 80 KB |
| Per-route chunk | 40 KB |
| Vendor (react, etc.) | 50 KB |
| Total initial JS | 150 KB |

### 5.3 Image Standards

- Always use `width` and `height` attributes
- Always use `loading="lazy"` except above-the-fold
- Prefer WEBP format with JPG fallback
- Use `srcset` for responsive images
- Always include `alt` text

---

## 6. Accessibility Standards

```tsx
// ✅ All interactive elements must be keyboard accessible
<button 
  onClick={handleCopy}
  onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
  aria-label="Copy result to clipboard"
  aria-live="polite"
>
  Copy
</button>

// ✅ All form inputs must have labels
<label htmlFor="principal-input">Principal Amount (₹)</label>
<input 
  id="principal-input"
  aria-describedby="principal-error"
  aria-invalid={!!errors.principal}
/>
{errors.principal && (
  <span id="principal-error" role="alert">{errors.principal.message}</span>
)}

// ✅ Decorative icons must be hidden from screen readers
<Icon aria-hidden="true" />

// ✅ Meaningful icons need aria-label on parent
<button aria-label="Favorite this tool">
  <HeartIcon aria-hidden="true" />
</button>
```

---

## 7. SEO Standards

```tsx
// ✅ Every page must use HelmetProvider
// ✅ Every tool page must have unique title and description
// ✅ JSON-LD must be injected via react-helmet-async

function EMICalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "EMI Calculator",
    "description": "Calculate your monthly loan EMI instantly...",
    "url": "https://toolpilot.app/finance/emi-calculator",
    "applicationCategory": "FinanceApplication",
  };

  return (
    <>
      <Helmet>
        <title>EMI Calculator - Calculate Monthly Loan EMI | ToolPilot</title>
        <meta name="description" content="Free EMI calculator..." />
        <meta property="og:title" content="EMI Calculator | ToolPilot" />
        <link rel="canonical" href="https://toolpilot.app/finance/emi-calculator" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <EMICalculator />
    </>
  );
}
```

---

## 8. Testing Standards

### 8.1 File Naming

```
Component.test.tsx      # Unit tests for components
useHook.test.ts         # Unit tests for hooks
util.test.ts            # Unit tests for utilities
feature.integration.test.tsx  # Integration tests
feature.e2e.spec.ts     # Playwright E2E tests
```

### 8.2 Test Structure (AAA Pattern)

```typescript
describe('calculateEMI', () => {
  it('should calculate correct monthly EMI for standard loan', () => {
    // Arrange
    const principal = 1_000_000;
    const rate = 8.5;
    const tenure = 60;

    // Act
    const result = calculateEMI(principal, rate, tenure);

    // Assert
    expect(result.monthlyEMI).toBeCloseTo(20_517, 0);
    expect(result.totalInterest).toBeGreaterThan(0);
  });
});
```

### 8.3 Coverage Requirements

| Type | Minimum Coverage |
|------|-----------------|
| Utilities | 95% |
| Hooks | 85% |
| Components | 80% |
| Stores | 90% |
| E2E (critical paths) | Top 20 tools |

---

## 9. Git Standards

### 9.1 Branch Naming

```
main          # Production branch
develop       # Integration branch
feature/F01-emi-calculator     # Feature branches
fix/nav-mobile-overflow        # Bug fix branches
docs/prd-finance-module        # Documentation branches
perf/bundle-size-reduction     # Performance branches
```

### 9.2 Commit Messages (Conventional Commits)

```
feat(finance): add EMI calculator with amortization table
fix(nav): correct mobile overflow on small screens
docs(prd): update V1 tool list with backlog items
perf(image): lazy load all tool card images
test(emi): add unit tests for edge cases
chore(deps): upgrade framer-motion to v11
style(button): apply consistent focus ring across all variants
refactor(theme): migrate to CSS custom properties
a11y(form): add aria-describedby to all validation errors
seo(emi): add JSON-LD structured data for WebApplication
```

---

## 10. Code Review Checklist

Before every PR merge:

- [ ] TypeScript: 0 errors, 0 warnings
- [ ] ESLint: 0 errors, 0 warnings  
- [ ] Prettier: All files formatted
- [ ] Tests: All passing, coverage maintained
- [ ] Accessibility: No axe violations
- [ ] Performance: Bundle size within budget
- [ ] SEO: Proper title, description, JSON-LD
- [ ] Responsive: Tested at 375px, 768px, 1280px
- [ ] Dark Mode: Tested both themes
- [ ] Documentation: Updated if API changed

---

*Standards maintained by: Engineering Architecture Team*  
*Last Updated: 2026-07-08*
