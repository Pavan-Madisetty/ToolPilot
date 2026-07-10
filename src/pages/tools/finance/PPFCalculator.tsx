import { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider } from '@/components/ui';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function PPFCalculator() {
  const [yearlyAmount, setYearlyAmount] = useState(50000); // ₹50,000/year default
  const [tenureYears, setTenureYears] = useState(15); // 15 years default

  const rate = 7.1; // 7.1% fixed PPF interest rate

  const projection = useMemo(() => {
    const P = yearlyAmount;
    const r = rate / 100;
    const t = tenureYears;

    let totalInvested = 0;
    let balance = 0;
    let interestEarned = 0;

    const yearlyLabels = [];
    const investedData = [];
    const maturityData = [];

    for (let yr = 1; yr <= t; yr++) {
      totalInvested += P;
      // PPF compounding formula applied at the end of each year:
      // Interest is calculated on the balance and credited at year-end.
      const interest = (balance + P) * r;
      balance = balance + P + interest;
      interestEarned += interest;

      yearlyLabels.push(`Year ${yr}`);
      investedData.push(totalInvested);
      maturityData.push(balance);
    }

    return {
      totalInvested,
      interestEarned,
      maturityAmount: balance,
      yearlyLabels,
      investedData,
      maturityData,
    };
  }, [yearlyAmount, tenureYears]);

  const chartData = {
    labels: projection.yearlyLabels,
    datasets: [
      {
        label: 'Maturity Value',
        data: projection.maturityData,
        fill: true,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.2,
      },
      {
        label: 'Invested Amount',
        data: projection.investedData,
        fill: true,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'var(--border-subtle)',
        },
        ticks: {
          callback: (value: string | number) => formatCurrency(Number(value)),
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <ToolPageWrapper toolId="ppf-calculator">
      <div className="tool-layout">
        {/* Sliders sidebar */}
        <div className="space-y-6 p-6 card">
          <div>
            <Slider
              label="Yearly Investment (₹)"
              min={500}
              max={150000}
              step={500}
              value={yearlyAmount}
              onChange={setYearlyAmount}
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Max statutory PPF investment limit is ₹1,50,000 per financial year.
            </span>
          </div>
          <Slider
            label="Tenure (Years)"
            min={15}
            max={50}
            step={1}
            value={tenureYears}
            onChange={setTenureYears}
            suffix=" Yr"
          />
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>
              Fixed Return Rate
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              PPF interest rate is regulated by the Government of India and is currently set at
              **7.1% p.a.** (compounded annually).
            </p>
          </div>
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Total Invested</span>
              <div className="result-value text-primary">
                {formatCurrency(projection.totalInvested)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Interest Earned</span>
              <div className="result-value text-success">
                {formatCurrency(projection.interestEarned)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Maturity Value</span>
              <div className="result-value">{formatCurrency(projection.maturityAmount)}</div>
            </div>
          </div>

          {/* Compound Growth Line Chart */}
          <div className="p-6 card h-[320px] relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
