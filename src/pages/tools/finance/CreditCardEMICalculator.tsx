import { useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider, ResultBox, Callout } from '@/components/ui';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CreditCardEMICalculator() {
  const [balance, setBalance] = useState<number>(50000); // Card Balance
  const [rate, setRate] = useState<number>(18); // Interest Rate (% p.a.)
  const [months, setMonths] = useState<number>(12); // EMI Tenure (months)

  const calculations = useMemo(() => {
    const P = balance;
    const r = rate / 12 / 100;
    const n = months;

    // Monthly EMI formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    let emi = 0;
    if (r > 0) {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = P / n;
    }

    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    const monthlyLabels = [];
    const principalPaidData = [];
    const interestPaidData = [];

    let remainingBalance = P;
    for (let m = 1; m <= n; m++) {
      const interestForMonth = remainingBalance * r;
      const principalForMonth = emi - interestForMonth;
      remainingBalance -= principalForMonth;

      monthlyLabels.push(`Month ${m}`);
      principalPaidData.push(principalForMonth);
      interestPaidData.push(interestForMonth);
    }

    return {
      emi,
      totalAmount,
      totalInterest,
      monthlyLabels,
      principalPaidData,
      interestPaidData,
    };
  }, [balance, rate, months]);

  const chartData = {
    labels: calculations.monthlyLabels,
    datasets: [
      {
        label: 'Principal Paid',
        data: calculations.principalPaidData,
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Interest Paid',
        data: calculations.interestPaidData,
        backgroundColor: '#EF4444',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'var(--text-secondary)',
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          color: 'var(--border-subtle)',
        },
        ticks: {
          color: 'var(--text-secondary)',
          callback: (value: string | number) => '₹' + Number(value).toLocaleString('en-IN'),
        },
      },
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'var(--text-secondary)',
        },
      },
    },
  };

  return (
    <ToolPageWrapper toolId="credit-card-emi">
      <div className="tool-layout">
        {/* Left Side: Inputs */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Card Balance (₹)"
            min={1000}
            max={1000000}
            step={1000}
            value={balance}
            onChange={setBalance}
          />
          <Slider
            label="Interest Rate (p.a. %)"
            min={5}
            max={48}
            step={0.5}
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <Slider
            label="EMI Tenure (Months)"
            min={3}
            max={36}
            step={1}
            value={months}
            onChange={setMonths}
            suffix=" Mo"
          />
        </div>

        {/* Right Side: Results & Chart */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultBox
              label="Monthly EMI"
              value={calculations.emi}
              prefix="₹"
              highlight
            />
            <ResultBox
              label="Total Interest"
              value={calculations.totalInterest}
              prefix="₹"
              className="text-danger font-semibold"
            />
            <ResultBox
              label="Total Repayment"
              value={calculations.totalAmount}
              prefix="₹"
            />
          </div>

          <div className="p-6 card h-[320px] relative">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <Callout tone="tip" title="Credit Card EMI Caution">
            <p className="text-xs text-[var(--text-secondary)]">
              Converting credit card balances to EMI can lower your immediate payment burden, but credit card EMI interest rates are typically much higher (13% - 24%) than personal loans. Also, a processing fee (usually 1% - 2% + GST) is charged upfront, and GST of 18% is applicable on the interest component of each monthly EMI installment.
            </p>
          </Callout>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
