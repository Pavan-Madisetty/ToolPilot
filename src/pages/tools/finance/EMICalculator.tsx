import { useState, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, Button } from '@/components/ui';
import { Download } from 'lucide-react';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Helper for formatting Indian currency
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(1000000); // ₹10 Lakhs default
  const [rate, setRate] = useState(8.5); // 8.5% interest
  const [tenureYears, setTenureYears] = useState(10); // 10 years default

  // Calculate EMI
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

    // Build Amortization Schedule
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

  // Chart Data
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

  // Download Amortization Schedule as CSV
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
    link.setAttribute('download', `EMI_Schedule_${principal}_${rate}_${tenureYears}yrs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolPageWrapper toolId="emi-calculator">
      <div className="tool-layout">
        {/* Inputs panel */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Loan Amount (₹)"
            min={10000}
            max={100000000}
            step={10000}
            value={principal}
            onChange={setPrincipal}
            suffix=""
          />
          <Slider
            label="Interest Rate (p.a.)"
            min={1}
            max={36}
            step={0.1}
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

        {/* Results panel */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Monthly EMI</span>
              <div className="result-value text-primary">{formatCurrency(emiData.monthlyEMI)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Interest Payable</span>
              <div className="result-value">{formatCurrency(emiData.totalInterest)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Payment (P + I)</span>
              <div className="result-value">{formatCurrency(emiData.totalAmount)}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 card">
            {/* Chart */}
            <div className="max-w-[240px] mx-auto">
              <Pie data={chartData} options={{ plugins: { legend: { position: 'bottom' } } }} />
            </div>

            {/* Amortization schedule details */}
            <div className="flex flex-col justify-center text-sm space-y-4">
              <h3 className="font-bold mb-2">Loan Breakup Proportions</h3>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--text-link)]" />
                  Principal Loan Amount
                </span>
                <span className="font-semibold">{formatCurrency(principal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  Total Interest Charges
                </span>
                <span className="font-semibold">{formatCurrency(emiData.totalInterest)}</span>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
                <Button
                  onClick={downloadCSV}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  leftIcon={<Download size={16} />}
                >
                  Download Schedule as CSV
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
