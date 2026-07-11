import { useState, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, Button } from '@/components/ui';
import { Download } from 'lucide-react';
import { useChartTheme } from '@/hooks/useChartTheme';

ChartJS.register(ArcElement, Tooltip, Legend);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function EducationLoanCalculator() {
  const chartTheme = useChartTheme();
  const [principal, setPrincipal] = useState(2000000); // ₹20 Lakhs default for Education Loan
  const [rate, setRate] = useState(10.5); // 10.5% interest
  const [tenureYears, setTenureYears] = useState(10); // 10 years default for Education Loan
  const [moratoriumYears, setMoratoriumYears] = useState(1); // 1 year moratorium (interest accrued only)

  const emiData = useMemo(() => {
    // Moratorium calculations: interest is accrued during study/moratorium period and added to principal
    const mMonths = moratoriumYears * 12;
    const rMonthly = rate / 12 / 100;

    // Accrued principal at the end of moratorium period
    let revisedPrincipal = principal;
    if (rMonthly > 0) {
      revisedPrincipal = principal * Math.pow(1 + rMonthly, mMonths);
    }

    const nRepayment = tenureYears * 12;

    if (rMonthly === 0) {
      const emi = revisedPrincipal / nRepayment;
      return {
        monthlyEMI: emi,
        totalAmount: revisedPrincipal,
        totalInterest: revisedPrincipal - principal,
        schedule: [],
      };
    }

    const emi =
      (revisedPrincipal * rMonthly * Math.pow(1 + rMonthly, nRepayment)) /
      (Math.pow(1 + rMonthly, nRepayment) - 1);
    const totalAmount = emi * nRepayment;
    const totalInterest = totalAmount + (revisedPrincipal - principal) - principal;

    const schedule = [];
    let balance = revisedPrincipal;
    for (let month = 1; month <= nRepayment; month++) {
      const interest = balance * rMonthly;
      const princ = emi - interest;
      balance -= princ;
      schedule.push({
        month,
        emi,
        principal: princ,
        interest,
        balance: Math.max(0, balance),
      });
    }

    return {
      monthlyEMI: emi,
      totalAmount: totalAmount + (revisedPrincipal - principal),
      totalInterest,
      schedule,
    };
  }, [principal, rate, tenureYears, moratoriumYears]);

  const chartData = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [principal, emiData.totalInterest],
        backgroundColor: [chartTheme.primary, chartTheme.danger],
        hoverBackgroundColor: ['#4338CA', '#DC2626'],
        borderWidth: 1,
        borderColor: chartTheme.border,
      },
    ],
  };

  const downloadCSV = () => {
    const headers = [
      'Month',
      'EMI Paid',
      'Principal Component',
      'Interest Component',
      'Outstanding Balance',
    ];
    const rows = emiData.schedule.map((row) => [
      row.month,
      row.emi.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
      row.balance.toFixed(2),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Education_Loan_Amortization_Schedule.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolPageWrapper toolId="education-loan-calculator">
      <div className="tool-layout">
        {/* Sidebar Controls */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Loan Amount (₹)"
            min={50000}
            max={15000000}
            step={25000}
            value={principal}
            onChange={setPrincipal}
          />
          <Slider
            label="Interest Rate (p.a.)"
            min={1}
            max={20}
            step={0.05}
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <Slider
            label="Moratorium / Course Period"
            min={0}
            max={5}
            step={1}
            value={moratoriumYears}
            onChange={setMoratoriumYears}
            suffix=" Yr"
          />
          <Slider
            label="Repayment Tenure (Years)"
            min={1}
            max={15}
            step={1}
            value={tenureYears}
            onChange={setTenureYears}
            suffix=" Yr"
          />
        </div>

        {/* Results Content */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Monthly EMI (Post-Moratorium)</span>
              <div className="result-value text-indigo-600 dark:text-indigo-400">
                {formatCurrency(emiData.monthlyEMI)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Interest Payable</span>
              <div className="result-value text-red-500">
                {formatCurrency(emiData.totalInterest)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Payment (incl. Moratorium Interest)</span>
              <div className="result-value">{formatCurrency(emiData.totalAmount)}</div>
            </div>
          </div>

          {/* Chart & Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 card flex items-center justify-center h-[280px]">
              <div className="w-full h-full max-w-[240px]">
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: { color: chartTheme.textSecondary },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="p-6 card flex flex-col justify-center gap-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Moratorium Details
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                During the study/moratorium period, interest accumulates and is capitalized into the
                principal. The repayment EMI starts after this course moratorium ends.
              </p>
              {emiData.schedule.length > 0 && (
                <Button
                  variant="secondary"
                  onClick={downloadCSV}
                  className="flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download Amortization Schedule
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
