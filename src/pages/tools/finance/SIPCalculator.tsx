import { useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Slider } from '@/components/ui';

// Register Chart.js line elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000); // ₹5000/month default
  const [returnRate, setReturnRate] = useState(12); // 12% expected annual return
  const [tenureYears, setTenureYears] = useState(10); // 10 years default

  // Projections
  const projection = useMemo(() => {
    const P = monthlyAmount;
    const i = returnRate / 12 / 100;
    const n = tenureYears * 12;

    const totalInvested = P * n;
    
    // Future Value formula: FV = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
    let totalValue: number;
    if (i === 0) {
      totalValue = totalInvested;
    } else {
      totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    }
    const estimatedReturns = totalValue - totalInvested;

    // Build year-by-year projections for the chart
    const yearlyLabels = [];
    const investedData = [];
    const returnsData = [];

    for (let yr = 1; yr <= tenureYears; yr++) {
      const months = yr * 12;
      const invested = P * months;
      const value = i === 0 ? invested : P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);

      yearlyLabels.push(`Year ${yr}`);
      investedData.push(invested);
      returnsData.push(value);
    }

    return {
      totalInvested,
      estimatedReturns,
      totalValue,
      yearlyLabels,
      investedData,
      returnsData,
    };
  }, [monthlyAmount, returnRate, tenureYears]);

  // Chart configuration
  const chartData = {
    labels: projection.yearlyLabels,
    datasets: [
      {
        label: 'Total Value',
        data: projection.returnsData,
        fill: true,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.2,
      },
      {
        label: 'Total Invested',
        data: projection.investedData,
        fill: true,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
    <ToolPageWrapper toolId="sip-calculator">
      <div className="tool-layout">
        {/* Sliders sidebar */}
        <div className="space-y-6 p-6 border rounded-2xl bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
          <Slider
            label="Monthly Investment (₹)"
            min={500}
            max={1000000}
            step={500}
            value={monthlyAmount}
            onChange={setMonthlyAmount}
          />
          <Slider
            label="Expected Return Rate (p.a.)"
            min={1}
            max={30}
            step={0.5}
            value={returnRate}
            onChange={setReturnRate}
            suffix="%"
          />
          <Slider
            label="Investment Period (Years)"
            min={1}
            max={40}
            step={1}
            value={tenureYears}
            onChange={setTenureYears}
            suffix=" Yr"
          />
        </div>

        {/* Results layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="result-box text-center">
              <span className="result-label">Invested Amount</span>
              <div className="result-value text-blue-500">{formatCurrency(projection.totalInvested)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Est. Returns</span>
              <div className="result-value text-emerald-500">{formatCurrency(projection.estimatedReturns)}</div>
            </div>
            <div className="result-box text-center">
              <span className="result-label">Total Value</span>
              <div className="result-value">{formatCurrency(projection.totalValue)}</div>
            </div>
          </div>

          {/* Line Chart */}
          <div
            className="border rounded-2xl p-6 bg-white dark:bg-slate-800 h-[320px] relative"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
