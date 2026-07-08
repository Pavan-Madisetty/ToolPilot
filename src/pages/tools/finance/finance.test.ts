import { describe, it, expect } from 'vitest';

// ── EMI Math Verification ──────────────────
function calculateEMI(principal: number, annualRate: number, tenureYears: number) {
  const P = principal;
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;

  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// ── SIP Math Verification ──────────────────
function calculateSIP(monthly: number, annualRate: number, tenureYears: number) {
  const P = monthly;
  const i = annualRate / 12 / 100;
  const n = tenureYears * 12;

  if (i === 0) return P * n;
  return P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

// ── GST Math Verification ──────────────────
function calculateGST(amount: number, rate: number, isExclusive: boolean) {
  if (isExclusive) {
    const gst = amount * (rate / 100);
    return { base: amount, gst, total: amount + gst };
  } else {
    const base = amount / (1 + rate / 100);
    return { base, gst: amount - base, total: amount };
  }
}

describe('Finance Module Math Engines', () => {
  describe('EMI Calculator Math', () => {
    it('calculates standard home loan payments correctly', () => {
      // ₹10 Lakhs, 8.5% interest rate, 10 years (120 months)
      const emi = calculateEMI(1000000, 8.5, 10);
      expect(Math.round(emi)).toBe(12399); // ₹12,399/month
    });

    it('calculates interest-free loans correctly (0% rate)', () => {
      const emi = calculateEMI(120000, 0, 1);
      expect(emi).toBe(10000); // ₹10,000/month
    });
  });

  describe('SIP Planner Growth Math', () => {
    it('calculates systematic investment plan future value correctly', () => {
      // ₹5,000/month, 12% returns, 10 years
      const fv = calculateSIP(5000, 12, 10);
      expect(Math.round(fv)).toBe(1161695); // ~₹11.6 Lakhs
    });
  });

  describe('GST Calculator Tax Split Math', () => {
    it('calculates tax additions (Exclusive mode) correctly', () => {
      const result = calculateGST(10000, 18, true);
      expect(result.gst).toBe(1800);
      expect(result.total).toBe(11800);
    });

    it('calculates tax subtractions (Inclusive mode) correctly', () => {
      const result = calculateGST(11800, 18, false);
      expect(Math.round(result.base)).toBe(10000);
      expect(Math.round(result.gst)).toBe(1800);
    });
  });
});
