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
import { Slider, Select } from '@/components/ui';

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

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(100000); // ₹1,00,000 default
  const [interestRate, setInterestRate] = useState(7.1); // 7.1% default
  const [tenureYears, setTenureYears] = useState(5); // 5 years default
  const [compoundingFreq, setCompoundingFreq] = useState<string>('4'); // Quarterly compounding default

  const compoundingOptions = [
    { value: '12', label: 'Monthly' },
    { value: '4', label: 'Quarterly' },
    { value: '2', label: 'Half-Yearly' },
    { value: '1', label: 'Yearly' },
  ];

  const projection = useMemo(() => {
    const P = principal;
    const r = interestRate / 100;
    const n = parseInt(compoundingFreq);
    const t = tenureYears;

    // Formula: A = P * (1 + r/n)^(n*t)
    const maturityAmount = P * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityAmount - P;

    const yearlyLabels = [];
    const investedData = [];
    const maturityData = [];

    for (let yr = 1; yr <= t; yr++) {
      const balance = P * Math.pow(1 + r / n, n * yr);
      yearlyLabels.push(`Year ${yr}`);
      investedData.push(P);
      maturityData.push(balance);
    }

    return {
      totalInvested: P,
      interestEarned,
      maturityAmount,
      yearlyLabels,
      investedData,
      maturityData,
    };
  }, [principal, interestRate, tenureYears, compoundingFreq]);

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
    <ToolPageWrapper toolId="fd-calculator">
      <div className="tool-layout">
        {/* Input Sidebar */}
        <div className="space-y-6 p-6 card">
          <Slider
            label="Principal Amount (₹)"
            min={1000}
            max={10000000}
            step={1000}
            value={principal}
            onChange={setPrincipal}
          />
          <Slider
            label="Rate of Interest (p.a.)"
            min={1}
            max={15}
            step={0.1}
            value={interestRate}
            onChange={setInterestRate}
            suffix="%"
          />
          <Slider
            label="Tenure (Years)"
            min={1}
            max={25}
            step={1}
            value={tenureYears}
            onChange={setTenureYears}
            suffix=" Yr"
          />
          <Select
            label="Compounding Frequency"
            options={compoundingOptions}
            value={compoundingFreq}
            onChange={(e) => setCompoundingFreq(e.target.value)}
          />
        </div>

        {/* Results view */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Invested Amount</span>
              <div className="result-value text-primary">
                {formatCurrency(projection.totalInvested)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Est. Interest</span>
              <div className="result-value text-success">
                {formatCurrency(projection.interestEarned)}
              </div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Maturity Value</span>
              <div className="result-value">{formatCurrency(projection.maturityAmount)}</div>
            </div>
          </div>

          {/* Compound Growth Chart */}
          <div className="p-6 card h-[320px] relative">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
