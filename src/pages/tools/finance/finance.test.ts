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

  describe('FD Calculator Compound Math', () => {
    it('calculates quarterly compounding fixed deposits correctly', () => {
      // Principal: 100,000, Rate: 7.1%, 5 Years, Quarterly (4 times/year)
      const P = 100000;
      const r = 7.1 / 100;
      const n = 4;
      const t = 5;
      const maturity = P * Math.pow(1 + r / n, n * t);
      expect(Math.round(maturity)).toBe(142175); // ₹1,42,175 maturity
    });
  });

  describe('Budget Planner Savings Math', () => {
    it('calculates total expense and savings rate correctly', () => {
      const income = 80000;
      const expenses = [25000, 12000, 6000, 5000, 7000]; // Total: 55,000
      const totalExp = expenses.reduce((a, b) => a + b, 0);
      const savings = income - totalExp;
      const savingsRate = (savings / income) * 100;

      expect(totalExp).toBe(55000);
      expect(savings).toBe(25000);
      expect(savingsRate).toBe(31.25);
    });
  });

  describe('Currency Converter Conversion Math', () => {
    it('converts currencies correctly using USD relative rates', () => {
      const amount = 100;
      const fromRate = 1.0; // USD
      const toRate = 83.5; // INR
      const converted = (amount / fromRate) * toRate;
      expect(converted).toBe(8350); // 100 USD = 8,350 INR
    });
  });

  describe('Income Tax Calculator (New Regime) Slabs', () => {
    it('calculates FY 2024-25 New Regime tax correctly', () => {
      const grossSalary = 1200000;
      const standardDeduction = 75000;
      const taxable = grossSalary - standardDeduction; // 11,25,000

      // Slabs:
      // 0-3L: 0
      // 3L-7L: 4L * 5% = 20,000
      // 7L-10L: 3L * 10% = 30,000
      // 10L-12L: 1.25L * 15% = 18,750
      let tax = 0;
      tax += Math.min(Math.max(0, taxable - 300000), 400000) * 0.05;
      tax += Math.min(Math.max(0, taxable - 700000), 300000) * 0.10;
      tax += Math.min(Math.max(0, taxable - 1000000), 200000) * 0.15;

      const cess = tax * 0.04;
      const totalTax = tax + cess;

      expect(tax).toBe(68750);
      expect(cess).toBe(2750);
      expect(totalTax).toBe(71500);
    });
  });

  describe('PPF Calculator Interest Compounding', () => {
    it('calculates PPF maturity value correctly after 15 years', () => {
      const P = 50000;
      const r = 7.1 / 100;
      let balance = 0;
      for (let yr = 1; yr <= 15; yr++) {
        balance = (balance + P) * (1 + r);
      }
      expect(Math.round(balance)).toBe(1356070); // ~₹13.56 Lakhs
    });
  });

  describe('Salary Calculator Deductions', () => {
    it('calculates EPF deduction from basic salary correctly', () => {
      const grossCTC = 1200000;
      const grossMonthly = grossCTC / 12; // 100,000
      const basic = grossMonthly * 0.50; // 50,000
      const pf = basic * 0.12; // 6,000
      expect(pf).toBe(6000);
    });
  });

  describe('Home Loan Calculator Math', () => {
    it('calculates home loan EMI correctly', () => {
      const P = 5000000;
      const r = 8.5 / 12 / 100;
      const n = 20 * 12;
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      expect(Math.round(emi)).toBe(43391);
    });
  });

  describe('Car Loan Calculator Math', () => {
    it('calculates car loan EMI correctly', () => {
      const P = 1000000;
      const r = 9.5 / 12 / 100;
      const n = 7 * 12;
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      expect(Math.round(emi)).toBe(16344);
    });
  });

  describe('Personal Loan Calculator Math', () => {
    it('calculates personal loan EMI correctly', () => {
      const P = 500000;
      const r = 12 / 12 / 100;
      const n = 5 * 12;
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      expect(Math.round(emi)).toBe(11122);
    });
  });

  describe('Education Loan Calculator Math', () => {
    it('calculates education loan EMI including course moratorium accruals correctly', () => {
      const P = 2000000;
      const r = 10.5 / 12 / 100;
      const mMonths = 1 * 12;
      const revisedP = P * Math.pow(1 + r, mMonths);
      const n = 10 * 12;
      const emi = (revisedP * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      expect(Math.round(revisedP)).toBe(2220407);
      expect(Math.round(emi)).toBe(29961);
    });
  });

  describe('Loan Eligibility Calculator FOIR Math', () => {
    it('calculates max eligible EMI based on 50% FOIR limit', () => {
      const monthlyIncome = 80000;
      const existingEMI = 15000;
      const foirLimit = monthlyIncome * 0.50;
      const maxEMI = foirLimit - existingEMI;
      expect(maxEMI).toBe(25000);
    });
  });

  describe('RD Calculator Compounding Math', () => {
    it('calculates quarterly compounded RD maturity correctly', () => {
      const P = 5000;
      const r = 6.8 / 100;
      const n = 4; // Quarterly
      const currentMonths = 5 * 12; // 5 Years
      let balance = 0;
      for (let m = 1; m <= currentMonths; m++) {
        const comp = (currentMonths - m + 1) / 3;
        balance += P * Math.pow(1 + r / n, comp);
      }
      expect(Math.round(balance)).toBe(357771);
    });
  });

  describe('EPF Calculator Accumulation Math', () => {
    it('calculates EPF retirement corpus growth correctly', () => {
      const basic = 50000;
      const rate = 8.15 / 100;
      const monthlyRate = rate / 12;
      const years = 28; // 30 to 58
      let employeeBalance = 0;
      let employerBalance = 0;
      let accumulatedBasic = basic;

      for (let yr = 1; yr <= years; yr++) {
        const empShare = accumulatedBasic * 0.12;
        const employerShare = accumulatedBasic * 0.0367;

        for (let m = 1; m <= 12; m++) {
          employeeBalance += empShare;
          employerBalance += employerShare;
          const interest = (employeeBalance + employerBalance) * monthlyRate;
          employeeBalance += interest;
        }
        accumulatedBasic = accumulatedBasic * 1.06;
      }
      const finalCorpus = employeeBalance + employerBalance;
      expect(Math.round(finalCorpus)).toBe(18403121); // ~₹1.84 Crore
    });
  });

  describe('Retirement Calculator Goal Math', () => {
    it('calculates retirement inflation expenses and corpus correctly', () => {
      const monthlyExpense = 40000;
      const inflation = 6 / 100;
      const years = 30; // 30 to 60
      const futureExpense = monthlyExpense * Math.pow(1 + inflation, years);
      expect(Math.round(futureExpense)).toBe(229740); // Monthly expense at retirement
    });
  });

  describe('HRA Tax Exemption Math', () => {
    it('calculates Section 10(13A) tax exempt HRA correctly', () => {
      const basic = 50000;
      const hra = 25000;
      const rent = 20000;
      
      const annualBasic = basic * 12;
      const annualHRA = hra * 12;
      const annualRent = rent * 12;

      const baseExempt2 = annualBasic * 0.50; // Metro
      const baseExempt3 = annualRent - (annualBasic * 0.10); // Rent - 10% Basic

      const exemptHRA = Math.min(annualHRA, baseExempt2, baseExempt3);
      const taxableHRA = annualHRA - exemptHRA;

      expect(exemptHRA / 12).toBe(15000);
      expect(taxableHRA / 12).toBe(10000);
    });
  });

  describe('Bill Splitter split Calculations', () => {
    it('splits bill amounts accurately among a group', () => {
      const bill = 120;
      const people = 4;
      const tip = 120 * 0.15;
      const tax = 120 * 0.08;
      const total = bill + tip + tax;
      const share = total / people;
      expect(share).toBe(36.9);
    });
  });

  describe('Expense Tracker Summation', () => {
    it('accumulates expenses correctly', () => {
      const expenses = [
        { amount: 3500 },
        { amount: 18000 },
        { amount: 2400 }
      ];
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      expect(total).toBe(23900);
    });
  });
});
