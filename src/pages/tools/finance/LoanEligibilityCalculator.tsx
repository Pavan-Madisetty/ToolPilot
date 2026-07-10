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

export default function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(80000); // ₹80,000 monthly income
  const [existingEMI, setExistingEMI] = useState(15000); // ₹15,000 existing EMIs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% interest rate p.a.
  const [tenureYears, setTenureYears] = useState(20); // 20 years default tenure

  const calculation = useMemo(() => {
    // Standard rule: FOIR (Fixed Obligation Income Ratio) is max 50% of net monthly income
    const foirRatio = 0.50; 
    const maxDisposableForEMI = Math.max(0, monthlyIncome * foirRatio - existingEMI);

    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    let eligibleLoanAmount = 0;
    if (r > 0 && maxDisposableForEMI > 0) {
      // Eligible Loan principal formula derived from EMI formula:
      // EMI = (P * r * (1+r)^n) / ((1+r)^n - 1)
      // P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
      eligibleLoanAmount = maxDisposableForEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    } else if (maxDisposableForEMI > 0) {
      eligibleLoanAmount = maxDisposableForEMI * n;
    }

    return {
      maxEMIAllowed: monthlyIncome * foirRatio,
      currentDisposableEMI: maxDisposableForEMI,
      eligibleLoanAmount,
      foirPercentage: ((existingEMI + maxDisposableForEMI) / monthlyIncome) * 100,
    };
  }, [monthlyIncome, existingEMI, interestRate, tenureYears]);

  return (
    <ToolPageWrapper toolId="loan-eligibility-calculator">
      <div className="tool-layout">
        {/* Sliders Sidebar */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Net Monthly Income (₹)"
            min={10000}
            max={1000000}
            step={2000}
            value={monthlyIncome}
            onChange={setMonthlyIncome}
          />
          <Slider
            label="Existing Monthly EMIs (₹)"
            min={0}
            max={500000}
            step={1000}
            value={existingEMI}
            onChange={setExistingEMI}
          />
          <Slider
            label="Expected Interest Rate"
            min={5}
            max={20}
            step={0.1}
            value={interestRate}
            onChange={setInterestRate}
            suffix="%"
          />
          <Slider
            label="Tenure (Years)"
            min={1}
            max={30}
            step={1}
            value={tenureYears}
            onChange={setTenureYears}
            suffix=" Yr"
          />
        </div>

        {/* Results view */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Maximum Eligible EMI</span>
              <div className="result-value text-primary">{formatCurrency(calculation.currentDisposableEMI)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Eligible Loan Amount</span>
              <div className="result-value text-success">{formatCurrency(calculation.eligibleLoanAmount)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Disposable Income Limit</span>
              <div className="result-value">{formatCurrency(calculation.maxEMIAllowed)}</div>
            </div>
          </div>

          <div className="p-6 card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Eligibility Understanding (FOIR Criteria)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Banks generally limit your total debt repayment obligation (current EMIs + new EMI) to **50%** of your net monthly income. 
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border-default)' }}>
                <span className="text-slate-400">Total Obligations Allowed:</span>
                <span className="font-semibold text-[var(--text-primary)]">50% FOIR Limit</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: 'var(--border-default)' }}>
                <span className="text-slate-400">Net Take-Home Income:</span>
                <span className="font-semibold text-[var(--text-primary)]">{formatCurrency(monthlyIncome)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Remaining EMI Margin:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(calculation.currentDisposableEMI)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
