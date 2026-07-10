import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider } from '@/components/ui';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function IncomeTaxCalculator() {
  const [annualSalary, setAnnualSalary] = useState(1200000); // ₹12,00,000 default

  const taxCalculation = useMemo(() => {
    const grossIncome = annualSalary;
    const standardDeduction = 75000;
    const taxableIncome = Math.max(0, grossIncome - standardDeduction);

    // New Regime Slab Calculations (FY 2024-25 / FY 2025-26)
    // 0 to 3L: 0%
    // 3L to 7L: 5% (Max 20,000)
    // 7L to 10L: 10% (Max 30,000)
    // 10L to 12L: 15% (Max 30,000)
    // 12L to 15L: 20% (Max 60,000)
    // Above 15L: 30%

    let tax = 0;
    const slabBreakdowns = [];

    // Slab 1: Up to 3L
    const slab1Taxable = Math.min(taxableIncome, 300000);
    slabBreakdowns.push({ range: '₹0 - ₹3,00,000', rate: '0%', taxable: slab1Taxable, tax: 0 });

    // Slab 2: 3L to 7L
    if (taxableIncome > 300000) {
      const taxable = Math.min(taxableIncome - 300000, 400000);
      const slabTax = taxable * 0.05;
      tax += slabTax;
      slabBreakdowns.push({ range: '₹3,00,001 - ₹7,00,000', rate: '5%', taxable, tax: slabTax });
    } else {
      slabBreakdowns.push({ range: '₹3,00,001 - ₹7,00,000', rate: '5%', taxable: 0, tax: 0 });
    }

    // Slab 3: 7L to 10L
    if (taxableIncome > 700000) {
      const taxable = Math.min(taxableIncome - 700000, 300000);
      const slabTax = taxable * 0.10;
      tax += slabTax;
      slabBreakdowns.push({ range: '₹7,00,001 - ₹10,00,000', rate: '10%', taxable, tax: slabTax });
    } else {
      slabBreakdowns.push({ range: '₹7,00,001 - ₹10,00,000', rate: '10%', taxable: 0, tax: 0 });
    }

    // Slab 4: 10L to 12L
    if (taxableIncome > 1000000) {
      const taxable = Math.min(taxableIncome - 1000000, 200000);
      const slabTax = taxable * 0.15;
      tax += slabTax;
      slabBreakdowns.push({ range: '₹10,00,001 - ₹12,00,000', rate: '15%', taxable, tax: slabTax });
    } else {
      slabBreakdowns.push({ range: '₹10,00,001 - ₹12,00,000', rate: '15%', taxable: 0, tax: 0 });
    }

    // Slab 5: 12L to 15L
    if (taxableIncome > 1200000) {
      const taxable = Math.min(taxableIncome - 1200000, 300000);
      const slabTax = taxable * 0.20;
      tax += slabTax;
      slabBreakdowns.push({ range: '₹12,00,001 - ₹15,00,000', rate: '20%', taxable, tax: slabTax });
    } else {
      slabBreakdowns.push({ range: '₹12,00,001 - ₹15,00,000', rate: '20%', taxable: 0, tax: 0 });
    }

    // Slab 6: Above 15L
    if (taxableIncome > 1500000) {
      const taxable = taxableIncome - 1500000;
      const slabTax = taxable * 0.30;
      tax += slabTax;
      slabBreakdowns.push({ range: 'Above ₹15,00,000', rate: '30%', taxable, tax: slabTax });
    } else {
      slabBreakdowns.push({ range: 'Above ₹15,00,000', rate: '30%', taxable: 0, tax: 0 });
    }

    // 87A Tax Rebate for taxable income <= 7L
    let rebate = 0;
    if (taxableIncome <= 700000) {
      rebate = tax;
      tax = 0;
    }

    // Cess: 4% Health and Education Cess on tax due
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const netTakeHome = grossIncome - totalTax;

    return {
      grossIncome,
      taxableIncome,
      standardDeduction,
      rebate,
      cess,
      totalTax,
      netTakeHome,
      slabBreakdowns,
    };
  }, [annualSalary]);

  return (
    <ToolPageWrapper toolId="income-tax-calculator">
      <div className="tool-layout">
        {/* Sidebar inputs */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Gross Annual Income (₹)"
            min={100000}
            max={10000000}
            step={50000}
            value={annualSalary}
            onChange={setAnnualSalary}
          />
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>Regime Type</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This calculation uses the **New Tax Regime** (FY 2024-25 / FY 2025-26) with standard deduction of ₹75,000 included automatically.
            </p>
          </div>
        </div>

        {/* Results view */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Taxable Income</span>
              <div className="result-value text-primary">{formatCurrency(taxCalculation.taxableIncome)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Tax Due</span>
              <div className="result-value text-danger">{formatCurrency(taxCalculation.totalTax)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Net In-Hand / Year</span>
              <div className="result-value text-success">{formatCurrency(taxCalculation.netTakeHome)}</div>
            </div>
          </div>

          {/* Slab breakdown table */}
          <div className="p-6 card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              New Regime Slab Breakup
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-default)] text-slate-400 dark:text-slate-500">
                    <th className="pb-3 font-semibold">Slab Range</th>
                    <th className="pb-3 font-semibold">Tax Rate</th>
                    <th className="pb-3 font-semibold">Taxable Amount</th>
                    <th className="pb-3 font-semibold text-right">Tax Accrued</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)]">
                  {taxCalculation.slabBreakdowns.map((slab, index) => (
                    <tr key={index} className="text-[var(--text-primary)]">
                      <td className="py-3 font-medium">{slab.range}</td>
                      <td className="py-3">{slab.rate}</td>
                      <td className="py-3">{formatCurrency(slab.taxable)}</td>
                      <td className="py-3 text-right font-semibold">{formatCurrency(slab.tax)}</td>
                    </tr>
                  ))}
                  {taxCalculation.rebate > 0 && (
                    <tr className="text-success bg-success/10">
                      <td className="py-3 font-bold" colSpan={3}>Section 87A Tax Rebate</td>
                      <td className="py-3 text-right font-bold">-{formatCurrency(taxCalculation.rebate)}</td>
                    </tr>
                  )}
                  <tr className="font-bold border-t border-[var(--border-default)]">
                    <td className="py-3" colSpan={3}>Cess (4% Health & Education Cess)</td>
                    <td className="py-3 text-right">{formatCurrency(taxCalculation.cess)}</td>
                  </tr>
                  <tr className="font-bold text-lg border-t-2 border-[var(--border-default)]">
                    <td className="py-4" colSpan={3}>Total Annual Tax Due</td>
                    <td className="py-4 text-right text-rose-500">{formatCurrency(taxCalculation.totalTax)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
