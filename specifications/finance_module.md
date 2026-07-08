# Finance Module Technical Specification

**Version:** 1.0.0  
**Status:** Approved  
**Date:** 2026-07-08  
**Author:** Technical Architecture & Product Team

---

## 1. Module Overview

The Finance Module delivers high-performance, client-side financial calculations including loan schedules, investment projections, tax computations, and billing splits. All calculations run entirely locally in the browser.

---

## 2. Module Specifications (PRD/SRS)

### 2.1 Component Folder Structure
```
src/pages/tools/finance/
├── EMICalculator.tsx       # Loan EMI & Amortization
├── SIPCalculator.tsx       # Systematic Investment Plan Growth
├── GSTCalculator.tsx       # Goods & Services Tax (India)
├── TipCalculator.tsx       # Billing splits and gratuity
├── CompoundInterest.tsx    # Multi-frequency interest
└── placeholders/           # Sub-module shells (FD, Tax, etc.)
```

### 2.2 Shared State Management
All calculations rely on React local state. History and favorites are persisted in LocalStorage via the userStore:
- `toolpilot_favorites`: array of tool IDs.
- `toolpilot_recently_used`: array of recently visited tools.
- `toolpilot_tool_history_[tool_id]`: holds last 5 calculation inputs/outputs.

### 2.3 Performance & Core Web Vitals Targets
- **LCP:** < 1.5s (lazy loading and code splitting enabled).
- **CLS:** 0 (layout placeholders preserve canvas sizing).
- **Execution Time:** Calculation execution < 5ms.

---

## 3. Tool Specifications

### 3.1 EMI Calculator

#### Business Objective
Enable home, auto, and personal loan applicants to calculate monthly payments, total interest liabilities, and amortization schedules instantly.

#### Mathematical Formulas
$$\text{Monthly EMI} = \frac{P \cdot r \cdot (1 + r)^n}{(1 + r)^n - 1}$$
Where:
- $P$ = Principal loan amount
- $r$ = Monthly interest rate (Annual Rate / 12 / 100)
- $n$ = Loan tenure in months

#### Specifications Table
| Parameter | Input Type | Validation Rules | Default |
|---|---|---|---|
| **Principal ($P$)** | Numeric / Slider | $1,000$ to $100,000,000$ | $1,000,000$ |
| **Annual Rate ($R$)** | Numeric / Slider | $1.0\%$ to $36.0\%$ | $8.5\%$ |
| **Tenure ($N$)** | Numeric / Slider | $1$ to $360$ months | $120$ months |

---

### 3.2 SIP Calculator

#### Business Objective
Allow mutual fund investors to project the future value of systematic monthly investments using compound growth rates.

#### Mathematical Formulas
$$\text{Future Value} = P \cdot \frac{(1 + i)^n - 1}{i} \cdot (1 + i)$$
Where:
- $P$ = Monthly investment amount
- $i$ = Monthly interest rate (Annual Return / 12 / 100)
- $n$ = Total months (Years × 12)

#### Specifications Table
| Parameter | Input Type | Validation Rules | Default |
|---|---|---|---|
| **Monthly Amt** | Numeric / Slider | $100$ to $1,000,000$ | $5,000$ |
| **Expected Return**| Numeric / Slider | $1.0\%$ to $30.0\%$ | $12.0\%$ |
| **Tenure** | Numeric / Slider | $1$ to $40$ years | $10$ years |

---

### 3.3 GST Calculator

#### Business Objective
Calculate the tax amount and total pricing under the GST tax regime (supporting Add and Remove GST).

#### Mathematical Formulas
- **Add GST:**
  $$\text{GST Amount} = \text{Base Amount} \cdot \frac{\text{GST Rate}}{100}$$
  $$\text{Total Amount} = \text{Base Amount} + \text{GST Amount}$$
- **Remove GST:**
  $$\text{GST Amount} = \text{Total Amount} - \left( \frac{\text{Total Amount}}{1 + \frac{\text{GST Rate}}{100}} \right)$$
  $$\text{Base Amount} = \text{Total Amount} - \text{GST Amount}$$

---

### 3.4 Tip Calculator

#### Business Objective
Help groups split dining bills, calculate tips, and distribute payment shares instantly.

#### Mathematical Formulas
$$\text{Tip Amount} = \text{Bill Amount} \cdot \frac{\text{Tip } \%}{100}$$
$$\text{Total Amount} = \text{Bill Amount} + \text{Tip Amount}$$
$$\text{Share Per Person} = \frac{\text{Total Amount}}{\text{People Count}}$$

---

### 3.5 Compound Interest Calculator

#### Business Objective
Calculate investment growth over time with compound interest supporting daily, monthly, quarterly, and annual compounding frequencies.

#### Mathematical Formulas
$$A = P \cdot \left(1 + \frac{r}{n}\right)^{n \cdot t}$$
Where:
- $A$ = Final maturity amount
- $P$ = Principal amount
- $r$ = Annual interest rate (decimal)
- $n$ = Compounding frequency per year
- $t$ = Time in years

---

## 4. Accessibility (WCAG 2.1 AA)
1. **Interactive Controls:** All range sliders have adjacent numeric inputs, enabling users to type exact numbers rather than relying on precise motor controls.
2. **Text Contrast:** Form labels maintain contrast $\ge 4.5:1$ against the background.
3. **Screen Reader Support:** Graphs include table fallback markup (`summary` and `thead`) for screen readers.

---

## 5. SEO & Metadata Plan
Every tool is registered with canonical URLs, OpenGraph metadata, and structured JSON-LD schema (type: `WebApplication`).
- **Sitemap URLs:** `/finance/emi-calculator`, `/finance/sip-calculator`, `/finance/gst-calculator`, `/finance/tip-calculator`, `/finance/compound-interest-calculator`.

---

## 6. Verification Plan
*   **Unit Tests:** Verify math engine calculations for standard, boundary, and zero values.
*   **Integration Tests:** Verify slider changes update corresponding numeric inputs and update charts.
