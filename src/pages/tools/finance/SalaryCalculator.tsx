import { useState, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider } from '@/components/ui';

ChartJS.register(ArcElement, Tooltip, Legend);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function SalaryCalculator() {
  const [annualCTC, setAnnualCTC] = useState(1200000); // ₹12,00,000 CTC default

  const salaryDetails = useMemo(() => {
    const grossMonthly = annualCTC / 12;
    const basic = grossMonthly * 0.5; // 50% of gross
    const hra = basic * 0.5; // 50% of basic (25% of gross)
    const pfContribution = basic * 0.12; // 12% of basic (6% of gross)
    const professionalTax = grossMonthly > 15000 ? 200 : 0; // Flat standard Professional Tax

    // Hardcoded simplified income tax deduction (approximate monthly regime)
    const annualSalary = annualCTC;
    const standardDeduction = 75000;
    const taxableIncome = Math.max(0, annualSalary - standardDeduction);
    let annualTax = 0;
    if (taxableIncome > 1500000) {
      annualTax = 140000 + (taxableIncome - 1500000) * 0.3;
    } else if (taxableIncome > 1200000) {
      annualTax = 80000 + (taxableIncome - 1200000) * 0.2;
    } else if (taxableIncome > 1000000) {
      annualTax = 50000 + (taxableIncome - 1000000) * 0.15;
    } else if (taxableIncome > 700000) {
      annualTax = 20000 + (taxableIncome - 700000) * 0.1;
    } else if (taxableIncome > 300000) {
      annualTax = (taxableIncome - 300000) * 0.05;
    }
    // Cess 4%
    annualTax = annualTax * 1.04;
    const monthlyIncomeTax = annualTax / 12;

    const totalDeductions = pfContribution + professionalTax + monthlyIncomeTax;
    const netInHand = Math.max(0, grossMonthly - totalDeductions);
    const allowances = grossMonthly - (basic + hra + totalDeductions);

    return {
      grossMonthly,
      basic,
      hra,
      pfContribution,
      professionalTax,
      monthlyIncomeTax,
      totalDeductions,
      netInHand,
      allowances: Math.max(0, allowances),
    };
  }, [annualCTC]);

  const chartData = {
    labels: ['Net In-Hand', 'Provident Fund (EPF)', 'Professional Tax', 'Monthly Income Tax'],
    datasets: [
      {
        data: [
          salaryDetails.netInHand,
          salaryDetails.pfContribution,
          salaryDetails.professionalTax,
          salaryDetails.monthlyIncomeTax,
        ],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
        hoverBackgroundColor: ['#059669', '#2563EB', '#D97706', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'var(--text-primary)',
        },
      },
    },
  };

  return (
    <ToolPageWrapper toolId="salary-calculator">
      <div className="tool-layout">
        {/* Sliders sidebar */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Gross Annual CTC (₹)"
            min={120000}
            max={10000000}
            step={50000}
            value={annualCTC}
            onChange={setAnnualCTC}
          />
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>
              Breakdown Metrics
            </h3>
            <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Basic Salary (50%):</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {formatCurrency(salaryDetails.basic)}/mo
                </span>
              </div>
              <div className="flex justify-between">
                <span>HRA (50% of Basic):</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {formatCurrency(salaryDetails.hra)}/mo
                </span>
              </div>
              <div className="flex justify-between">
                <span>EPF Contribution (12%):</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {formatCurrency(salaryDetails.pfContribution)}/mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Gross Monthly Salary</span>
              <div className="result-value text-primary">
                {formatCurrency(salaryDetails.grossMonthly)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Deductions</span>
              <div className="result-value text-danger">
                {formatCurrency(salaryDetails.totalDeductions)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Net In-Hand / Month</span>
              <div className="result-value text-success">
                {formatCurrency(salaryDetails.netInHand)}
              </div>
            </div>
          </div>

          {/* Allocation Doughnut Chart */}
          <div className="p-6 card h-[320px] flex items-center justify-center relative">
            <div className="w-full h-full max-w-[280px] sm:max-w-none">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
