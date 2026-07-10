import { useState, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, Button } from '@/components/ui';
import { Download } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function HomeLoanCalculator() {
  const [principal, setPrincipal] = useState(5000000); // ₹50 Lakhs default for Home Loan
  const [rate, setRate] = useState(8.5); // 8.5% interest
  const [tenureYears, setTenureYears] = useState(20); // 20 years default for Home Loan

  const emiData = useMemo(() => {
    const P = principal;
    const r = rate / 12 / 100;
    const n = tenureYears * 12;

    if (r === 0) {
      const emi = P / n;
      return {
        monthlyEMI: emi,
        totalAmount: P,
        totalInterest: 0,
        schedule: Array.from({ length: n }, (_, i) => ({
          month: i + 1,
          emi,
          principal: P / n,
          interest: 0,
          balance: P - (P / n) * (i + 1),
        })),
      };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    const schedule = [];
    let balance = P;
    for (let month = 1; month <= n; month++) {
      const interest = balance * r;
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
      totalAmount,
      totalInterest,
      schedule,
    };
  }, [principal, rate, tenureYears]);

  const chartData = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [principal, emiData.totalInterest],
        backgroundColor: ['#4F46E5', '#EF4444'],
        hoverBackgroundColor: ['#4338CA', '#DC2626'],
        borderWidth: 1,
        borderColor: 'var(--border-default)',
      },
    ],
  };

  const downloadCSV = () => {
    const headers = ['Month', 'EMI Paid', 'Principal Component', 'Interest Component', 'Outstanding Balance'];
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
    link.setAttribute('download', 'Home_Loan_Amortization_Schedule.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolPageWrapper toolId="home-loan-calculator">
      <div className="tool-layout">
        {/* Sidebar Controls */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Home Loan Amount (₹)"
            min={100000}
            max={100000000}
            step={50000}
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
            label="Loan Tenure (Years)"
            min={1}
            max={30}
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
              <span className="result-label">Monthly EMI</span>
              <div className="result-value text-indigo-600 dark:text-indigo-400">{formatCurrency(emiData.monthlyEMI)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Interest Payable</span>
              <div className="result-value text-red-500">{formatCurrency(emiData.totalInterest)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Payment (Principal + Interest)</span>
              <div className="result-value">{formatCurrency(emiData.totalAmount)}</div>
            </div>
          </div>

          {/* Chart & Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 card flex items-center justify-center h-[280px]">
              <div className="w-full h-full max-w-[240px]">
                <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="p-6 card flex flex-col justify-center gap-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Amortization Breakdowns
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Download the complete monthly payment schedule showing principal and interest components breakdown for the entire tenure of your Home Loan.
              </p>
              <Button
                variant="secondary"
                onClick={downloadCSV}
                className="flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download Amortization Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
